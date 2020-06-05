const axios = require("axios")
const cheerio = require("cheerio")

export const getHtml = async () => {
  try {
    return await axios.get("https://ko.wikipedia.org/wiki/%EB%B6%84%EB%A5%98:2012%EB%85%84_%EC%98%81%ED%99%94")
  } catch (error) {
    console.log("error", error)
  }
}

getHtml()
  .then((html) => {
    let ulList = []
    const $ = cheerio.load(html.data)

    const $bodyList = $("div.mw-body-content").find("a")

    $bodyList.each(function (i, elem) {
      console.log($(this).text())
      console.log($(this).attr("href"))
    })

    let data = {}
    // $bodyList.each(function (i, elem) {
    //   console.log($(this).find("ul").text())
    //   console.log($(this).attr("href"))
    //   $(this)
    //     .find("a")
    //     .each(function (i, elem) {
    //       //   console.log($(this).attr("href"))
    //     })
    // })
    // console.log(data)

    return data
  })
  .then((res) => {})
