import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import React, { useContext, FunctionComponent, useEffect } from "react"
import useReactRouter from "use-react-router"
import { useRecoilValue, useRecoilState } from "recoil"
import { UserState } from "../atoms"

const AuthRouter: React.FunctionComponent<{
  path: String
  component: FunctionComponent<Route>
}> = ({ path, component, children }) => {
  const user = useRecoilValue(UserState)

  const { history } = useReactRouter()

  useEffect(() => {
    if (localStorage?.token) {
    } else {
      alert("로그인이 되어있지않아 로그인 페이지로 이동입니다")
      history.replace("/login")
    }
  }, [user])

  return <Route path={path} component={component} />
}

export default AuthRouter
