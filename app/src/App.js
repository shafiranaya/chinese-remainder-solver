import './App.css';
import Calculator from './components/Calculator';
import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import { Typography, Toolbar} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
// import {
//   Route,
//   NavLink,
//   HashRouter
// } from 'react-router-dom';

// const primary = #9575cd;


// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: 200,
//     },
//   },
// }));

import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import cyan from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
  palette: {
    // primary: deepPurple,
    primary: {
      main: deepPurple[300]
    },
    secondary: {
      main: cyan[300]
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeightLight:300,
    fontWeightRegular:400,
    fontWeightMedium:500,
    fontWeightBold:700
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>

    <div className="App">

          <AppBar position="sticky">
  <Toolbar>
    <Typography variant="h5">
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
    </ThemeProvider>

  );
}

export default App;