import React from "react";
import Typography from "@material-ui/core/Typography";

class Coefficient extends React.Component {
    render() {
        const N = this.props.arrayOfEquation.length;
        const moduloProduct = this.props.solutions[0];
        const coefficient = this.props.solutions[1];
        const equations = this.props.arrayOfEquation;
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
}
export default Coefficient;