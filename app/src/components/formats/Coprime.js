import React from 'react';
import Typography from '@material-ui/core/Typography';
import { checkCoprime } from '../../backend/Calculation';

class Coprime extends React.Component {
  render() {
    const coprime = checkCoprime(this.props.arrayOfEquation);
    let coprimeFormat = [];
    for (let i = 0; i < coprime.length; i++) {
      if (coprime[i][2]) {
        coprimeFormat.push(
          <Typography>
            PBB({coprime[i][0]},{coprime[i][1]}) = 1
          </Typography>
        );
      } else {
        coprimeFormat.push(
          <Typography>
            PBB({coprime[i][0]},{coprime[i][1]}) &ne; 1
          </Typography>
        );
      }
    }
    return coprimeFormat;
  }
}
export default Coprime;
