import React from "react";
import ReactDOM from "react-dom";
// import "../solver"

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      display: false,
      numberOfEquation: 0,
      equations: [{ a: 0, m: 0 }],
      arrayOfEquation: [],
      solutions: [],
      //   solution: [{moduloProduct:0, coefficients:[], inverses:[], sum:0, x:0}],
    };
  }

  euclidean(m, n) {
    let r = 0;
    while (n !== 0) {
      r = m % n;
      m = n;
      n = r;
    }
    let gcd = m;
    return gcd;
  }

  isCoprime(a, b) {
    return this.euclidean(a, b) === 1;
  }

  checkCoprime() {
    let coprime = [];
    for (let i = 0; i < this.state.arrayOfEquation.length; i++) {
      for (let j = i; j < this.state.arrayOfEquation.length; j++) {
        if (i != j) {
          if (
            this.isCoprime(
              this.state.arrayOfEquation[i][1],
              this.state.arrayOfEquation[j][1]
            )
          ) {
            coprime.push([
              this.state.arrayOfEquation[i][1],
              this.state.arrayOfEquation[j][1],
              true,
            ]);
          } else {
            coprime.push([
              this.state.arrayOfEquation[i][1],
              this.state.arrayOfEquation[j][1],
              false,
            ]);
          }
        }
      }
    }
    return coprime;
  }

  isAllCoprime() {
    const coprime = this.checkCoprime();
    let i = 0;
    let allCoprime = true;
    while (i < coprime.length && coprime[i][2] === false) {
      allCoprime = false;
      i++;
    }
    return allCoprime;
  }

  moduloInverse(a, m) {
    for (let i = 0; i < m; i++) {
      if ((a * i) % m === 1) {
        return i;
      }
    }
    return -1;
  }

  calculateModuloProduct() {
    let m = 1;
    this.state.arrayOfEquation.forEach((element) => {
      m *= element[1];
    });
    return m;
  }

  calculateCoefficient() {
    const m = this.calculateModuloProduct();
    let arrayOfCoefficient = [];
    this.state.arrayOfEquation.forEach((element) => {
      arrayOfCoefficient.push(m / element[1]);
    });
    return arrayOfCoefficient;
  }

  calculateInverse() {
    const M = this.calculateCoefficient();
    let inverse = [];
    for (let i = 0; i < this.state.arrayOfEquation.length; i++) {
      inverse.push(this.moduloInverse(M[i], this.state.arrayOfEquation[i][1]));
    }
    return inverse;
  }

  crtSolver() {
    let sum = 0;
    const m = this.calculateModuloProduct();
    const M = this.calculateCoefficient();
    const y = this.calculateInverse();
    for (let i = 0; i < this.state.arrayOfEquation.length; i++) {
      sum += this.state.arrayOfEquation[i][0] * M[i] * y[i];
    }
    const x = sum % m;
    return [m, M, y, sum, x];
  }

  handleNumberOfEquationChange = (event) => {
    this.setState({ numberOfEquation: event.target.value });
  };

  handleEquationAChange = (idx) => (event) => {
    const newEquations = this.state.equations.map((equation, sidx) => {
      if (idx !== sidx) return equation;
      return { ...equation, a: event.target.value };
    });
    this.setState({ equations: newEquations });
  };

  handleEquationMChange = (idx) => (event) => {
    const newEquations = this.state.equations.map((equation, sidx) => {
      if (idx !== sidx) return equation;
      return { ...equation, m: event.target.value };
    });
    this.setState({ equations: newEquations });
  };

  handleSubmit = (event) => {
    const { numberOfEquation, equations, arrayOfEquation, solutions } =
      this.state;
    // Validate input: harus bilangan bulat positif
    let i = 0;
    let notValid = false;
    while (i < equations.length) {
      if (this.state.equations[i].a <= 0 || this.state.equations[i].m <= 0) {
        notValid = true;
      }
      i++;
    }
    // Validate input
    if (notValid) {
      alert("Bilangan yang dimasukkan tidak valid");
    } else if (equations.length < 2) {
      alert("Masukkan minimal dua equation");
    } else {
      // Masukkan equation
      for (let i = 0; i < equations.length; i++) {
        this.state.arrayOfEquation.push([
          parseInt(this.state.equations[i].a),
          parseInt(this.state.equations[i].m),
        ]);
      }
      const solutionList = this.crtSolver();
      this.setState({ solutions: solutionList });
      this.setState({ display: true });
    }

    // Validate input
    // if(!this.state.arrayOfEquation || !this.state.lastName){
    //   alert("A name field is empty.")
    // }
    // else if(this.state.phone.length < 10 || !this.state.phone){
    //   alert("Phone number is not long enough.")
    // }
    // else if (!this.state.email.match(/@./g)) {
    //   alert("Email is in the wrong format.")
    // }
    // else {

    // }

    // let solutions = {...this.state.solution}
    // solution.moduloProduct = solutionList[0];
    // solution.coefficients = solutionList[1];
    // solution.inverses = solutionList[2];
    // solution.sum = solutionList[3];
    // solution.x = solutionList[4];
  };

  handleAddEquation = () => {
    this.setState({
      equations: this.state.equations.concat([{ a: 0, m: 0 }]),
    });
  };

  handleRemoveEquation = (idx) => () => {
    this.setState({
      equations: this.state.equations.filter((s, sidx) => idx !== sidx),
    });
  };

  handleReset = () => {
    this.setState({
      display: !this.state.display,
      numberOfEquation: 0,
      equations: [{ a: 0, m: 0 }],
      arrayOfEquation: [],
      solutions: [],
    });
  };

  displayArrayOfEquation() {
    // return (
    //   <ul>
    //     {this.state.arrayOfEquation.map((value, index) => {
    //    return <li key={index}>x === {value[0]} mod {value[1]}</li>
    //     })}
    //     </ul>
    // )

    let equations = this.state.arrayOfEquation;
    let arrayOfEquationFormat = [];
    for (let i = 0; i < equations.length; i++) {
      arrayOfEquationFormat.push(
        <p>
          {" "}
          x === {equations[i][0]} mod {equations[i][1]}
        </p>
      );
    }
    return arrayOfEquationFormat;
  }
  displayEquation() {
    let equations = this.state.arrayOfEquation;
    let equationFormat = [];
    for (let i = 0; i < equations.length; i++) {
      equationFormat.push(
        <p>
          a{i + 1} = {equations[i][0]}, m{i + 1} = {equations[i][1]}
        </p>
      );
    }
    return equationFormat;
    //   return(<ul>
    //   {this.state.arrayOfEquation.map((value, index) => {
    //  return <li key={index}>a{index+1} = {value[0]}, m{index+1} = {value[1]}</li>
    //   })}
    //   </ul>);
  }
  displayModuloProductFormula() {
    const N = this.state.arrayOfEquation.length;
    const equations = this.state.arrayOfEquation;
    let moduloProductFormat = [];
    moduloProductFormat.push(`m = `);
    for (let i = 0; i < N; i++) {
      let children = [];
      if (i == N - 1) {
        children.push(`m${i + 1}`);
      } else {
        children.push(`m${i + 1} * `);
      }
      moduloProductFormat.push(children);
    }
    moduloProductFormat.push(` = `);
    for (let i = 0; i < N; i++) {
      let children = [];
      if (i == N - 1) {
        children.push(`${equations[i][1]}`);
      } else {
        children.push(`${equations[i][1]} * `);
      }
      moduloProductFormat.push(children);
    }
    moduloProductFormat.push(` = ${this.state.solutions[0]}`);
    return moduloProductFormat;
  }
  displayCoefficient() {
    const N = this.state.arrayOfEquation.length;
    const moduloProduct = this.state.solutions[0];
    const coefficient = this.state.solutions[1];
    const equations = this.state.arrayOfEquation;
    let coefficientFormat = [];
    for (let i = 0; i < N; i++) {
      coefficientFormat.push(
        <p>
          M{i + 1} = m/m{i + 1} = {moduloProduct}/{equations[i][1]} ={" "}
          {coefficient[i]}
        </p>
      );
    }
    return coefficientFormat;
  }

  displayInverseFormula() {
    const inverse = this.state.solutions[2];
    const coefficient = this.state.solutions[1];
    const equations = this.state.arrayOfEquation;
    let inverseFormat = [];
    for (let i = 0; i < inverse.length; i++) {
      inverseFormat.push(
        <p>
          y{i + 1} = {inverse[i]}, karena {coefficient[i]}*{inverse[i]} === 1
          (mod {equations[i][1]})
        </p>
      );
    }
    return inverseFormat;
  }

  displayCoprime() {
    const equations = this.state.arrayOfEquation;
    const coprime = this.checkCoprime();
    let coprimeFormat = [];
    coprimeFormat.push(<p>Cek GCD:</p>);
    for (let i = 0; i < coprime.length; i++) {
      if (coprime[i][2]) {
        coprimeFormat.push(
          <p>
            GCD({coprime[i][0]},{coprime[i][1]}) = 1
          </p>
        );
      } else {
        coprimeFormat.push(
          <p>
            GCD({coprime[i][0]},{coprime[i][1]}) != 1
          </p>
        );
      }
    }
    return coprimeFormat;
  }

  displaySum() {
    const N = this.state.arrayOfEquation.length;
    const equations = this.state.arrayOfEquation;
    const coefficient = this.state.solutions[1];
    const inverse = this.state.solutions[2];
    let sumFormat = [];
    sumFormat.push(`Sum = `);
    for (let i = 0; i < N; i++) {
      let children = [];
      if (i == N - 1) {
        children.push(`a${i + 1}M${i + 1}y${i + 1}`);
      } else {
        children.push(`a${i + 1}M${i + 1}y${i + 1} + `);
      }
      sumFormat.push(children);
    }
    sumFormat.push(` = `);
    for (let i = 0; i < N; i++) {
      let children = [];
      if (i == N - 1) {
        children.push(`${equations[i][0]}*${coefficient[i]}*${inverse[i]}`);
      } else {
        children.push(`${equations[i][0]}*${coefficient[i]}*${inverse[i]} + `);
      }
      sumFormat.push(children);
    }
    sumFormat.push(` = ${this.state.solutions[3]}`);
    return sumFormat;
  }

  displaySolution() {
    return (
      <div className="container bg-light">
        <p>Tinjau persamaan modulo:</p>
        {this.displayArrayOfEquation()}

        {/* <p>{this.state.solutions}</p> */}

        <p>Dari persamaan modulo di atas, diketahui:</p>

        {this.displayEquation()}

        {/* Cek GCD */}
        {this.displayCoprime()}

        <p>Hitung:</p>

        {this.displayModuloProductFormula()}

        {this.displayCoefficient()}

        {this.displayInverseFormula()}

        <p>Maka, solusi dari sistem kekongruenan tersebut adalah</p>
        {this.displaySum()}
        <p>
          x = sum (mod M) = {this.state.solutions[3]} (mod{" "}
          {this.state.solutions[0]}) = {this.state.solutions[4]}
        </p>
        <p>
          Jadi, berdasarkan Chinese Reminder Theorem, bilangan bulat positif
          terkecil yang memenuhi adalah {this.state.solutions[4]}.
        </p>
        <button onClick={this.handleReset}>Back</button>
      </div>
    );
  }

  // Jika tidak bisa diselesaikan dengan CRT
  displaySolution2() {
    return (
      <div className="container bg-light">
        <p>Tinjau persamaan modulo:</p>
        {this.displayArrayOfEquation()}

        <p>Dari persamaan modulo di atas, diketahui:</p>

        {this.displayEquation()}

        {/* Cek GCD */}
        {this.displayCoprime()}

        <p>
          Karena tidak semua coprime (GCD-nya = 1), maka persamaan di atas tidak
          dapat diselesaikan menggunakan Chinese Reminder Theorem.
        </p>
        <button onClick={this.handleReset}>Back</button>
      </div>
    );
  }

  displayForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="number"
          placeholder="Enter number of equations"
          value={this.state.numberOfEquation}
          onChange={this.handleNumberOfEquationChange}
          min="0"
          max="10"
        />
        <h4>Equations</h4>
        <br></br>
        <p>Format: x === ai mod mi</p>
        {this.state.equations.map((equation, idx) => (
          <div className="equations">
            <input
              type="number"
              placeholder={`a${idx + 1}`}
              //   value={equation.a}
              onChange={this.handleEquationAChange(idx)}
            />
            <input
              type="number"
              placeholder={`m${idx + 1}`}
              //   value={equation.m}
              onChange={this.handleEquationMChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemoveEquation(idx)}
              className="small"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={this.handleAddEquation}
          className="small"
        >
          Add Equation
        </button>
        <button>Submit</button>

        {/* <h1>Solusi: {this.state.solutions}</h1> */}

        {/* {this.displaySolution()} */}
      </form>
    );
  }

  render() {
    if (this.state.display) {
      if (this.isAllCoprime()) {
        return this.displaySolution();
      } else {
        return this.displaySolution2();
      }
    } else {
      return this.displayForm();
    }
  }
}
export default Calculator;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Calculator />, rootElement);
