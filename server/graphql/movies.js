const axios = require("axios")
const cheerio = require("cheerio")
const puppeteer = require("puppeteer")

export const getHtml = (async () => {
  //   const browser = await puppeteer.launch()

  const browser = await puppeteer.launch({
    headless: true,
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 1920,
    height: 1080,
  })

  let data = []

  for (let i = 2012; i <= 2012; i++) {
    await page.goto(`https://ko.wikipedia.org/w/index.php?title=%EB%B6%84%EB%A5%98:${i}%EB%85%84_%EC%98%81%ED%99%94`)

    data = data.concat(await getAll(page)) // 첫번째 page get

    //두번째 page 부터는 반복해서 크롤링
    for (let i = 0; i < 10; i++) {
      const elem = await page.$$(`#mw-pages > a`, (data) => {
        return data
      })
      const elemIndex = await page.$$eval(`#mw-pages > a`, (data) => {
        return data.map((anchor) => anchor.innerText)
      })

      if (elem && elem.length > 0 && elemIndex[1] === "다음 페이지") {
        elem[1].click()
        await page.waitForNavigation()
        data = data.concat(await getAll(page))
      }
    }
  }

  console.log(">>>>>>>>>>>끝", data)
  await page.waitFor(10000)
  await browser.close()
})()

async function getAll(page) {
  let data = []

  let contentSize = await page.$$eval("#mw-pages > div.mw-content-ltr > div.mw-category > div.mw-category-group", (data) => data.length)

  for (let i = 1; i <= contentSize; i++) {
    let liSize = await page.$$eval("#mw-pages > div.mw-content-ltr > div.mw-category > div.mw-category-group:nth-child(" + i + ")" + "> ul > li > a", (data) => data.length)
    for (let j = 1; j <= liSize; j++) {
      let temp = await page.$("#mw-pages > div.mw-content-ltr > div.mw-category > div.mw-category-group:nth-child(" + i + ")" + "> ul > li:nth-child(" + j + ")" + "> a")

      if (temp) {
        let tempObj = {}
        tempObj.name = await page.evaluate((data) => {
          return data.textContent
        }, temp)
        tempObj.link = await page.evaluate((data) => {
          return data.href
        }, temp)
        data.push(await getOne(page, tempObj))
      }
    }
  }

  return Promise.resolve(data)
}

async function getOne(page, tempObj) {
  return Promise.resolve(tempObj)
}
