import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://kwonth211:shdrn1@cluster0-umti3.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("몽구스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });
const users = [
  {
    ID: "kwonth211",
    password: "admin",
  },
];

export default users;
