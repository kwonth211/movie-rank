import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import UserContext from "./../context/userContext"
import React, { useState, useContext, FunctionComponent } from "react"
import useReactRouter from "use-react-router"

const AuthRouter: React.FunctionComponent<{ path: String; component: FunctionComponent }> = ({ path, component }) => {
  console.log(component)
  debugger
  const { user, setUser } = useContext(UserContext)
  const { history, location, match } = useReactRouter()

  if (user?.token) {
    return <Route path={path} component={component} />
  } else {
    alert("로그인이 되어있지않아 로그인 페이지로 이동입니다")

    history.replace("/login")

    return <>로그인안됨</>
  }
}

export default AuthRouter
