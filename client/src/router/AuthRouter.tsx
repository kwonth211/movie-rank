import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import UserContext from "./../context/userContext"
import React, { useState, useContext, FunctionComponent, useEffect } from "react"
import useReactRouter from "use-react-router"

const AuthRouter: React.FunctionComponent<{ path: String; component: FunctionComponent }> = ({ path, component }) => {
  console.log(component)
  const { user } = useContext(UserContext)
  const { history, location, match } = useReactRouter()

  useEffect(() => {
    if (localStorage?.token) {
    } else {
      alert("로그인이 되어있지않아 로그인 페이지로 이동입니다")
      history.replace("/login")
    }
  }, [user])

  //   return <>로그인안됨</>
  // }
  return <Route path={path} component={component} />
}

export default AuthRouter
