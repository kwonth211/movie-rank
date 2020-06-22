import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import { Typography } from "@material-ui/core"
import Backdrop from "@material-ui/core/Backdrop"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer,
      color: "black",
      background: "transparent",
    },
    typography: {
      fontFamily: "Noto Sans KR !important",
    },
    test: {
      zIndex: 2,
    },
  })
)

interface ProgressProps {
  flag?: boolean
}
export const ProgressModelComponent: React.FunctionComponent<ProgressProps> = ({ flag = true }) => {
  const classes = useStyles()
  return (
    <Backdrop className={classes.backdrop} open={flag}>
      <CircularProgress size={200} className={classes.test} color="inherit" />

      <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
        <Typography className={classes.typography} variant="h5" component="div" style={{ color: "black" }}>
          loading...
        </Typography>
      </Box>
    </Backdrop>
  )
}
ProgressModelComponent.defaultProps = {
  flag: true,
}
export default ProgressModelComponent
