import React, {Component} from 'react';
import SubmitButton from '../view/SubmitButton';

export default class SubmitButtonContainer extends Component {

    handleSubmit = () => {
        this.props.onClick();
    }

    render() {
        return <SubmitButton label={this.props.label} onClick={this.handleSubmit}/>;
    }

}
