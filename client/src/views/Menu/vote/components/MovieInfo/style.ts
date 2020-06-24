import { makeStyles } from "@material-ui/core/styles"
import palette from "../../../../../theme/palette"

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    padding: "15px",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    // fontWeight: 700,
  },
  avatar: {
    backgroundColor: palette.error.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    // marginTop: theme.spacing(2),
    display: "block",
    alignItems: "center",
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
  caption: {
    color: "",
    fontSize: "15px",
  },
  image: {
    width: 200,
    height: 302,
  },
  img: {
    width: "100%",
    height: "100%",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  button: {
    marginTop: "50px",
  },
  heartSpan: {
    float: "right",
    fontSize: "25px",
    paddingBottom: "10px",
    color: "rgb(215, 215, 215)",

    "&:hover": {
      color: "red",
      // background: "red",
    },
  },
}))
