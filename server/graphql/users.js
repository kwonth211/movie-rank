import config from "./../config"
import mongoose from "mongoose"

export const UserModel = mongoose.model("user", {
  no: Number,
  name: String,
  ID: String,
  password: String,
  role: String,
  token: String,
  favoriteMovie: Array,
})

export let users = []
;(async () => {
  users = users.concat(await UserModel.find())

  console.log("유저 로딩 완료")
})()

// export const users = () => {
//   return usersTest
// }

// export const moviesArray = () => {}
