import React from "react";
import Typography from "@material-ui/core/Typography";

class ArrayOfEquation extends React.Component {
    render() {
        let equations = this.props.arrayOfEquation;
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
}
export default ArrayOfEquation;