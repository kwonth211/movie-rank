import React, { useCallback } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { makeStyles, createStyles, useTheme, Theme } from "@material-ui/core/styles"
import { SearchBox } from "../../../Main/SearhMain/components/SearchBox"
import { green, red } from "@material-ui/core/colors"
import Icon from "@material-ui/core/Icon"
import { useStyles } from "./styles"
import MovieList from "./SearchMovieList/SearchMovieList"
import { IMovie } from "../../../../interface/IMovie"

interface props {
  open: boolean
  callback: Function
  totalImage: IMovie[]
}
export const ResponsiveDialog: React.FunctionComponent<props> = ({ open, callback, totalImage }) => {
  //   const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"))

  const classes = useStyles()

  const handleClickOpen = () => {
    // setOpen(true)
    callback()
  }

  const handleClose = () => {
    // setOpen(false)
    callback()
  }

  const setSearchMovieCallback = useCallback((param) => {
    //   if (param.length > 0) {
    //     return setSearchMovie(param)
    //   } else {
    //     return setSearchMovie(rankMovie.slice(0, 5))
    //   }
  }, [])

  return (
    <div>
      <Dialog style={{ top: "20%", maxHeight: "500px" }} fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>

        <DialogContent>
          <SearchBox styleFlag={"dialog"} callback={setSearchMovieCallback} text={"원하는 영화를 검색해주세요"} />

          {/* <DialogContentText> */}

          {/* </DialogContentText> */}

          <MovieList totalImage={totalImage} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default ResponsiveDialog
