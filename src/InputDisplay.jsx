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

InputDisplay.propTypes = {
    inputArray: PropTypes.array
}

export default InputDisplay;