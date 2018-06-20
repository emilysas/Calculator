import React, { Component } from 'react';
import PropTypes from 'prop-types'

class InputDisplay extends Component {
    state = { 
        inputList: this.props.inputArray
    }

    componentWillReceiveProps(newProps) {
        this.setState({inputList: newProps.inputArray});
    }

    render (){

        let displayVal = this.state.inputList.length >= 1 ? this.state.inputList.join(" ") : "...";

        return(
            <div>
                {displayVal}
            </div>
        )
    }
}

class ResultDisplay extends Component {
    state = { 
        result: this.props.total,
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            result: newProps.total,
        });
    }

    render(){
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
            negative: false,
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
            let currentDigits = [...this.state.digits, val];
            input = currentDigits.join("");
            newInput = newInput.slice(0, -1);
        }

        this.setState(prevState => ({
            inputArray: [...newInput, input],
            digits: [...prevState.digits, val]
        }));
    }

    negate(){
        this.setState(prevState => ({
            negative: !prevState.negative
        }));
        this.calculate();
    }

    percentage(){
        if(this.state.digits.length >= 1) {
            let currentDigits = [...this.state.digits];
            currentDigits.unshift(0, ".")
            let val = currentDigits.join("");

            this.setState(prevState => ({
                inputArray: [...prevState.inputArray.slice(0, -1), val],
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
        let inputs = [0]
        if (this.state.inputArray.length >= 1){
            inputs = this.state.inputArray.map(i => i === "x" ? "*" : i);
        }
        // doesn't work with percentage as this has been translated into decimal string
        // if(typeof inputs[inputs.length-1] === "string"){
        //     inputs = inputs.slice(0, -1)
        // }
        let newTotal = eval(inputs.join(""));

        this.setState(prevState => ({
            total: prevState.negative ? `-${newTotal}` : newTotal
        }));
    }

    clear(){
        this.setState(prevState => ({
            inputArray:[],
            digits: [],
            negative: false,
            total: 0
        }));
    }

    render(){
        const firstRow = [ 
            {val: "C", func: () => {this.clear()} }, 
            {val: "+/-", func: () => {this.negate()} }, 
            {val: "%", func: () => {this.percentage()} },
            {val: "/", func: () => {this.update("/")} } 
        ]

        const secondRow = [ 
            {val: 7, func: () => {this.addVal(7)} }, 
            {val: 8, func: () => {this.addVal(8)} }, 
            {val: 9, func: () => {this.addVal(9)} },
            {val: "x", func: () => {this.update("x")} } 
        ]

        const thirdRow = [ 
            {val: 4, func: () => {this.addVal(4)} }, 
            {val: 5, func: () => {this.addVal(5)} }, 
            {val: 6, func: () => {this.addVal(6)} },
            {val: "-", func: () => {this.update("-")} } 
        ]

        const forthRow = [ 
            {val: 1, func: () => {this.addVal(1)} }, 
            {val: 2, func: () => {this.addVal(2)} }, 
            {val: 3, func: () => {this.addVal(3)} },
            {val: "+", func: () => {this.update("+")} } 
        ]

        const finalRow = [ 
            {val: 0, func: () => {this.addVal(0)} }, 
            {val: ".", func: () => {this.addDecimal()} }, 
            {val: "=", func: () => {this.calculate()} },
        ]


        const mapRow = (buttons) => {
            return (
                buttons.map(({val, func}) => {
                    return (
                        <button key={val} onClick={() => func()}>{val}</button>
                    )
                })
            )
        }

        return(
            <div>
                <div>
                    <InputDisplay inputArray={this.state.inputArray}/>
                    <ResultDisplay total={this.state.total}/>
                </div>
                    {mapRow(firstRow)}
                    <br />
                    {mapRow(secondRow)}
                    <br />
                    {mapRow(thirdRow)}
                    <br />
                    {mapRow(forthRow)}
                    <br />
                    {mapRow(finalRow)}
            </div>
        );
    }
}

export default Calculator;