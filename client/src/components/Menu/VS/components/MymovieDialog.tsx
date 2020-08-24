import React, { useCallback, useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { makeStyles, createStyles, useTheme, Theme } from "@material-ui/core/styles"
import { SearchBox } from "./dialog/SearchBox/SearchBox"
import { green, red } from "@material-ui/core/colors"
import Icon from "@material-ui/core/Icon"
import { useStyles } from "./styles"
import MovieList from "./dialog/SearchMovieList/SearchMovieList"
import { IMovie } from "../../../../interface/IMovie"
import { cpuUsage } from "process"

interface props {
  open: boolean
  callback: Function
  totalImage: IMovie[]
  searchList: IMovie[]
}
export const ResponsiveDialog: React.FunctionComponent<props> = ({ open, callback, totalImage, searchList }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"))

  let [movies, setMovies] = useState<IMovie[]>([])
  let [searchListDialog, setSearchList] = useState<IMovie[]>([])

  useEffect(() => {
    setMovies(totalImage)
  }, [totalImage])
  useEffect(() => {
    setSearchList(searchList)
  }, [searchList])

  const classes = useStyles()

  const clickOk = () => {
    // setOpen(true)
    callback(movies)
  }

  const handleClose = () => {
    callback()
    // setTimeout(() => {
    //   setMovies(totalImage);
    // }, 200);
  }

  const removeMovie = (e, i) => {
    e.stopPropagation()

    movies = movies.filter((iter, index) => i !== index)
    setMovies(movies)
  }

  const setSearchMovieCallback = (param) => {
    if (Object.keys(param).length > 0) {
      searchList = searchList.filter((movie) => param.code !== movie.code)
      console.log(searchList.length)
      setSearchList([...searchList])
      setMovies([param, ...movies])
    }
  }
  // const setSearchMovieCallback = useCallback((param) => {
  //   console.log(movies);
  //   // setMovies([...param, ...movies]);
  //   //   if (param.length > 0) {
  //   //     return setSearchMovie(param)
  //   //   } else {
  //   //     return setSearchMovie(rankMovie.slice(0, 5))
  //   //   }
  // }, []);

  return (
    <div>
      <Dialog style={{ top: "20%", maxHeight: "500px" }} fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{"취향에 맞는 영화를 고를 수 있습니다."}</DialogTitle>

        <DialogContent>
          <SearchBox movies={movies} searchList={searchListDialog} styleFlag={"dialog"} callback={setSearchMovieCallback} text={"원하는 영화를 검색해주세요"} />

          <MovieList movies={movies} removeMovie={removeMovie} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={clickOk} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default ResponsiveDialog
