import { atom } from "recoil"

export const UserState = atom({
  key: "UserState",
  default: null,
})
export const AllMovieState = atom({
  key: "AllMovieState",
  default: [],
})
