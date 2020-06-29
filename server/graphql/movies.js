import mongoose from "mongoose"
const puppeteer = require("puppeteer")

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
  hashTag: Array,
  genre: Array,
  code: Number,
  englishName: String,
})

export let movieArr = []
const getAllMovie = (async () => {
  movieArr = movieArr.concat(await MovieModel.find())

  // console.log(movieArr);
  console.log("영화 로딩 완료")

  return movieArr
})()
// getAllMovie();

// 나무위키 크롤링

// export const genreArray = [
//   "슈퍼히어로",
//   "스포츠",
//   "범죄",
//   "드라마",
//   "코미디",
//   "로맨스",
//   "멜로",
//   "스릴러",
//   "로맨틱코미디",
//   "전쟁",
//   "판타지",
//   "SF",
//   "액션",
//   "애니메이션",
//   "다큐멘터리",
//   "공포",
// ];
// export const getHtml = (async () => {
//   console.log("크롤링 시작");
//   const browser = await puppeteer.launch({
//     headless: true,
//   });
//   const page = await browser.newPage();
//   await page.setViewport({
//     width: 1920,
//     height: 1080,
//   });

//   deleteMovieFunc();

//   let data = [];
//   // console.log(MovieModel);

//   for (let year = 2010; year <= 2016; year++) {
//     await page.goto(
//       `https://ko.wikipedia.org/w/index.php?title=%EB%B6%84%EB%A5%98:${year}%EB%85%84_%EC%98%81%ED%99%94`
//     );

//     data = data.concat(await getAll(page, year)); // 첫번째 page get

//     //두번째 page 부터는 반복해서 크롤링
//     for (let i = 0; i < 10; i++) {
//       const elem = await page.$$(`#mw-pages > a`, (data) => {
//         return data;
//       });
//       const elemIndex = await page.$$eval(`#mw-pages > a`, (data) => {
//         return data.map((anchor) => anchor.innerText);
//       });

//       if (elem && elem.length > 0 && elemIndex[1] === "다음 페이지") {
//         elem[1].click();
//         await page.waitForNavigation();
//         data = data.concat(await getAll(page, year));
//       }
//     }
//   }

//   // 크롤링 리스트가 다됐다면 영화정보 다시 크롤링

//   for (let i = 0; i < data.length; i++) {
//     data[i] = await getOne(page, data[i]);
//   }

//   console.log(">>>>>>>>>>>끝", data);
//   console.log(data.length);
//   await MovieModel.insertMany(data, () => {});
//   // data.forEach(async (iter) => {
//   //   new MovieModel(iter).save();
//   // });

//   await page.waitFor(10000);
//   await browser.close();
// })();

// let code = 1;

// async function getAll(page, year) {
//   let data = [];

//   let contentSize = await page.$$eval(
//     "#mw-pages > div.mw-content-ltr > div.mw-category > div.mw-category-group",
//     (data) => data.length
//   );

//   for (let i = 1; i <= contentSize; i++) {
//     let liSize = await page.$$eval(
//       "#mw-pages > div.mw-content-ltr > div.mw-category > div.mw-category-group:nth-child(" +
//         i +
//         ")" +
//         "> ul > li > a",
//       (data) => data.length
//     );
//     for (let j = 1; j <= liSize; j++) {
//       let temp = await page.$(
//         "#mw-pages > div.mw-content-ltr > div.mw-category > div.mw-category-group:nth-child(" +
//           i +
//           ")" +
//           "> ul > li:nth-child(" +
//           j +
//           ")" +
//           "> a"
//       );

//       if (temp) {
//         let tempObj = {};
//         tempObj.name = await page.evaluate((data) => {
//           return data.textContent;
//         }, temp);

//         if (
//           tempObj.name.indexOf("목록") === -1 &&
//           tempObj.name.indexOf("사용자") === -1
//         ) {
//           let findIndex = tempObj.name.indexOf(`년 영화`);
//           if (findIndex !== -1) {
//             tempObj.name = tempObj.name.substr(0, findIndex - 5);
//           }
//           findIndex = tempObj.name.indexOf(`(영화)`);
//           if (findIndex !== -1) {
//             tempObj.name = tempObj.name.substr(0, findIndex - 1);
//           }
//           console.log(tempObj.name);
//           tempObj.link = await page.evaluate((data) => {
//             return data.href;
//           }, temp);
//           tempObj.year = year.toString();
//           tempObj.votes = 0;
//           tempObj.code = code++;
//           tempObj.genre = [];
//           data.push(tempObj);
//         }
//       }
//     }
//   }

//   return Promise.resolve(data);
// }

// async function getOne(page, tempObj) {
//   if (tempObj.name.indexOf("년 영화") === -1) {
//     await page.goto(tempObj.link);

