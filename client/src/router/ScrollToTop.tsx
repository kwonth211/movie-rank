import React, { Component, useEffect } from "react"
import { withRouter } from "react-router"

const ScrollToTop = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [props.location])

  return props.children
}

export default withRouter(ScrollToTop)
