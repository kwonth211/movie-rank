import users from "./../database/user"
import { AuthenticationError, ForbiddenError } from "apollo-server"
import bcrypt from "bcrypt"
import sha256 from "crypto-js/sha256"
import rand from "csprng"

export interface ILoginArguments {
  user: {
    roles: ""
    token: ""
  }
  ID: string
  password: string
}
const resolvers = {
  // Query: {
  //   // ...
  //   users: (_: any, __: any, { user }: ILoginArguments) => {
  //     if (!user) throw new AuthenticationError("Not Authenticated")
  //     if (!user.roles.includes("admin")) throw new ForbiddenError("Not Authorized")
  //     return users
  //   },
  //   me: (_: any, __: any, { user }: ILoginArguments) => {
  //     if (!user) throw new AuthenticationError("Not Authenticated")
  //     return user
  //   },
  // },
  // Mutation: {
  //   signup: (_: any, { user, ID, password }: ILoginArguments) => {
  //     if (users.find((user) => user.ID === ID)) return false
  //     bcrypt.hash(password, 10, function (err: any, passwordHash: any) {
  //       const newUser = {
  //         id: users.length + 1,
  //         ID,
  //         passwordHash,
  //         role: ["user"],
  //         token: "",
  //       }
  //       users.push(newUser)
  //     })
  //     return true
  //   },
  //   login: (_: any, { ID, password }: ILoginArguments) => {
  //     let user = users.find((user) => user.ID === ID)
  //     if (!user) return null // 해당 ID가 없을 때
  //     if (user.token) return null // 해당 ID로 이미 로그인되어 있을 때
  //     if (!bcrypt.compareSync(password, user.passwordHash)) return null // 비밀번호가 일치하지 않을 때
  //     user.token = sha256(rand(160, 36) + ID + password).toString()
  //     return user
  //   },
  //   logout: (_: any, __: any, { user }: ILoginArguments) => {
  //     if (user?.token) {
  //       // 로그인 상태라면(토큰이 존재하면)
  //       user.token = ""
  //       return true
  //     }
  //     throw new AuthenticationError("Not Authenticated") // 로그인되어 있지 않거나 로그인 토큰이 없을 때
  //   },
  // },
}

export default resolvers
