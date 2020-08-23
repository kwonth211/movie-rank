export interface IUser {
  no: number
  ID: string
  name: String
  passwordHash: String
  role: String
  token: String
  favoriteMovie: [String]
}
export default IUser
