import React, { Component } from 'react';
import PropTypes from 'prop-types'

class InputDisplay extends Component {
    state = { 
        inputList: this.props.inputArray
    }

    componentWillReceiveProps(newProps) {
        this.setState({inputList: newProps.inputArray});
    }

    render (props){
        console.log(`display ${this.state.inputList}`)
        return(
            <div>
                {this.state.inputList.join(" ")}
            </div>
        )
    }
}

const ResultDisplay = (props) => {
    const result = props.result.toFixed(3);
    return (
        <div>
            {result}
        </div>
    )
};

// class Buttons extends Component
//  {

//     handleClick(func, val){
//         func(val);
//     }

//     render(){
//         let fn = child =>{
//             React.cloneElement(child, {
//                 onClick: this.handleClick.bind(this, [child.props.onClick, child.props.value])
//             })
//         };
//         let buttons = React.Children.map(this.props.children, fn);
        
//         return (
//             <div>
//                 {buttons}
//             </div>
//         )
//     }
// }

// Button.propTypes = {
//     value: PropTypes.oneOf[string, number]
// }

class Calculator extends Component {
    constructor(props){
        super();

        this.state = {
            inputArray:["2","x","10","x","5","+","700"],
            digits: [],
            total: 0
        }
        
        this.addVal = this.addVal.bind(this);
        this.multiply = this.multiply.bind(this);
        this.divide = this.divide.bind(this);
        this.subtract = this.subtract.bind(this);
        this.add = this.add.bind(this);
        this.negate = this.negate.bind(this);
        this.percentage = this.percentage.bind(this);
        this.addDecimal = this.addDecimal.bind(this);
        this.calculate  = this.calculate.bind(this);
    }

    updateInputDisplay(input) {
        this.setState(prevState => ({
            inputArray: [...prevState.inputArray, input],
            digits: []
        }));
    };

    addVal(val){
        let input = val;
        let newInput = []
        newInput.push(...this.state.inputArray);

        if(this.state.digits.length >= 1) {
            let currentDigits = [...currentDigits, ...this.state.digits, val];
            input = currentDigits.join("");
            newInput = newInput.slice(0, -1);
        }

        this.setState(prevState => ({
            inputArray: [...newInput, input],
            digits: [...prevState.digits, val]
        }));
    }

    multiply(){
        this.updateInputDisplay("x");
    }

    divide(){
        this.updateInputDisplay("/");
    }

    subtract(){
        this.updateInputDisplay("-");
    }

    add(){
        this.updateInputDisplay("+")
    }

    negate(){
        
    }

    percentage(){

    }

    addDecimal(){

    }

    calculate(){

    }

    render(){
        console.log(this.state);
        return(
            <div>
                <div>
                    <InputDisplay inputArray={this.state.inputArray}/>
                    <ResultDisplay result={1.700}/>
                </div>

                {/* <Buttons> */}
                    <button value="+/-" onClick={this.negate}>+/-</button>
                    <button value="%" onClick={this.percentage()}>%</button>
                    <button value="/" onClick={() => this.divide()}>/</button>
                    <br />
                    <button value={7} onClick={() => this.addVal(7)}>7</button>
                    <button value={8} onClick={() => this.addVal(8)}>8</button>
                    <button value={9} onClick={() => this.addVal(9)}>9</button>
                    <button value="x" onClick={() => this.multiply()}>x</button>
                    <br />
                    <button value={4} onClick={() => this.addVal(4)}>4</button>
                    <button value={5} onClick={() => this.addVal(5)}>5</button>
                    <button value={6} onClick={() => this.addVal(6)}>6</button>
                    <button value="-" onClick={() => this.subtract()}>-</button>
                    <br />
                    <button value={1} onClick={() => this.addVal(1)}>1</button>
                    <button value={2} onClick={() => this.addVal(2)}>2</button>
                    <button value={3} onClick={() => this.addVal(3)}>3</button>
                    <button value="+" onClick={() => this.add()}>+</button>
                    <br />
                    <button value={0} onClick={() => this.addVal(0)}>0</button> 
                    <button value="." onClick={this.addDecimal}>.</button>
                    <button value="=" onClick={this.calculate}>=</button>
                {/* </Buttons> */}
            </div>
        );
    }
}

export default Calculator;