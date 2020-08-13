import React, { useState, useEffect, useContext, useReducer } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import gql from "../../graphql/query"
import InKo from "inko"
import { useRecoilValue, useRecoilState } from "recoil"
import { UserState } from "../../atoms"
import { SignUp_view } from "./views/SignUp_view"
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks"

let count = 240
let timer
let authKey = ""
const inko = new InKo()

const initialState = {
  ID: "",
  password: "",
  name: "",
  emailComponent: false,
  validationEmail: false,
  emailValidationText: "",
  countState: "",
  emailFlag: false,
  progress: false,
  validationID: false,
}

const reducer = (state, { type, value }) => {
  switch (type) {
    case "SET_COUNT":
      state = {
        ...state,
        countState: value,
      }
      break
    case "SET_EMAILVALIDATION":
      state = {
        ...state,
        validationEmail: value,
      }
      break
    case "SET_PROGRESS":
      state = {
        ...state,
        progress: value,
      }
      break

    case "SET_EMAILCOMPONENT":
      state = {
        ...state,
        emailComponent: value,
      }
      break

    case "SET_EMAIL":
      state = {
        ...state,
        emailFlag: value,
      }
      break
    case "SET_VALIDATIONID":
      state = {
        ...state,
        validationID: value,
      }
      break
    case "SET_ID":
      state = {
        ...state,
        ID: value,
      }
      break
    case "SET_EMAILVALIDATIONTEXT":
      state = {
        ...state,
        emailValidationText: value,
      }
  }

  return state
}

export default function SignUp({ history }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const [signup, { data }] = useMutation(gql.SIGNUP)
  const [emailAuth] = useMutation(gql.EMAILAUTH)
  const [duplicateCheck] = useMutation(gql.DUPLICATE)
  const [user, setUser] = useRecoilState(UserState)

  const { ID, password, name, emailComponent, validationEmail, emailValidationText, countState, emailFlag, progress, validationID } = state

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

    dispatch({ type: "SET_COUNT", value: m })
  }

  const emailInputChange = (e) => {
    let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    if (regExp.test(e.target.value)) {
      dispatch({ type: "SET_VALIDATIONID", value: false })

      // 양식 맞음
    } else {
      dispatch({ type: "SET_VALIDATIONID", value: true })
    }
    dispatch({ type: "SET_ID", value: e.target.value })

    // setID(e.target.value)
  }
  const nameInputChange = (e) => {
    dispatch({ type: "SET_NAME", value: e.target.value })
  }

  const getEmailComponent = () => {
    return (
      <Grid item xs={12}>
        <TextField style={{ width: "60%", marginRight: "10px" }} variant="outlined" fullWidth name="text" label={countState} type="text" id="text" onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => dispatch({ type: "SET_EMAILVALIDATIONTEXT", value: e.target.value })} />
        <Button
          type="button"
          variant="contained"
          style={{ height: "56px", backgroundColor: "blue", color: "white" }}
          onClick={(e) => {
            if (countState == "00:00") {
              //시간초과
              const flag = window.confirm("유효시간이 초과되었습니다. 다시시도하시겠습니까?")

              if (flag) {
                dispatch({ type: "SET_EMAIL", value: false })

                count = 240
              }
            } else {
              if (authKey == emailValidationText) {
                alert("인증확인 되었습니다.")
                dispatch({ type: "SET_EMAILCOMPONENT", value: false })
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

  const passwordInputChange = (e) => {
    dispatch({ type: "SET_PASSWORD", value: e.target.value })
  }

  const onSubmitClick = (e) => {
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

    // emailFlag = false
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

      dispatch({ type: "SET_PROGRESS", value: true })
      let { data } = await emailAuth({ variables: { mail: ID } })
      dispatch({ type: "SET_PROGRESS", value: false })

      authKey = data?.emailAuth
      alert("이메일이 발송되었습니다.")
      dispatch({ type: "SET_EMAIL", value: true })

      timer = setInterval(timerFunction, 1000)

      dispatch({ type: "SET_EMAILCOMPONENT", value: true })
      dispatch({ type: "SET_VALIDATION", value: false })
    } else {
      dispatch({ type: "SET_EMAILCOMPONENT", value: false })
      dispatch({ type: "SET_VALIDATION", value: true })
    }
  }

  return <SignUp_view state={state} onSubmitClick={onSubmitClick} history={history} emailInputChange={emailInputChange} passwordInputChange={passwordInputChange} nameInputChange={nameInputChange} getEmailComponent={getEmailComponent} emailValidationClick={emailValidationClick} />
}
