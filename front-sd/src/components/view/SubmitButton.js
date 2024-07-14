import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class SubmitButton extends Component {
    render() {
        return (
            <button onClick={this.props.onClick}>
                {this.props.label}
            </button>
        );
    }
}

// prov by container
SubmitButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};