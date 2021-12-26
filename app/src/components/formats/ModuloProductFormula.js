import React from 'react';

class ModuloProductFormula extends React.Component {
  render() {
    const N = this.props.arrayOfEquation.length;
    const equations = this.props.arrayOfEquation;
    let moduloProductFormat = [];
    moduloProductFormat.push('m = ');
    for (let i = 0; i < N; i++) {
      let children = [];
      children.push('m');
      children.push(<sub>{i + 1}</sub>);
      if (i !== N - 1) {
        children.push(' * ');
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
    moduloProductFormat.push(` = ${this.props.solutions[0]}`);
    return moduloProductFormat;
  }
}
export default ModuloProductFormula;
