const puppeteer = require("puppeteer");
import mongoose from "mongoose";

export const MovieModel = mongoose.model("movies", {
  imgUrl: String,
  cast: Array,
  runtime: String,
  released: Array,
  directors: Array,
  writers: Array,
  // awards :   ??  X
  year: String,
  countries: Array,
  languages: Array,
  // ProductionCost: String,
  profit: String,
  name: String,
  votes: Number,
});

export const getHtml = (async () => {
  //   const browser = await puppeteer.launch()

  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  deleteMovieFunc();

  let data = [];
  // console.log(MovieModel);

  for (let year = 2012; year <= 2012; year++) {
    await page.goto(
      `https://ko.wikipedia.org/w/index.php?title=%EB%B6%84%EB%A5%98:${year}%EB%85%84_%EC%98%81%ED%99%94`
    );

    data = data.concat(await getAll(page, year)); // 첫번째 page get

    //두번째 page 부터는 반복해서 크롤링
    for (let i = 0; i < 10; i++) {
      const elem = await page.$$(`#mw-pages > a`, (data) => {
        return data;
      });
      const elemIndex = await page.$$eval(`#mw-pages > a`, (data) => {
        return data.map((anchor) => anchor.innerText);
      });

      if (elem && elem.length > 0 && elemIndex[1] === "다음 페이지") {
        elem[1].click();
        await page.waitForNavigation();
        data = data.concat(await getAll(page, year));
      }
    }
  }

  // 크롤링 리스트가 다됐다면 영화정보 다시 크롤링

  for (let i = 0; i < data.length; i++) {
    data[i] = await getOne(page, data[i]);
  }

  console.log(">>>>>>>>>>>끝", data);
  console.log(data.length);
  // data.forEach(async (iter) => {
  //   new MovieModel(iter).save();
  // });

  await page.waitFor(10000);
  await browser.close();
})();

async function getAll(page, year) {
  let data = [];

  let contentSize = await page.$$eval(
    "#mw-pages > div.mw-content-ltr > div.mw-category > div.mw-category-group",
    (data) => data.length
  );

  for (let i = 1; i <= contentSize; i++) {
    let liSize = await page.$$eval(
      "#mw-pages > div.mw-content-ltr > div.mw-category > div.mw-category-group:nth-child(" +
        i +
        ")" +
        "> ul > li > a",
      (data) => data.length
    );
    for (let j = 1; j <= liSize; j++) {
      let temp = await page.$(
        "#mw-pages > div.mw-content-ltr > div.mw-category > div.mw-category-group:nth-child(" +
          i +
          ")" +
          "> ul > li:nth-child(" +
          j +
          ")" +
          "> a"
      );

      if (temp) {
        let tempObj = {};
        tempObj.name = await page.evaluate((data) => {
          return data.textContent;
        }, temp);
        tempObj.link = await page.evaluate((data) => {
          return data.href;
        }, temp);
        tempObj.year = year.toString();
        tempObj.votes = 0;
        data.push(tempObj);
      }
    }
  }

  return Promise.resolve(data);
}

async function getOne(page, tempObj) {
  if (tempObj.name.indexOf("년 영화") === -1) {
    await page.goto(tempObj.link);

    // let temp = await page.$("#mw-content-text > div > table > tbody ");

    // img
    let temp = await page.$("tr:nth-child(2) > td > a");
    tempObj = {
      ...tempObj,
      imgUrl: await page.evaluate((data) => {
        return data ? data.href : "";
      }, temp),
    };

    let tabelSize = await page.$$eval(
      "#mw-content-text > div > table > tbody > tr",
      (data) => data.length
    );
    // console.log(tabelSize);
    for (let i = 1; i <= tabelSize; i++) {
      let trSize = await page.$$eval(
        `#mw-content-text > div > table > tbody > tr:nth-child(${i}) >th`,
        (data) => (data ? data.length : 0)
      );

      if (trSize) {
        let thText = await page.$eval(
          `#mw-content-text > div > table > tbody > tr:nth-child(${i}) > th`,
          (data) => (data ? data.textContent : "")
        );

        if (thText === "흥행수익") {
          temp = await page.$$eval(
            `#mw-content-text > div > table > tbody > tr:nth-child(${i}) > td `,
            (data) => {
              return data.map((anchor) => anchor.innerText);
            }
          );
          temp = temp.toString();
          if (temp.indexOf("[") !== "-1") {
            temp = temp.split("[")[0];
          }
        } else if (thText === "시간") {
          temp = await page.$eval(
            `#mw-content-text > div > table > tbody > tr:nth-child(${i}) > td `,
            (data) => {
              return data.textContent;
            }
          );
        } else {
          temp = await page.$$eval(
            `#mw-content-text > div > table > tbody > tr:nth-child(${i}) > td > a`,
            (data) => {
              return data.map((anchor) => anchor.innerText);
            }
          );
        }

        let key = "";
        switch (thText) {
          case "감독":
            key = "directors";
            break;
          case "제작":
            key = "writers";
            break;
          case "각본":
            key = "Screenplay";
            break;
          case "출연":
            key = "cast";
            break;
          case "시간":
            key = "runtime";
            break;
          case "개봉일":
            key = "released";
            break;
          case "국가":
            key = "countries";
            break;
          case "언어":
            key = "languages";
            break;
          // case "제작비":
          //   key = "ProductionCost";
          //   break;
          case "흥행수익":
            key = "profit";
            break;
        }

        if (key) {
          tempObj = {
            ...tempObj,
            [key]: temp,
          };

          // console.log(tempObj);
        }
      }
    } // FOR문 끝

    temp = await page.$$eval(` #mw-normal-catlinks > ul >li`, (data) => {
      return data.map((anchor) => anchor.innerText);
    });

    console.log(temp);
  }

  return Promise.resolve(tempObj);
}

const deleteMovieFunc = async () => {
  await MovieModel.deleteMany();
};
