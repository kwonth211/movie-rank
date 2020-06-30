import RouterComponent from "./router/Router"
import React, { useState, useEffect } from "react"
// import { gql } from "apollo-boost"
import gql from "./graphql/query"
import { RecoilRoot, atom, useRecoilState } from "recoil"
import { AllMovieState } from "./atoms"
import "./App.css"
import "./index.css"
import { useQuery, useLazyQuery } from "@apollo/react-hooks"

import { IMovie } from "./interface/IMovie"

function App() {
  const [getMovieAll, { called, loading, data }] = useLazyQuery(gql.GETMOVIEALL)

  // const { data } = useQuery(gql.ME)
  const [AllMovie, setAllMovie] = useRecoilState(AllMovieState)

  // console.log("data>>>>", data)

  useEffect(() => {
    getMovieAll()
    if (data?.getMovieAll) {
      // allMovieList = data.getMovieAll
      setAllMovie(data.getMovieAll)
    }
  }, [data])
  return <RouterComponent />
}

export default App
