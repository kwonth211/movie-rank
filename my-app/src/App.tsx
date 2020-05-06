import React, { useState } from "react"
// import React from "react"
import logo from "./logo.svg"
import "./App.css"
import { type } from "os"
import Greetings from "./components/main"

function App() {
  //const a = useState
  const [a, setA] = useState(1)
  console.log(a)

  let callback = {
    setState: (count: number) => {
      setA(count + 1)
    },
  }

  return (
    <div>
      <p>let's get it</p>
      <Greetings count={a} name="hello world" mark="!!!!!"></Greetings>
    </div>
  )
}

export default App
