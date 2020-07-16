import { makeStyles, createStyles, useTheme, Theme } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      //   "& > span": {
      //     // marginTop: "7px",
      //     paddingTop: "7px",
      //     // height: "20px",
      //   },
      display: "inline",
    },
  })
)
