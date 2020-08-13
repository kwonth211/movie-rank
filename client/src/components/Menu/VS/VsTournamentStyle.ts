import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      "&:hover, &$focusVisible": {
        opacity: 1,
      },
      opacity: 0.7,
    },
    root: {
      // backgroundColor: theme.palette.background.paper,

      position: "absolute",
      bottom: 0,
      marginBottom: "20px",
    },
    gridList: {
      width: "40%",
      height: "100%",
      "&:hover": {},
    },

    cardContent: {
      // flexGrow: 1,
    },
    // footer: {
    //   backgroundColor: theme.palette.background.paper,
    //   padding: theme.spacing(6),
    // },
    addButton: {
      // position: "fixed",
      // top: "60%",
    },
    verticalLine: {
      height: "50px",
      width: "0px",
      borderRight: "0px",
      // marginTop: "15px",
    },
    horizontaLine: {
      alignItems: "left",
      marginLeft: "60px",
      paddingLeft: "60px",
    },
    noneLine: {
      alignItems: "right",
      marginRight: "80px",
      paddingRight: "80px",
    },
  })
)
