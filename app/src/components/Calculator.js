import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
// import FormControl from "@material-ui/core/FormControl"
// import FormGroup from "@material-ui/core/FormGroup"
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid"
// import FormRow from "@material-ui/core/Form"
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from "@material-ui/core/Icon";
// import SaveIcon from '@material-ui/icons/Save';
// MULTIPLICATION SIGN : u2715
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
        if (i !== j) {
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
    let allCoprime = true;
    for (let i = 0; i < coprime.length; i++) {
      if (coprime[i][2] === false) {
        allCoprime = false;
      }
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

  // handleRemoveEquation = idx => () => {
  //   const values = [...equations];
  //   values.splice(index,1);
  //   // setInputFields(values);
  //   this.setState({equations: this.state.equations});
  // }

  handleRemoveEquation = (idx) => () => {
    let removed = this.state.equations.splice(idx, 1);
    this.setState({
      equations: this.state.equations,
    });
    // this.handleEquationAChange();
    // this.handleEquationMChange();
    // this.setState({
    //   equations: this.state.equations.filter((s, sidx) => idx !== sidx)
    // });
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
        <Typography>
          {" "}
          x &equiv; {equations[i][0]} mod {equations[i][1]}
        </Typography>
      );
    }
    return arrayOfEquationFormat;
  }
  displayEquation() {
    let equations = this.state.arrayOfEquation;
    let equationFormat = [];
    for (let i = 0; i < equations.length; i++) {
      equationFormat.push(
        <Typography>
          a<sub>{i + 1}</sub> = {equations[i][0]}, m<sub>{i + 1}</sub> ={" "}
          {equations[i][1]}
        </Typography>
      );
    }
    return equationFormat;

    //   return(<ul>
    //   {this.state.arrayOfEquation.map((value, index) => {
    //  return <li key={index}>a{index+1} = {value[0]}, m{index+1} = {value[1]}</li>
    //   })}
    //   </ul>);
  }

  displayEquationPreview() {
    let equations = this.state.equations;
    let equationFormat = [];
    for (let i = 0; i < equations.length; i++) {
      equationFormat.push(
        <Typography>
          {" "}
          x &equiv; {equations[i].a} mod {equations[i].m}
        </Typography>
      );
    }
    return equationFormat;
  }
  displayModuloProductFormula() {
    const N = this.state.arrayOfEquation.length;
    const equations = this.state.arrayOfEquation;
    let moduloProductFormat = [];
    moduloProductFormat.push("m = ");
    for (let i = 0; i < N; i++) {
      let children = [];
      children.push("m");
      children.push(<sub>{i + 1}</sub>);
      if (i !== N - 1) {
        children.push(" * ");
      }
      moduloProductFormat.push(children);
    }
    moduloProductFormat.push(` = `);
    for (let i = 0; i < N; i++) {
      let children = [];
      children.push(`${equations[i][1]}`);
      if (i !== N - 1) {
        children.push(` * `);
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
        <Typography>
          M<sub>{i + 1}</sub> = m/m<sub>{i + 1}</sub> = {moduloProduct}/
          {equations[i][1]} = {coefficient[i]}
        </Typography>
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
        <Typography>
          y<sub>{i + 1}</sub> = {inverse[i]}, karena {coefficient[i]}*
          {inverse[i]} &equiv; 1 (mod {equations[i][1]})
        </Typography>
      );
    }
    return inverseFormat;
  }

  displayCoprime() {
    const coprime = this.checkCoprime();
    let coprimeFormat = [];
    for (let i = 0; i < coprime.length; i++) {
      if (coprime[i][2]) {
        coprimeFormat.push(
          <Typography>
            GCD({coprime[i][0]},{coprime[i][1]}) = 1
          </Typography>
        );
      } else {
        coprimeFormat.push(
          <Typography>
            GCD({coprime[i][0]},{coprime[i][1]}) &ne; 1
          </Typography>
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
      children.push("a");
      children.push(<sub>{i + 1}</sub>);
      children.push("M");
      children.push(<sub>{i + 1}</sub>);
      children.push("y");
      children.push(<sub>{i + 1}</sub>);
      if (i !== N - 1) {
        children.push(" + ");
      }
      sumFormat.push(children);
    }
    sumFormat.push(` = `);
    for (let i = 0; i < N; i++) {
      let children = [];
      if (i === N - 1) {
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
      <div className="container-sm">
        {/* <Typography><span className="badge rounded-pill bg-primary">1</span> Tinjau persamaan modulo:</Typography>
        {this.displayArrayOfEquation()}

        <Typography><span className="badge rounded-pill bg-primary">2</span> Dari persamaan modulo di atas, diketahui:</Typography>

        {this.displayEquation()}
        <Typography>Cek GCD</Typography>
        {this.displayCoprime()} */}
<br></br>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Langkah 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography>Tinjau persamaan modulo:</Typography>
              {this.displayArrayOfEquation()}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Langkah 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography>Dari persamaan modulo di atas, diketahui:</Typography>
              {this.displayEquation()}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Langkah 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography>Cek GCD</Typography>
              {this.displayCoprime()}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography>Langkah 4</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography>Hitung:</Typography>
              {this.displayModuloProductFormula()}

              {this.displayCoefficient()}

              {this.displayInverseFormula()}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <Typography>Langkah 5</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography>Maka, solusi dari sistem kekongruenan tersebut adalah</Typography>
              {this.displaySum()}
              <Typography>
                x = sum (mod M) = {this.state.solutions[3]} (mod{" "}
                {this.state.solutions[0]}) = {this.state.solutions[4]}
              </Typography>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
            <Typography>Solusi</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography>
                Jadi, berdasarkan Chinese Reminder Theorem, bilangan bulat
                positif terkecil yang memenuhi adalah {this.state.solutions[4]}.
              </Typography>
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* <Typography>Hitung:</Typography>

        {this.displayModuloProductFormula()}

        {this.displayCoefficient()}

        {this.displayInverseFormula()} */}

        {/* <Typography>Maka, solusi dari sistem kekongruenan tersebut adalah</Typography>
        {this.displaySum()}
        <Typography>
          x = sum (mod M) = {this.state.solutions[3]} (mod{" "}
          {this.state.solutions[0]}) = {this.state.solutions[4]}
        </Typography> */}
        {/* <Typography>
          Jadi, berdasarkan Chinese Reminder Theorem, bilangan bulat positif
          terkecil yang memenuhi adalah {this.state.solutions[4]}.
        </Typography> */}

        <br></br>
        {/* <button onClick={this.handleReset}>Back</button> */}
        <Button variant="contained" color="primary" onClick={this.handleReset}>
          Back
        </Button>
        <br></br>
      </div>
    );
  }

  // Jika tidak bisa diselesaikan dengan CRT
  displaySolution2() {
    return (
      <div className="container-sm bg-info">
        <br></br>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Langkah 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography>Tinjau persamaan modulo:</Typography>
              {this.displayArrayOfEquation()}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Langkah 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography>Dari persamaan modulo di atas, diketahui:</Typography>
              {this.displayEquation()}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Langkah 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography>Cek GCD</Typography>
              {this.displayCoprime()}
              <Typography>
                Karena tidak semua coprime (GCD-nya = 1), maka persamaan di atas
                tidak dapat diselesaikan menggunakan Chinese Reminder Theorem.
              </Typography>
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* <Typography><span className="badge rounded-pill bg-primary">1</span>Tinjau persamaan modulo:</Typography>
        {this.displayArrayOfEquation()}

        <Typography><span className="badge rounded-pill bg-primary">2</span>Dari persamaan modulo di atas, diketahui:</Typography>

        {this.displayEquation()} */}

        {/* Cek GCD */}
        {/* {this.displayCoprime()}

        <Typography>
          Karena tidak semua coprime (GCD-nya = 1), maka persamaan di atas tidak
          dapat diselesaikan menggunakan Chinese Reminder Theorem.
        </Typography> */}

        <br></br>
        {/* <button onClick={this.handleReset}>Back</button> */}
        <Button variant="contained" color="primary" onClick={this.handleReset}>
          Back
        </Button>
        <br></br>
      </div>
    );
  }

  displayForm() {
    return (
            <div className="container-sm">
      <form onSubmit={this.handleSubmit}>
        {/* <input
          type="number"
          placeholder="Enter number of equations"
          value={this.state.numberOfEquation}
          onChange={this.handleNumberOfEquationChange}
          min="0"
          max="10"
        />
        <h4>Equations</h4> */}
 <br></br>
        <Typography variant="h6">
          Chinese Remainder Theorem
        </Typography>

        <Typography>Secara umum, solusi sistem kekongruenan linier adalah berbentuk</Typography>
        <Typography>
          x = a<sub>1</sub>M<sub>1</sub>y<sub>1</sub> + a<sub>2</sub>M
          <sub>2</sub>y<sub>2</sub> + ... + a<sub>n</sub>M<sub>n</sub>y
          <sub>n</sub>
        </Typography>
        <Typography>yang dalam hal ini,</Typography>
        <Typography>
          {" "}
          M<sub>k</sub> adalah perkalian semua modulus kecuali m<sub>k</sub>
        </Typography>
        <Typography>
          y<sub>k</sub> adalah balikan M<sub>k</sub> dalam modulus m<sub>k</sub>
        </Typography>

        <br></br>
       
        <Typography variant="h6">
          Masukkan persamaan modulo
        </Typography>
        <Typography>Format: x &equiv; a<sub>i</sub> mod m<sub>i</sub></Typography>
        <br></br>

        {this.state.equations.map((equation, idx) => (
        

 <Grid container item xs={12} direction="row" alignItems="center" justify="center" spacing={3} style={{padding: 5}}>

<Grid item>
            <TextField
          // id="outlined-number"
          label={`a${idx+1}`}
          placeholder={`a${idx+1}`}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={ this.handleEquationAChange(idx) }
          value={equation.a}
          color="primary"
          size="small"
          variant="outlined"
        />
        </Grid>
        <Grid item>
     <TextField
          // id="outlined-number"
          label={`m${idx+1}`}
          placeholder={`m${idx+1}`}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={ this.handleEquationMChange(idx) }
          value={equation.m}
          color="primary"
          size="small"
          variant="outlined"

        />   
        </Grid>
        <Grid item>
                <Button
        variant="contained"
        color="secondary"
        // className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={this.handleRemoveEquation(idx)}
      >
        Hapus
      </Button> 
      </Grid>
<br></br>
</Grid>
))}

            {/* <input
              type="number"
              placeholder={`a${idx + 1}`}
              value={equation.a}
              onChange={this.handleEquationAChange(idx)}
            />
            <input
              type="number"
              placeholder={`m${idx + 1}`}
              value={equation.m}
              onChange={this.handleEquationMChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemoveEquation(idx)}
              className="btn btn-primary"
            >
              Hapus
            </button> */}

    

        {/* <button
          type="button"
          onClick={this.handleAddEquation}
          className="btn btn-primary"
        >Tambah Persamaan</button> */}


<br></br>
        <Button variant="contained" color="primary" onClick={() => { this.handleAddEquation() }}>Tambah Persamaan</Button> 
        <br></br>
        <br></br>
        <Typography variant="h6">Tinjau Persamaan</Typography>
        {this.displayEquationPreview()}
        <br></br>
        <Button variant="contained" color="primary" onClick={() => {this.handleSubmit()}}>Selesaikan dengan CRT Solver</Button>
        {/* <button className="btn btn-primary">Selesaikan dengan CRT Solver</button> */}
      {/* </FormGroup> */}

    </form> </div>
    );
  }

  render() {
    // const { classes } = this.props;

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
