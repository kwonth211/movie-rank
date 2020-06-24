import React, { useState, useEffect, useContext, useRef, MutableRefObject, RefObject } from "react"
import { useRecoilValue, useRecoilState } from "recoil"
import { AllMovieState } from "../../../atoms"
import { IMovie } from "../../../graphql/query"
import { Grid } from "@material-ui/core"
import { Theme, makeStyles } from "@material-ui/core/styles"
import { MovieInfo, TotalUsers, TasksProgress, TotalProfit, LatestSales, GenreGraph, Review, RealtimeVoting } from "./components"

let movieString = ""

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))
const MovieDetail = ({ history }) => {
  const classes = useStyles()

  const allMovie = useRecoilValue<IMovie[] | null>(AllMovieState)
  const [searchMovie, setSearchMovie] = useState<IMovie | null>(null)

  if (window.location.search) {
    movieString = decodeURI(window.location.search.split("=")[1])
  } else {
    alert("검색된 영화가 없습니다")
    history.replace("/vote")
  }

  useEffect(() => {
    if (allMovie && allMovie?.length > 0) {
      let filterData = allMovie.filter((iter) => iter.name === movieString)[0]
      if (filterData === undefined) {
        filterData = Object()
      }
      setSearchMovie(filterData)
    }
  }, [allMovie])

  console.log(searchMovie)
  if (searchMovie) {
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={8} sm={8} xl={8} xs={12}>
            <MovieInfo searchMovie={searchMovie} />
          </Grid>

          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Review />
          </Grid>

          <Grid item lg={5} md={6} xl={3} xs={12}>
            <RealtimeVoting />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <Review />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <GenreGraph />
          </Grid>
        </Grid>
      </div>
    )
  } else {
    return null
  }
}

export default MovieDetail
