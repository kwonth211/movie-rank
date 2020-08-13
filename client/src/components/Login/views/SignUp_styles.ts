import { makeStyles } from "@material-ui/core/styles"

export const SignUpViewStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid rgb(192,192,192)",
    padding: "35px",
    width: "450px",
    height: "520px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none !important",
    color: "black",
    cursor: "pointer",
  },
}))
