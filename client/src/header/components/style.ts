import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    height: "100%",
    // color: "white !important",

    // background: "black",
    // width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 2,
    color: "white",
  },
  autoComplete: {
    display: "block",
    marginLeft: "42px",
    width: "auto",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 50,
    margin: 4,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 4),
  },
  heroButtons: {
    marginTop: theme.spacing(6),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 2,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 156,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  carMapContainer: {
    "&:hover": {
      // opacity: 1,
      boxShadow: theme.shadows[7],
    },
    // opacity: 0.65,
    // borderTop: "1px solid rgb(224,224,224)",
    // borderRight: "1px solid rgb(224,224,224)",
    // borderLeft: "1px solid rgb(224,224,224)",
    borderBottom: "1px solid rgb(224,224,224)",
    // paddingTop: "15px", // 16:9
    marginBottom: "20px",
    cursor: "pointer",
  },
  star: {
    // paddingRight: "30px",
    // width: "10px",
  },
  starImage: {
    width: "20px",
    // paddingLeft: "5px",
    // paddingRight: "0px",
    marginLeft: "12px",
  },
  underline: {
    "&&&:before": {
      borderBottom: "none !important",
    },
    "&&:after": {
      borderBottom: "none !important",
    },
  },
}))
