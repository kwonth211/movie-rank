import { atom } from "recoil"
import { IUser } from "./interface/IUser"
export const UserState = atom({
  key: "UserState",
  default: null,
})
export const AllMovieState = atom({
  key: "AllMovieState",
  default: [],
})
