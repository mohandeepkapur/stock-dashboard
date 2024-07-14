import React, {Component} from 'react';


// get rid of this

export default class InputBox extends Component {

    handleChange = (event) => {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <input
                type="text"
                value={this.props.value}
                onChange={this.handleChange}
            />
        );
    }

}