import React from "react";
import ReactDOM from "react-dom";
// import "../solver"

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      display:false,
      numberOfEquation: 0,
      equations: [{a:0,m:0}],
      arrayOfEquation:[],
      solutions:[],
    //   solution: [{moduloProduct:0, coefficients:[], inverses:[], sum:0, x:0}],
  }
}

 euclidean(m,n) {
   let r = 0;
   while (n !== 0) {
       r = m % n;
       m = n;
       n = r;
   }
   let gcd = m;
   return gcd;
};
 
  isCoprime(a,b) {
     return (this.euclidean(a,b) === 1);
 };
 
  checkCoprime() {
     let coprime = [];
     for (let i = 0; i < this.state.arrayOfEquation.length; i++) {
         for (let j = i; j < this.state.arrayOfEquation.length; j++) {
             if (i != j) {
                 if (this.isCoprime(this.state.arrayOfEquation[i][1],this.state.arrayOfEquation[j][1])) {
                     coprime.push([this.state.arrayOfEquation[i][1],this.state.arrayOfEquation[j][1],true]);
                 }
                 else {
                     coprime.push([this.state.arrayOfEquation[i][1],this.state.arrayOfEquation[j][1],false]);
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
     while ((i < coprime.length) && (coprime[i][2] === false)) {
         allCoprime = false;
         i++;
     }
     return allCoprime;
 }
 
  moduloInverse(a,m) {
     for (let i = 0; i < m; i++) {
         if ((a*i) % m === 1) {
             return i;
         }
     }
     return -1;
 }
 
  calculateModuloProduct() {
     let m = 1;
     this.state.arrayOfEquation.forEach(element => {
         m *= element[1];
     });
     return m;
 }
 
  calculateCoefficient() {
     const m = this.calculateModuloProduct();
     let arrayOfCoefficient = [];
     this.state.arrayOfEquation.forEach(element => {
         arrayOfCoefficient.push(m/element[1]);
     });
     return arrayOfCoefficient;

 }
 
  calculateInverse() {
     const M = this.calculateCoefficient();
     let inverse = [];
     for (let i = 0; i < this.state.arrayOfEquation.length; i++) {
         inverse.push(this.moduloInverse(M[i],this.state.arrayOfEquation[i][1]));
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
     return [m,M,y,sum,x];
 }

  handleNumberOfEquationChange = evt => {
    this.setState({ numberOfEquation: evt.target.value });
  };

  handleEquationAChange = idx => evt => {
    const newEquations = this.state.equations.map((equation, sidx) => {
      if (idx !== sidx) return equation;
      return { ...equation, a: evt.target.value };
    });
    this.setState({ equations: newEquations });
  };

  handleEquationMChange = idx => evt => {
    const newEquations = this.state.equations.map((equation, sidx) => {
      if (idx !== sidx) return equation;
      return { ...equation, m: evt.target.value };
    });
    this.setState({ equations: newEquations });
  };

  handleSubmit = evt => {
    const { numberOfEquation, equations, arrayOfEquation, solutions} = this.state;
    // Validate input

    // Make equation
    for (let i = 0; i < equations.length; i++) {
        this.state.arrayOfEquation.push([parseInt(this.state.equations[i].a),parseInt(this.state.equations[i].m)]);
    }
    const solutionList = this.crtSolver();
    // let solutions = {...this.state.solution}
    // solution.moduloProduct = solutionList[0];
    // solution.coefficients = solutionList[1];
    // solution.inverses = solutionList[2];
    // solution.sum = solutionList[3];
    // solution.x = solutionList[4];
    this.setState({solutions: solutionList});
    this.setState({display: true});
  };

  handleAddEquation = () => {
    this.setState({
      equations: this.state.equations.concat([{a:0,m:0}])
    });
  };

  handleRemoveEquation = idx => () => {
    this.setState({
      equations: this.state.equations.filter((s, sidx) => idx !== sidx)
    });
  };

  handleReset = () => {
    this.setState({
      display: !this.state.display,
      numberOfEquation: 0,
      equations: [{a:0,m:0}],
      arrayOfEquation:[],
      solutions:[] 
    })    
  }

  displayArrayOfEquation() {
        return (
          <ul>
            {this.state.arrayOfEquation.map((value, index) => {
           return <li key={index}>x === {value[0]} mod {value[1]}</li>
            })}
            </ul>
        )
    
  }
  displayEquation() {
    return (
    //   <p>
    //     {this.state.arrayOfEquation.map((value, index) => {
    //       return (`a${index+1} = ${value[0]}, m${index+1} = ${value[1]}`)
    //     })}
    //   </p>
                <ul>
                {this.state.arrayOfEquation.map((value, index) => {
               return <li key={index}>a{index+1} = {value[0]}, m{index+1} = {value[1]}</li>
                })}
                </ul>
    )

}
  displayModuloProductFormula() {
      const N = this.state.arrayOfEquation.length;
      const equations = this.state.arrayOfEquation;
      let moduloProductFormat = [];
      moduloProductFormat.push(`m = `);
      for (let i = 0; i < N; i++) {
          let children = [];
          if (i == N-1) {
            children.push(`m${i+1}`);
          }
          else {
            children.push(`m${i+1} * `);
          }
          moduloProductFormat.push(children);
      }
      moduloProductFormat.push(` = `);
      for (let i = 0; i < N; i++) {
        let children = [];
        if (i == N-1) {
          children.push(`${equations[i][1]}`);
        }
        else {
          children.push(`${equations[i][1]} * `);
        }
        moduloProductFormat.push(children);
    }
    moduloProductFormat.push(` = ${this.state.solutions[0]}`);
    return (moduloProductFormat);
  }
  displayCoefficient() {
    const N = this.state.arrayOfEquation.length;    
    const moduloProduct = this.state.solutions[0];
    const coefficient = this.state.solutions[1];
    const equations = this.state.arrayOfEquation;
    let coefficientFormat = [];
      for (let i = 0; i < N; i++) {
          coefficientFormat.push(<p>M{i+1} = m/m{i+1} = {moduloProduct}/{equations[i][1]} = {coefficient[i]}</p>);
      };
  return coefficientFormat;

  }

  displayInverseFormula() {
      const inverse = this.state.solutions[2];
      const coefficient = this.state.solutions[1];
      const equations = this.state.arrayOfEquation;
      let inverseFormat = [];
        for (let i = 0; i < inverse.length; i++) {
            inverseFormat.push(<p>y{i+1} = {inverse[i]}, karena {coefficient[i]}*{inverse[i]} === 1 (mod {equations[i][1]})</p>);
        };
    return inverseFormat;
  }
  displaySum() {
    const N = this.state.arrayOfEquation.length;
    const equations = this.state.arrayOfEquation;
    const coefficient = this.state.solutions[1];
    const inverse = this.state.solutions[2];
    let sumFormat = [];
    sumFormat.push(`sum = `);
    for (let i = 0; i < N; i++) {
        let children = [];
        if (i == N-1) {
          children.push(`a${i+1}M${i+1}y${i+1}`);
        }
        else {
          children.push(`a${i+1}M${i+1}y${i+1} + `);
        }
        sumFormat.push(children);
    }
    sumFormat.push(` = `);
    for (let i = 0; i < N; i++) {
      let children = [];
      if (i == N-1) {
        children.push(`${equations[i][0]}*${coefficient[i]}*${inverse[i]}`);
      }
      else {
        children.push(`${equations[i][0]}*${coefficient[i]}*${inverse[i]} + `);
      }
      sumFormat.push(children);
  }
  sumFormat.push(` = ${this.state.solutions[3]}`);
  return (sumFormat);
}
    displaySolution() {
        return (
          <div className="form">
            
            <p>Tinjau persamaan modulo:</p>
            {this.displayArrayOfEquation()}

            {/* <p>{this.state.solutions}</p> */}

            <p>Dari persamaan modulo di atas, diketahui:</p>

            {this.displayEquation()}

            <p>Hitung:</p>
          
            {this.displayModuloProductFormula()}
            
            {this.displayCoefficient()}
        

            {this.displayInverseFormula()}

      <p>Maka, solusi dari sistem kekongruenan tersebut adalah</p>
            {this.displaySum()}
            <p>x = sum (mod M) = {this.state.solutions[3]} (mod {this.state.solutions[0]}) = {this.state.solutions[4]}</p>
      <p>Jadi, berdasarkan Chinese Reminder Theorem, bilangan bulat positif terkecil yang memenuhi adalah {this.state.solutions[4]}.</p>
            <button onClick={this.handleReset}>Back</button>
          </div>
        )
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
        {/* Here in the render method, I'm returning a ternary operator that displays either the form, or the user's data, depending on the boolean value that is currently set to this.state.display*/}
        
        return (this.state.display ? this.displaySolution() : this.displayForm());
      }
}
export default Calculator;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Calculator />, rootElement);