import config from "./../config"

const nodemailer = require("nodemailer")
const smtpPool = require("nodemailer-smtp-pool")

// smtpPool는 smtp서버를 사용하기 위한 모듈로
// transporter객체를 만드는 nodemailer의 createTransport메소드의 인자로 사용된다.

const from = "RankingWorld<mail@rankworld.com>"
const to = "kwonth211@naver.com"
const subject = "가입인증 메일"
const html = "<p>난수!!!!</p> 해당 문자열을 홈페이지에 기입해주세요."
// const text = 'This is just text.';

const mailOptions = {
  from,
  to,
  subject,
  html,
  // text,
}
// 본문에 html이나 text를 사용할 수 있다.

const transporter = nodemailer.createTransport(
  smtpPool({
    service: config.EMAIL.service,
    host: config.HOST,
    port: config.PORT,
    auth: {
      user: config.EMAIL.emailId,
      pass: config.EMAIL.password,
    },
    tls: {
      rejectUnauthorize: false,
    },
    maxConnections: 5,
    maxMessages: 10,
  })
)

// 메일을 전송하는 부분
transporter.sendMail(mailOptions, (err, res) => {
  if (err) {
    console.log("failed... => ", err)
  } else {
    console.log("succeed... => ", res)
  }

  transporter.close()
})
