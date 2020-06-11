import { AuthenticationError, ForbiddenError } from "apollo-server"
import bcrypt from "bcrypt"
import sha256 from "crypto-js/sha256"
import rand from "csprng"
import users from "./users"
import movies from "./movies"
import mongoose from "mongoose"
import emailAuth from "./emailAuth"

const resolvers = {
  Query: {
    // users: (_, __, { user }) => {
    //   if (!users) throw new AuthenticationError("Not Authenticated")
    //   if (!users.roles.includes("admin")) throw new ForbiddenError("Not Authorized")

    //   return users
    // },
    me: (_, __, { user }) => {
      if (!user) throw new AuthenticationError("Not Authenticated")

      return user
    },
    getMovieGenre: async (_, { genre }) => {
      let model = mongoose.model("movies")

      const movies = await model.find({ genre })

      return movies
    },
  },
  Mutation: {
    // emailTest: () => {},

    signup: async (_, { mail, ID, password }) => {
      if (users.find((iter) => iter.ID === ID)) return false
      bcrypt.hash(password, 10, function (err, passwordHash) {
        const newUser = {
          no: users.length + 1,
          mail,
          ID,
          password: passwordHash,
          role: "user",
          token: "",
        }
        let model = mongoose.model("user")
        model(newUser).save()
        users[0] = users[0].concat(newUser)
      })

      return true
    },
    login: async (_, { ID, password }) => {
      let user = users[0].find((iter) => iter.ID === ID)
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
        return true
      }

      throw new AuthenticationError("Not Authenticated") // 로그인되어 있지 않거나 로그인 토큰이 없을 때
    },
  },
}

export default resolvers
