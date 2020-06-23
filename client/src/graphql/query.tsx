import { gql } from "apollo-boost"
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
}
const ME = gql`
  {
    me {
      ID
      token
    }
  }
`
const SIGNUP = gql`
  mutation signup($ID: String!, $password: String!, $name: String!) {
    signup(ID: $ID, password: $password, name: $name)
  }
`
const EMAILAUTH = gql`
  mutation emailAuth($mail: String!) {
    emailAuth(mail: $mail)
  }
`
const DUPLICATE = gql`
  mutation duplicateCheck($ID: String!) {
    duplicateCheck(ID: $ID)
  }
`
const LOGIN = gql`
  mutation login($ID: String!, $password: String!) {
    login(ID: $ID, password: $password) {
      ID
      name
      role
      token
    }
  }
`
const LOGOUT = gql`
  mutation {
    logout
  }
`
const GETMOVIEGENRE = gql`
  query getMovieGenre($genre: String!) {
    getMovieGenre(genre: $genre) {
      imgUrl
      name
      runtime
      released
      directors
      writers
      # // awards :   ??
      year
      countries
      languages
      # // ProductionCost: String
      profit
      votes
      hashTag
      genre
    }
  }
`

// 인터페이스 추가
const GETMOVIEALL = gql`
  query getMovieAll {
    getMovieAll {
      imgUrl
      name
      runtime
      released
      directors
      writers
      year
      countries
      languages
      profit
      votes
      hashTag
      genre
    }
  }
`

const queryObj = {
  ME,
  SIGNUP,
  EMAILAUTH,
  DUPLICATE,
  LOGIN,
  LOGOUT,
  GETMOVIEGENRE,
  GETMOVIEALL,
}

export default queryObj
