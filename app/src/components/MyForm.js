import React from 'react';
// nanti hapus aja
import ReactDOM from 'react-dom';

class MyForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { a: 0,m: 0};
    }
    // myChangeHandler = (event) => {
    //   this.setState({a: event.target.value, m: event.target.value});
    // }
    handleAChange(event){
        this.setState({ a: event.target.value});
    } 

      handleMChange(event){
        this.setState({m: event.target.value});
      }   
    render() {
        const N = 3;
      let header = '';
    //   for (let i = 0; i < N; i++) {
    //     header = <h1>Hello {this.state.a}</h1>;
    //   }
      const elements = ['one', 'two', 'three'];

      const items = []
    
      for (const [index, value] of elements.entries()) {
        items.push(<li key={index}>{value}</li>)
      }
    
    //   return (
    //     <div>
    //       {items}
    //     </div>
    //   )
      if (this.state.a && this.state.m) {
        header = <h1>Hello x === {this.state.a} mod {this.state.m} </h1>;
      } else {
        header = '';
      }
      let equations = [];
      for (let i = 0; i < N; i++) {
          equations.push([this.state.a, this.state.m]);
        //   equations.push([{this.state.a},{this.state.m}]);
      }
      return (
          <div></div>
        // <form>
        // <h1>Masukkan persamaan:</h1>
        // {header}
        // <br></br>Equations:
        // {equations}
        // x === 
        // <input
        //   type='number'
        //   onChange={this.handleAChange}
        //   value={this.state.a}
        // />
        // mod
        // <input
        //   type='number'
        //   onChange={this.handleMChange}
        //   value={this.state.m}
        // />
        // </form>
      );
    }
  }
  
 // ReactDOM.render(<MyForm />, document.getElementById('root'));
export default MyForm;