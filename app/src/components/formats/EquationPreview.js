import React from "react";
import Typography from "@material-ui/core/Typography";

class EquationPreview extends React.Component {
    render() {
        let equations = this.props.equations;
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
}
export default EquationPreview;