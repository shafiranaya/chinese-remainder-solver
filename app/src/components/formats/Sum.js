import React from 'react';

class Sum extends React.Component {
  render() {
    const N = this.props.arrayOfEquation.length;
    const equations = this.props.arrayOfEquation;
    const coefficient = this.props.solutions[1];
    const inverse = this.props.solutions[2];
    let sumFormat = [];
    sumFormat.push(`Sum = `);
    for (let i = 0; i < N; i++) {
      let children = [];
      children.push('a');
      children.push(<sub>{i + 1}</sub>);
      children.push('M');
      children.push(<sub>{i + 1}</sub>);
      children.push('y');
      children.push(<sub>{i + 1}</sub>);
      if (i !== N - 1) {
        children.push(' + ');
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
    sumFormat.push(` = ${this.props.solutions[3]}`);
    return sumFormat;
  }
}
export default Sum;
