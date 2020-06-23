import React, { useState, useEffect, useContext, useRef, MutableRefObject, RefObject } from "react"
import { useRecoilValue, useRecoilState } from "recoil"
import { AllMovieState } from "../../../atoms"
import { IMovie } from "../../../graphql/query"

let movieString = ""
const MovieDetail = ({ history }) => {
  const allMovie = useRecoilValue<IMovie[] | null>(AllMovieState)
  const [searchMovie, setSearchMovie] = useState<IMovie | null>(null)

  if (window.location.search) {
    movieString = decodeURI(window.location.search.split("=")[1])
  } else {
    alert("검색된 영화가 없습니다")
    history.replace("/vote")
  }

  useEffect(() => {
    if (allMovie) {
      const filterData = allMovie.filter((iter) => iter.name === movieString)[0]
      setSearchMovie(filterData)
    }
  }, [allMovie])

  if (searchMovie) {
    return <div>{searchMovie.name}</div>
  } else {
    return null
  }
}

export default MovieDetail
