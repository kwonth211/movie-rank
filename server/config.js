require("dotenv").config()

module.exports = {
  PORT: process.env.port,
  HOST: process.env.host,

  EMAIL: {
    emailId: process.env.EMAIL_ID,
    password: process.env.EMAIL_PASSWORD,
    service: process.env.EMAIL_SERVICE,
  },
  DATABASE: {
    dbId: process.env.DB_ID,
    password: process.env.DB_PASSWORD,
  },
}
