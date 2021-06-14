import logo from './logo.svg';
import './App.css';
import Calculator from './components/Calculator';

import React from 'react';
// import Tab from '@material-ui/core/Tab';
// or
import { Tab, Tabs, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar'
import { Typography, Toolbar} from '@material-ui/core';
// import {
//   Route,
//   NavLink,
//   HashRouter
// } from 'react-router-dom';

// const primary = #9575cd;


import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: 200,
//     },
//   },
// }));

function App() {
  return (
    <div className="App">
              {/* <Container> */}

          <AppBar position="static">
  <Toolbar>
    <Typography variant="h6">
      Chinese Remainder Solver
    </Typography>
  </Toolbar>
</AppBar>

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
      <br></br>

      <Calculator/>
      <br></br><br></br>
      </body>
      {/* <footer>
        13519040 - Shafira Naya Aprisadianti
      </footer> */}
  {/* </Container> */}

    </div>
  );
}

export default App;