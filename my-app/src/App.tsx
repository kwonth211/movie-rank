import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { type } from 'os';
import Greetings from './components/main';


function App() {

  //const a = useState
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          let's get it
         
        </p>
        <Greetings name="hello world" mark="!!!!!"></Greetings>
      </header>
    </div>
  );
}

export default App;
