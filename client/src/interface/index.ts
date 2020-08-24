// export type{ default as IMovie } from "./IMovie"
// export type { default as IUser } from "./IUser"

export interface IMovie {
  imgUrl: string
  cast: [string]
  runtime: string
  released: [string]
  directors: [string]
  writers: [string]
  year: string
  countries: [string]
  languages: [string]
  profit: string
  name: string
  votes: Number
  hashTag: [string]
  genre: [string]
  code: number
  englishName: string
}
export interface IUser {
  no: number
  ID: string
  name: String
  passwordHash: String
  role: String
  token: String
  favoriteMovie: [String]
}
