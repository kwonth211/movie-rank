import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    // width: "175px",
    display: "inlineBlock",
    whiteSpace: "nowrap",
    right: "1%",
    overflow: "hidden",
    /* 창에서 오른쪽 길이 */
    top: "37%",
  },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 300,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
  trRank: {
    maxWidth: "20px",
    width: "20px",
  },
  trName: {
    whiteSpace: "nowrap",
    maxWidth: "130px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
  },
  trVotes: {
    paddingRight: "50px",
    textAlign: "center",
  },
}))
