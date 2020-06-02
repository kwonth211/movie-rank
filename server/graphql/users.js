import mongoose from "mongoose"

mongoose
  .connect("mongodb+srv://kwonth211:shdrn1@cluster0-umti3.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("몽구스 연결 성공")
  })
  .catch((err) => {
    console.log(err)
  })
