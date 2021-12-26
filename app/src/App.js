import './App.css';
import Homepage from './components/Homepage';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Toolbar } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import cyan from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[300],
    },
    secondary: {
      main: cyan[300],
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h5">Chinese Remainder Solver</Typography>
          </Toolbar>
        </AppBar>

        <body>
          <br></br>

          <Homepage />
          <br></br>
          <br></br>
        </body>
      </div>
    </ThemeProvider>
  );
}

export default App;
