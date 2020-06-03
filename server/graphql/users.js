import mongoose from "mongoose"

mongoose
  .connect("mongodb+srv://kwonth211:shdrn1@cluster0-umti3.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (response) => {
    console.log("몽구스 연결 성공")
    let userArray = await mongoose
      .model("user", {
        no: Number,
        mail: String,
        ID: String,
        password: String,
        role: String,
        token: String,
      })
      .find()

    users.push(userArray)
  })

  .catch((err) => {
    console.log(err)
  })

let users = []

export default users
// export default users = mongoose.model("user", {
//   no: Number,
//   mail: String,
//   ID: String,
//   password: String,
//   role: String,
//   token: String,
// })
