import React, { useCallback } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useTheme } from "@material-ui/core/styles"
import { SearchBox } from "../../../Main/SearhMain/components/SearchBox"

export const ResponsiveDialog = ({ open, callback }) => {
  //   const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

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
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>

        <DialogContent>
          <SearchBox callback={setSearchMovieCallback} />
          <DialogContentText>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</DialogContentText>
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
