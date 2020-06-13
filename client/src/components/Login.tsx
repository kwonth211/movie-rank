import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import React, { useState, useEffect, useContext } from "react"
import { useMutation } from "@apollo/react-hooks"
import UserContext from "./../context/userContext"
import gql from "./../graphql/query"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid rgb(192,192,192)",
    padding: "35px",
    width: "450px",
    height: "450px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    // margin: theme.spacing(3, 0, 3),
    marginBottom: "30px",
    paddingBottom: "30px",
  },

  link: {
    textDecoration: "none !important",
    color: "black",
    cursor: "pointer",
  },
}))

export default function LoginComponent({ history }) {
  const classes = useStyles()
  const [ID, setID] = useState("")
  const [password, setPassword] = useState("")
  const [login, { data, loading, error }] = useMutation(gql.LOGIN)
  const { user, setUser } = useContext(UserContext)

  if (user) history.replace("/")

  useEffect(() => {
    if (data?.login) {
      localStorage.setItem("token", data.login.token)
      setUser(data.login)
      alert("로그인에 성공했습니다.")
    } else if (data?.login === null) alert("아이디 또는 비밀번호를 잘못 입력했습니다.")
  }, [data, setUser])

  if (loading) return "Loading..."

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          {/* Movie Ranking <br /> */}
        </Typography>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form className={classes.form} noValidate>
          <TextField variant="outlined" margin="normal" fullWidth id="email" label="이메일 (aaa@rankingworld.com)" name="email" autoComplete="email" autoFocus onChange={(e) => setID(e.target.value)} />
          <TextField variant="outlined" margin="normal" fullWidth name="password" label="비밀번호" type="password" id="password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="로그인 상태 유지" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#413e3e", color: "white" }}
            // color="inherit"
            // className={classes.submit}
            onClick={(e) => {
              e.preventDefault()
              login({ variables: { ID, password } })
              setID("")
              setPassword("")
            }}
          >
            로그인
          </Button>
          <Grid container style={{ marginTop: "20px" }}>
            <Grid item xs>
              <Link className={classes.link} variant="body2">
                비밀번호를 잃어버리셨나요?
              </Link>
            </Grid>
            <Grid item>
              <Link
                className={classes.link}
                onClick={() => {
                  history.push("/signup")
                }}
                variant="body2"
              >
                {"회원가입 하기"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
