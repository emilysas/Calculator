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
        return(
            <div>
                {this.state.inputList.join(" ")}
            </div>
        )
    }
}

class ResultDisplay extends Component {
    state = { 
        result: this.props.total
    }

    componentWillReceiveProps(newProps) {
        this.setState({result: newProps.total});
    }

    render(props){
        return (
            <div>
                {this.state.result}
            </div>
        )
    }
};

class Calculator extends Component {
    constructor(props){
        super();

        this.state = {
            inputArray:[],
            digits: [],
            total: 0
        }
        
        this.addVal = this.addVal.bind(this);
        this.negate = this.negate.bind(this);
        this.percentage = this.percentage.bind(this);
        this.addDecimal = this.addDecimal.bind(this);
        this.calculate  = this.calculate.bind(this);
        this.update = this.updateInputDisplay.bind(this);
        this.clear = this.clear.bind(this);
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

    negate(){
        
    }

    percentage(){
        if(this.state.digits.length >= 1) {
            let currentDigits = [...this.state.digits];
            currentDigits.unshift(0, ".")
            let val = currentDigits.join("");
            
            let newInput = [...this.state.inputArray]
            newInput = newInput.slice(0, -1);

            this.setState(prevState => ({
                inputArray: [...newInput, val],
                digits: []
            }));
        }
    }

    addDecimal(){
        if(!this.state.inputArray.includes(".")){
            this.updateInputDisplay(".")
        }
    }

    calculate(){
        let inputs = this.state.inputArray.map(i => i == "x" ? "*" : i);
        console.log(inputs);
        let newTotal = eval(inputs.join(""));

        this.setState(prevState => ({
            total: newTotal
        }));
    }

    clear(){
        this.setState(prevState => ({
            inputArray:[],
            digits: [],
            total: 0
        }));
    }

    render(){
        console.log(this.state);
        return(
            <div>
                <div>
                    <InputDisplay inputArray={this.state.inputArray}/>
                    <ResultDisplay total={this.state.total}/>
                </div>

                {/* <Buttons> */}
                    <button value="C" onClick={this.clear}>C</button>
                    <button value="+/-" onClick={this.negate}>+/-</button>
                    <button value="%" onClick={this.percentage}>%</button>
                    <button value="\" onClick={() => this.update("/")}>\</button>
                    <br />
                    <button value={7} onClick={() => this.addVal(7)}>7</button>
                    <button value={8} onClick={() => this.addVal(8)}>8</button>
                    <button value={9} onClick={() => this.addVal(9)}>9</button>
                    <button value="x" onClick={() => this.update("x")}>x</button>
                    <br />
                    <button value={4} onClick={() => this.addVal(4)}>4</button>
                    <button value={5} onClick={() => this.addVal(5)}>5</button>
                    <button value={6} onClick={() => this.addVal(6)}>6</button>
                    <button value="-" onClick={() => this.update("-")}>-</button>
                    <br />
                    <button value={1} onClick={() => this.addVal(1)}>1</button>
                    <button value={2} onClick={() => this.addVal(2)}>2</button>
                    <button value={3} onClick={() => this.addVal(3)}>3</button>
                    <button name="add" value="+" onClick={() => this.update("+")}>+</button>
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