import mongoose from "mongoose"
import config from "./../config"
mongoose
  .connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0-umti3.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (response) => {
    console.log("몽구스 연결 성공")
    let userArray = await mongoose
      .model("user", {
        no: Number,
        name: String,
        ID: String,
        password: String,
        role: String,
        token: String,
      })
      .find()

    users.push(userArray)
    // console.log(userss)
  })

  .catch((err) => {
    console.log(err)
  })

let users = []

export default users
