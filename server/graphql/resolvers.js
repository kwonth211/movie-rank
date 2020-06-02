import { AuthenticationError, ForbiddenError } from "apollo-server"
import bcrypt from "bcrypt"
import sha256 from "crypto-js/sha256"
import rand from "csprng"
import users from "./users"

const resolvers = {
  Query: {
    // users: (_, __, { user }) => {
    //   console.log(users)
    //   console.log(user)

    //   if (!users) throw new AuthenticationError("Not Authenticated")
    //   if (!users.roles.includes("admin")) throw new ForbiddenError("Not Authorized")

    //   return users
    // },
    // me: (_, __, { user }) => {
    //   return users
    // },
    // me: (_, __, user) => {
    //   console.log(user)
    //   console.log(users)
    //   // if (!user) throw new AuthenticationError("Not Authenticated")

    //   return users
    // },
    me: async (a, arg, ctx) => {
      console.log(await ctx.users.find())
      return await ctx.users.find()
    },
  },
  Mutation: {
    signup: async (_, { mail, ID, password }, context) => {
      const user = await context.users.find()
      if (user.find((iter) => iter.ID === ID)) return false

      bcrypt.hash(password, 10, function (err, passwordHash) {
        const newUser = {
          no: user.length + 1,
          mail,
          ID,
          password: passwordHash,
          role: "user",
          token: "",
        }
        context.users(newUser).save()
        // user.push(newUser)
      })

      return true
    },
    login: (_, { ID, password }, context) => {
      let user = context.find((iter) => iter.ID === ID)
      if (!user) return null // 해당 ID가 없을 때
      if (user.token) return user // 해당 ID로 이미 로그인되어 있을 때

      if (!bcrypt.compareSync(password, user.passwordHash)) return null // 비밀번호가 일치하지 않을 때

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
