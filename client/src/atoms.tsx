import { atom } from "recoil"
import { IUser } from "./interface/IUser"
export const UserState = atom({
  key: "UserState",
  default: null,
})
export const AllMovieAtom = atom({
  key: "AllMovieState",
  default: [],
})
