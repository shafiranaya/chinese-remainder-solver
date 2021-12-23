import React from "react";
import Typography from "@material-ui/core/Typography";

class InverseFormula extends React.Component {
    render() {
        const inverse = this.props.solutions[2];
        const coefficient = this.props.solutions[1];
        const equations = this.props.arrayOfEquation;
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
}
export default InverseFormula;