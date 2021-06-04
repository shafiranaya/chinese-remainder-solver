import logo from './logo.svg';
import './App.css';
import Problem from './components/Problem';

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
      <form>
        <label for="quantity">Quantity (between 1 and 5):</label>
        <input type="number" id="quantity" name="quantity" min="1" max="5"></input>
        <input type="submit" value="Submit"></input>
      </form>

      
      <h3>Masukkan equation</h3>
      <form id="formequation" target="_self" onclick="return tes()">
      <label for="fname">First name:</label>
      <input type="text" id="fname" name="fname" value="John"></input>
      <label for="lname">Last name:</label>
      <input type="text" id="lname" name="lname" value="Doe"></input><br></br>
      <input type="submit" value="Submit"></input>
      </form> 

      <h3>Coba masukkan equation</h3>

      {/* <h3>Using the Chinese Remainder Theorem, solve the following system of modulo equations.</h3> */}
      <h3>Tinjau kembali persoalan Chinese Reminder Problem</h3>
      <p>
        List yang berisi equation
      </p>

      <h3>We first check to see if each ni is pairwise comprime.</h3>

      <h3>Hitung:</h3>
      <p>m</p>
      <p>M1, M2, M3</p>

      <p>Maka, solusi dari sistem kekongruenan tersebut adalah</p>
      <p>~hitung x~</p>
      <p>Jadi, berdasarkan Chinese Reminder Theorem, bilangan bulat positif terkecil yang memenuhi adalah ~x~</p>
      </body>
      <footer>
        Hai
      </footer>
    </div>
  );
}

export default App;
