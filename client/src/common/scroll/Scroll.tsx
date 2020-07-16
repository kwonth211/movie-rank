import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import _ from "lodash"

import { getScrollTop, getScrollBottom, getScrollPercentage } from "./scrollHelpers"

export default function useScroll(throttle = 100) {
  const scrollThrottle = React.useRef(throttle)
  const [scroll, setScroll] = React.useState({
    hasScrolled: false,
    top: 0,
    bottom: 0,
    percentage: 0,
  })

  useEffect(() => {
    scrollThrottle.current = throttle
  }, [throttle])

  useEffect(() => {
    const updateScroll = () => {
      setScroll({
        hasScrolled: true,
        top: getScrollTop(),
        bottom: getScrollBottom(),
        percentage: getScrollPercentage(),
      })
    }
    const scrollListener = _.throttle(updateScroll, scrollThrottle.current)

    window.addEventListener("scroll", scrollListener)
    return () => {
      window.removeEventListener("scroll", scrollListener)
    }
  }, [])

  return scroll
}
