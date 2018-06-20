import React, { Component } from 'react';
import PropTypes from 'prop-types'


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

ResultDisplay.propTypes = {
    total: PropTypes.string
}

export default ResultDisplay;