//     let temp;
//     // img
//     // let  temp= await page.$$eval(
//     //   "#mw-content-text > div > table.infobox.vevent > tbody > tr:nth-child(2) > td > a > img[src]",
//     //   (data) => {
//     //     return data.map((iter) => iter.getAttribute("src"));
//     //   }
//     // );

//     // console.log(temp);

//     // tempObj = {
//     //   ...tempObj,
//     //   imgUrl: temp.length > 0 ? temp[0].split("//")[1] : "",
//     // };
//     // console.log(tempObj)

//     let tabelSize = await page.$$eval(
//       "#mw-content-text > div > table > tbody > tr",
//       (data) => data.length
//     );
//     for (let i = 1; i <= tabelSize; i++) {
//       let trSize = await page.$$eval(
//         `#mw-content-text > div > table > tbody > tr:nth-child(${i}) >th`,
//         (data) => (data ? data.length : 0)
//       );

//       if (trSize) {
//         let thText = await page.$eval(
//           `#mw-content-text > div > table > tbody > tr:nth-child(${i}) > th`,
//           (data) => (data ? data.textContent : "")
//         );

//         if (thText === "흥행수익") {
//           temp = await page.$$eval(
//             `#mw-content-text > div > table > tbody > tr:nth-child(${i}) > td `,
//             (data) => {
//               return data.map((anchor) => anchor.innerText);
//             }
//           );
//           temp = temp.toString();
//           if (temp.indexOf("[") !== "-1") {
//             temp = temp.split("[")[0];
//           }
//         } else if (thText === "시간") {
//           temp = await page.$eval(
//             `#mw-content-text > div > table > tbody > tr:nth-child(${i}) > td `,
//             (data) => {
//               return data.textContent;
//             }
//           );
//         } else {
//           temp = await page.$$eval(
//             `#mw-content-text > div > table > tbody > tr:nth-child(${i}) > td > a`,
//             (data) => {
//               return data.map((anchor) => anchor.innerText);
//             }
//           );
//         }

//         let key = "";
//         switch (thText) {
//           case "감독":
//             key = "directors";
//             break;
//           case "제작":
//             key = "writers";
//             break;
//           case "각본":
//             key = "Screenplay";
//             break;
//           case "출연":
//             key = "cast";
//             break;
//           case "시간":
//             key = "runtime";
//             break;
//           case "개봉일":
//             key = "released";
//             break;
//           case "국가":
//             key = "countries";
//             break;
//           case "언어":
//             key = "languages";
//             break;
//           // case "제작비":
//           //   key = "ProductionCost";
//           //   break;
//           case "흥행수익":
//             key = "profit";
//             break;
//         }

//         if (key) {
//           tempObj = {
//             ...tempObj,
//             [key]: temp,
//           };

//           // console.log(tempObj);
//         }
//       }
//     } // FOR문 끝

//     temp = await page.$$eval(` #mw-normal-catlinks > ul >li`, (data) => {
//       return data.map((anchor) => anchor.innerText);
//     });

//     for (let i = 0; i < temp.length; i++) {
//       if (
//         temp[i].indexOf("년 영화") !== -1 ||
//         temp[i].indexOf("어 영화 작품") !== -1 ||
//         temp[i].indexOf("의 영화 작품") !== -1
//       ) {
//         temp.splice(i, 1);
//         i--;
//         continue;
//       }

//       genreArray.forEach((iter) => {
//         if (temp[i].indexOf(iter) !== -1) {
//           const findGenre = tempObj.genre.find((obj) => obj === iter);
//           if (findGenre === undefined) {
//             tempObj.genre = tempObj.genre.concat(iter);
//           }
//         }
//       });
//     }

//     tempObj.hashTag = temp;

//     ///여기부터는 네이버 이미지
//     await page.goto(
//       `https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query=영화 ${tempObj.name}`
//     );

//     try {
//       let temp = await page.$eval(
//         "#_au_movie_info > div.info_main > div > a > img[src]",
//         (data) => {
//           return data.getAttribute("src");
//         }
//       );

//       let englishName = await page.$eval(
//         "#_au_movie_info > div.info_main > h3 > a > span",
//         (data) => {
//           return data.textContent;
//         }
//       );

//       const index = englishName.indexOf(",");
//       if (index !== -1) {
//         englishName = englishName.substr(1, index - 1);
//         tempObj.englishName = englishName;
//       }

//       tempObj.imgUrl = temp;
//     } catch (e) {}

//     console.log(tempObj);
//   }

//   return Promise.resolve(tempObj);
// }

// const deleteMovieFunc = async () => {
//   await MovieModel.deleteMany();
// };
