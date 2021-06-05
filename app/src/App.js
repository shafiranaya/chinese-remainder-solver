import logo from './logo.svg';
import './App.css';
import Calculator from './components/Calculator';
import MyForm from './components/MyForm';
import './solver';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header> */}
      <body>
      <h1>Chinese Remainder Solver</h1>
      <br></br>

      <Calculator/>
      </body>
      <footer>
        13519040 - Shafira Naya Aprisadianti
      </footer>
    </div>
  );
}

export default App;
