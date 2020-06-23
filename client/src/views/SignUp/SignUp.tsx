import React, { useState, useEffect, useContext } from "react"
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
import gql from "../../graphql/query"
import ProgressModelComponent from "../../common/ProgressModelComponent"
import InKo from "inko"
import { useRecoilValue, useRecoilState } from "recoil"
import { UserState } from "../../atoms"

import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks"
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

const useStyles = makeStyles((theme) => ({
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

let count = 240

let timer

let authKey = ""
const inko = new InKo()

export default function SignUp({ history }) {
  const classes = useStyles()
  const [ID, setID] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [emailComponent, setEmailComponent] = useState(false)
  const [validationEmail, setValidationEmail] = useState(false)
  const [signup, { data }] = useMutation(gql.SIGNUP)
  const [emailAuth] = useMutation(gql.EMAILAUTH)
  const [emailValidationText, setEmailValidationText] = useState("")
  let [countState, setCountState] = useState("")
  const [duplicateCheck] = useMutation(gql.DUPLICATE)
  const [user, setUser] = useRecoilState(UserState)

  let [emailFlag, setEmailFlag] = useState(false)

  const [progress, setProgress] = useState(false)
  const [validationID, setValidationID] = useState(false)

  const [login] = useMutation(gql.LOGIN)
  if (user) history.replace("/")

  useEffect(() => {
    if (data?.signup === true) {
      window.alert("회원가입에 성공했습니다.")

      login({ variables: { ID, password } }).then(({ data }) => {
        localStorage.setItem("token", data.login.token)
        setUser(data.login)
        history.push("/")
      })
    } else if (data?.signup === false) {
      alert("이미 존재하는 ID 입니다.")
    }
  }, [data]) //DEBUG

  const timerFunction = () => {
    let m = "0" + Math.floor(count / 60) + ":" + ((count % 60).toString().length === 1 ? "0" + (count % 60) : count % 60) // 남은 시간 계산
    count--
    if (count < 0) {
      timer = clearInterval(timer)
      // window.alert("유효시간이 초과되었습니다.")
    }
    setCountState(m)
    // setEmailComponent(getEmailComponent())
  }

  const getEmailComponent = () => {
    return (
      <Grid item xs={12}>
        <TextField style={{ width: "60%", marginRight: "10px" }} variant="outlined" fullWidth name="text" label={countState} type="text" id="text" onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setEmailValidationText(e.target.value)} />
        <Button
          type="button"
          variant="contained"
          style={{ height: "56px", backgroundColor: "blue", color: "white" }}
          onClick={(e) => {
            if (countState == "00:00") {
              //시간초과
              const flag = window.confirm("유효시간이 초과되었습니다. 다시시도하시겠습니까?")

              if (flag) {
                // window.location.reload(true)
                setEmailFlag(false)
                count = 240
                // emailValidationClick()
              }
            } else {
              if (authKey == emailValidationText) {
                alert("인증확인 되었습니다.")
                setEmailComponent(false)
              } else {
                if (emailValidationText) {
                  alert("문자가 일치하지 않습니다.")
                } else {
                  alert("문자를 입력해주세요.")
                }
              }
            }
          }}
        >
          인증번호 확인
        </Button>
      </Grid>
    )
  }

  const emailValidationClick = async () => {
    let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

    if (regExp.test(ID)) {
      //이메일 인증이 되었다면 아이디 중복체크

      const response = await duplicateCheck({ variables: { ID } })

      if (response?.data?.duplicateCheck) {
        //통과
        alert("이미 존재하는 ID 입니다")
        return
      } else {
      }

      setProgress(true)
      let { data } = await emailAuth({ variables: { mail: ID } })

      setProgress(false)
      authKey = data?.emailAuth
      alert("이메일이 발송되었습니다.")
      setEmailFlag(true)

      timer = setInterval(timerFunction, 1000)
      setEmailComponent(true)
      setValidationEmail(false)
    } else {
      setEmailComponent(false)
      setValidationEmail(true)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <ProgressModelComponent flag={progress} />

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
                label="고객님의 이름을 입력해주세요"
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  setName(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                style={{ width: "68%", marginRight: "10px" }}
                onKeyDown={(e) => {
                  setTimeout(() => {
                    let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
                    if (regExp.test(ID)) {
                      setValidationID(false)
                      // 양식 맞음
                    } else {
                      setValidationID(true)
                    }
                  })
                }}
                error={validationID}
                helperText={validationID ? "이메일 형식으로 입력해주세요." : ""}
                variant="outlined"
                required
                id="email"
                label="이메일 (aaa@rankingworld.com)"
                name="email"
                autoComplete="email"
                onChange={(e) => setID(e.target.value)}
              />
              <Button
                type="button"
                variant="contained"
                style={{ height: "56px" }}
                disabled={emailFlag}
                onClick={async () => {
                  emailValidationClick()
                }}
              >
                이메일 인증
              </Button>
            </Grid>
            {emailComponent ? getEmailComponent() : <></>}
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="password" label="비밀번호를 입력해주세요" type="password" id="password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
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
              if (!(ID && password && name)) {
                alert("항목을 모두 입력해주세요")
                return
              }

              if (authKey && emailFlag && count > 0 && !emailComponent) {
                // 인증키를 발급받고 인증확인이 되었을때 인증시간이 지나지 않았을때
                signup({ variables: { ID, password: inko.ko2en(password), name } })
              } else {
                alert("이메일 인증을 해주세요")
              }
              // signup({ variables: { ID, password, name } })

              emailFlag = false
            }}
          >
            회원 가입
          </Button>
          <Grid container justify="flex-end" style={{ marginTop: "20px" }}>
            <Grid item>
              <Link
                onClick={() => {
                  history.push("/login")
                }}
                className={classes.link}
                variant="body2"
              >
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
