import { AuthenticationError, ForbiddenError } from "apollo-server"
import bcrypt from "bcrypt"
import sha256 from "crypto-js/sha256"
import rand from "csprng"
import { users, UserModel } from "./users"
import { movieArr, MovieModel } from "./movies"
import config from "./../config"
import nodemailer from "nodemailer"
import smtpPool from "nodemailer-smtp-pool"

const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) throw new AuthenticationError("Not Authenticated")

      return user
    },
    getMovieGenre: async (_, { genre }) => {
      let movies = []

      movies = await MovieModel.find({ genre })
      return movies
    },
    getMovieAll: async () => {
      return movieArr
    },
  },
  Mutation: {
    updateFavorite: async (_, { movies, no }) => {
      UserModel.findOneAndUpdate({ no }, { favoriteMovie: movies }, { new: true }, (err, doc) => {
        if (err) {
          console.log("에러 발생 >>", err)
        }
        let findIndex = users.findIndex((iter) => iter.no === no)
        users[findIndex].favoriteMovie = doc.favoriteMovie
      })

      return true
    },
    duplicateCheck: (_, { ID }) => {
      if (users.find((iter) => iter.ID === ID)) {
        return true
      } else {
        return false
      }
    },
    emailAuth: async (_, { mail }) => {
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

      // transporter.
      const from = "RankingWorld<mail@rankworld.com>"
      const to = mail
      const subject = "가입인증 메일"

      const randomString = Math.random().toString(36).slice(2)

      const html = "<p>아래 인증 코드를 복사하여 가입 창 E-mail Check란에 넣어주십시오.\n\n</p> " + "인증코드 :" + "<h3>" + randomString + "</h3>"

      const mailOptions = {
        from,
        to,
        subject,
        html,
      }

      await transporter.sendMail(mailOptions)

      transporter.close()
      return randomString
    },

    signup: async (_, { name, ID, password }) => {
      if (users.find((iter) => iter.ID === ID)) return false
      bcrypt.hash(password, 10, function (err, passwordHash) {
        const newUser = {
          no: users.length + 1,
          name,
          ID,
          password: passwordHash,
          role: "user",
          token: "",
        }
        UserModel(newUser).save()
        users = users.concat(newUser)
      })

      return true
    },
    login: async (_, { ID, password }) => {
      let user = users.find((iter) => iter.ID === ID)
      if (!user) return null // 해당 ID가 없을 때
      if (user.token) return user // 해당 ID로 이미 로그인되어 있을 때

      if (!bcrypt.compareSync(password, user.password)) return null // 비밀번호가 일치하지 않을 때

      user.token = sha256(rand(160, 36) + ID + password).toString()

      return user
    },
    logout: (_, __, { user }) => {
      if (user?.token) {
        // 로그인 상태라면(토큰이 존재하면)
        user.token = ""
      }
      return true
      // throw new AuthenticationError("Not Authenticated"); // 로그인되어 있지 않거나 로그인 토큰이 없을 때
    },
  },
}

export default resolvers
