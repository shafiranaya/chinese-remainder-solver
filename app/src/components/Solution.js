import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import { isAllCoprime } from "../backend/Calculation";
import Coefficient from "./formats/Coefficient";
import InverseFormula from "./formats/InverseFormula";
import ModuloProductFormula from "./formats/ModuloProductFormula";
import ArrayOfEquation from "./formats/ArrayOfEquation";
import Equation from "./formats/Equation";
import Coprime from "./formats/Coprime";
import Sum from "./formats/Sum";

class Solution extends React.Component {
    // TODO how to handleReset
    // handleReset = () => {
    //   this.setState({
    //     display: !this.state.display,
    //     equations: [{ a: 0, m: 0 }],
    //     arrayOfEquation: [],
    //     solutions: [],
    //   });
    // };
    render() {
        if (isAllCoprime(this.props.arrayOfEquation)) {
          return (
            <div className="container-sm">
              <br></br>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel0a-content"
                  id="panel0a-header"
                >
                  <Typography>Chinese Remainder Theorem</Typography>
                </AccordionSummary>
                <AccordionDetails>
      
                  <Typography>
                    <Typography>
                      Misalkan m<sub>1</sub>, m<sub>1</sub>, ..., m<sub>n</sub> adalah
                      bilangan bulat positif sedemikian sehingga PBB(m<sub>i</sub>,m
                      <sub>j</sub>) = 1 untuk i &ne; j.
                    </Typography>
                    <Typography>Maka, sistem kekongruenan linier: </Typography>
                    <Typography>
                      x &equiv; a<sub>1</sub> (mod m<sub>1</sub>)
                    </Typography>
                    <Typography>
                      x &equiv; a<sub>2</sub> (mod m<sub>2</sub>)
                    </Typography>
                    <Typography>
                      x &equiv; a<sub>n</sub> (mod m<sub>n</sub>)
                    </Typography>
      
                    <Typography>
                      mempunyai sebuah solusi unik dalam modulus m = m<sub>1*</sub>m
                      <sub>2*</sub>...*m<sub>n</sub>.
                    </Typography>
                    <Typography>
                      (yaitu, terdapat solusi x dengan 0 &le; x &lt; m dan semua
                      solusi lain yang kongruen dalam modulus m dengan solusi ini)
                    </Typography>
                    <br></br>
                    <Typography>
                      Secara umum, solusi sistem kekongruenan linier adalah berbentuk
                    </Typography>
                    <Typography>
                      x = a<sub>1</sub>M<sub>1</sub>y<sub>1</sub> + a<sub>2</sub>M
                      <sub>2</sub>y<sub>2</sub> + ... + a<sub>n</sub>M<sub>n</sub>y
                      <sub>n</sub>
                    </Typography>
                    <Typography>yang dalam hal ini,</Typography>
                    <Typography>
                      {" "}
                      M<sub>k</sub> adalah perkalian semua modulus kecuali m
                      <sub>k</sub>
                    </Typography>
                    <Typography>
                      y<sub>k</sub> adalah balikan M<sub>k</sub> dalam modulus m
                      <sub>k</sub>
                    </Typography>
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
                    <Equation arrayOfEquation={this.props.arrayOfEquation} />
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
                    <Typography>Cek PBB: </Typography>              
                    <Coprime arrayOfEquation={this.props.arrayOfEquation} />
                    <Typography>
                      Karena semuanya coprime (PBB-nya = 1), maka persamaan di atas
                      dapat diselesaikan menggunakan rumus Chinese Reminder Theorem.
                    </Typography>
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
                    <ModuloProductFormula arrayOfEquation={this.props.arrayOfEquation} solutions={this.props.solutions} />
                    <Coefficient arrayOfEquation={this.props.arrayOfEquation} solutions={this.props.solutions} />
                    <InverseFormula arrayOfEquation={this.props.arrayOfEquation} solutions={this.props.solutions} />
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
                    <Typography>
                      Maka, solusi dari sistem kekongruenan tersebut adalah
                    </Typography>
                    <Sum arrayOfEquation={this.props.arrayOfEquation} solutions={this.props.solutions} />
                    <Typography>
                      x = sum (mod M) = {this.props.solutions[3]} (mod{" "}
                      {this.props.solutions[0]}) = {this.props.solutions[4]}
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
                      positif terkecil yang memenuhi adalah {this.props.solutions[4]}.
                    </Typography>
                  </Typography>
                </AccordionDetails>
              </Accordion>
      
              <br></br>
              <Button variant="contained" color="primary" onClick={this.handleReset}>
                Back
              </Button>
              <br></br>
            </div>
          );
        }
         // Jika tidak bisa diselesaikan dengan CRT
        else {
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
                    <ArrayOfEquation arrayOfEquation={this.props.arrayOfEquation} />
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
                    <Equation arrayOfEquation={this.props.arrayOfEquation} />
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
                    <Typography>Cek PBB:</Typography>
                    <Coprime arrayOfEquation={this.props.arrayOfEquation} />
                    <Typography>
                      Karena tidak semua coprime (PBB-nya = 1), maka persamaan di atas
                      tidak dapat diselesaikan menggunakan Chinese Reminder Theorem.
                    </Typography>
                  </Typography>
                </AccordionDetails>
              </Accordion>
        
              <br></br>
              <Button variant="contained" color="primary" onClick={this.handleReset}>
                Back
              </Button>
              <br></br>
            </div>
          );
        }
      }
    
}
export default Solution;