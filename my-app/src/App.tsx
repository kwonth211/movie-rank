import React, { useState } from "react";
// import React from "react"
import logo from "./logo.svg";
import "./App.css";
import { type } from "os";
import Greetings from "./components/main";
import {
  Button,
  AppBar,
  IconButton,
  Typography,
  Toolbar,
} from "@material-ui/core/";
import Header from "./header";
function App() {
  //const a = useState
  const [a, setA] = useState(1);

  let callback = {
    setState: (count: number) => {
      setA(count + 1);
    },
  };

  return (
    <div>
      <Header></Header>
      <p>let's get it</p>
      <Greetings count={a} name="hello world" mark="!!!!!"></Greetings>
    </div>
  );
}

export default App;
