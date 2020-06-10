import React, { useState, useEffect } from "react"
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
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const SIGNUP = gql`
  mutation signup($ID: String!, $password: String!, $mail: String!) {
    signup(ID: $ID, password: $password, mail: $mail)
  }
`

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",

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

let count = 240

let timer

export default function SignUp({ history }) {
  const classes = useStyles()
  const [ID, setID] = useState("")
  const [password, setPassword] = useState("")
  const [mail, setMail] = useState("")
  const [emailComponent, setEmailComponent] = useState(false)
  const [validationEmail, setValidationEmail] = useState(false)
  const [signup, { data }] = useMutation(SIGNUP)
  let [countState, setCountState] = useState("")

  useEffect(() => {
    if (data?.signup === true) {
      window.alert("회원가입에 성공했습니다.")
      history.push("/")
    } else if (data?.signup === false) {
      alert("이미 존재하는 ID 입니다.")
    }
  }, [data]) //DEBUG

  const timerFunction = () => {
    let m = "0" + Math.floor(count / 60) + ":" + ((count % 60).toString().length === 1 ? "0" + (count % 60) : count % 60) // 남은 시간 계산
    count--
    if (count < 0) {
      clearInterval(timer)
      window.alert("유효시간이 초과되었습니다.")
    }
    setCountState(m)
    // setEmailComponent(getEmailComponent())
  }

  const getEmailComponent = () => {
    return (
      <Grid item xs={12}>
        <TextField style={{ width: "60%", marginRight: "10px" }} variant="outlined" fullWidth name="text" label={countState} type="text" id="text" onChange={(e) => e} />
        <Button type="button" variant="contained" style={{ height: "56px", backgroundColor: "blue", color: "white" }} onClick={() => {}}>
          인증번호 확인
        </Button>
      </Grid>
    )
  }

  const getValidationEmail = () => <div style={{ marginLeft: "8px" }}>올바른 이메일 형식이 아닙니다</div>

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="id"
                variant="outlined"
                required
                fullWidth
                id="id"
                label="이름"
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  setID(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField style={{ width: "70%", marginRight: "10px" }} variant="outlined" required id="email" label="이메일" name="email" autoComplete="email" onChange={(e) => setMail(e.target.value)} />
              <Button
                type="button"
                variant="contained"
                style={{ height: "56px" }}
                onClick={() => {
                  let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

                  if (regExp.test(mail)) {
                    alert("이메일이 발송되었습니다.")
                    timer = setInterval(timerFunction, 1000)
                    setEmailComponent(true)
                    setValidationEmail(false)
                  } else {
                    setEmailComponent(false)
                    setValidationEmail(true)
                  }
                }}
              >
                이메일 인증
              </Button>
            </Grid>
            {emailComponent ? getEmailComponent() : <></>}
            {validationEmail ? getValidationEmail() : <></>}
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="password" label="비밀번호" type="password" id="password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // color="primary"
            style={{ backgroundColor: "#413e3e", color: "white" }}
            // className={classes.submit}
            onClick={(e) => {
              e.preventDefault()
              if (!(ID && password && mail)) {
                alert("항목을 모두 입력해주세요")
                return
              }
              signup({ variables: { ID, password, mail } })
            }}
          >
            회원 가입
          </Button>
          <Grid container justify="flex-end" style={{ marginTop: "20px" }}>
            <Grid item>
              <Link className={classes.link} variant="body2">
                이미 가입되어 있다면 로그인
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
