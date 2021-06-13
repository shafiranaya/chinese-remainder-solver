import logo from './logo.svg';
import './App.css';
import Calculator from './components/Calculator';

import React, { Component } from 'react';
// import Tab from '@material-ui/core/Tab';
// or
import { Tab, Tabs, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';

// import {
//   Route,
//   NavLink,
//   HashRouter
// } from 'react-router-dom';

// const primary = #9575cd;

function App() {
  return (
    <div className="App">
        <Container>
    {/* <Tabs
      // value={value}
      // onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab label="Item One" />
      <Tab label="Item Two" />
      <Tab label="Item Three" />
    </Tabs> */}


    <body>
      <h1>Chinese Remainder Solver</h1>
      <br></br>

      <Calculator/>
      </body>
      <footer>
        13519040 - Shafira Naya Aprisadianti
      </footer>
  </Container>


    </div>
  );
}

export default App;