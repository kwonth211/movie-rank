import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  content: {
    padding: 0,
  },
  image: {
    height: 48,
    width: 48,
  },
  actions: {
    justifyContent: "flex-end",
  },
  icon: {
    float: "right",
  },
}))
