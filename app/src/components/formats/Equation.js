import React from "react";
import Typography from "@material-ui/core/Typography";

class Equation extends React.Component {
    render() {
        let equations = this.props.arrayOfEquation;
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
      }
}
export default Equation;