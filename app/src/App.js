import logo from './logo.svg';
import './App.css';
import Calculator from './components/Calculator';
import MyForm from './components/MyForm';

import './solver';
import React, { Component } from 'react';
// import Tab from '@material-ui/core/Tab';
// or
import { Tab, Tabs, Paper } from '@material-ui/core';
// import {
//   Route,
//   NavLink,
//   HashRouter
// } from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <Paper backgroud-color="green">
    <Tabs
      // value={value}
      // onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab label="Item One" />
      <Tab label="Item Two" />
      <Tab label="Item Three" />
    </Tabs>


    <body>
      <h1>Chinese Remainder Solver</h1>
      <br></br>

      <Calculator/>
      </body>
      <footer>
        13519040 - Shafira Naya Aprisadianti
      </footer>
  </Paper>


    </div>
  );
}

export default App;