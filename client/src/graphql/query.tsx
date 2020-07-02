import { gql } from "apollo-boost"

const ME = gql`
  {
    me {
      ID
      token
      favoriteMovie
      no
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
      favoriteMovie
      no
    }
  }
`
const LOGOUT = gql`
  mutation {
    logout
  }
`
const UPDATEFAVORITEMOVIE = gql`
  mutation updateFavorite($movies: [String]!, $no: Int!) {
    updateFavorite(movies: $movies, no: $no)
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
      code
      englishName
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
      code
      englishName
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
  UPDATEFAVORITEMOVIE,
}

export default queryObj
