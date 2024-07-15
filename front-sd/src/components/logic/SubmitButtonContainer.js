import React from 'react';
import SubmitButton from "../view/SubmitButton";

/**
 * Functionality Submit Button.
 */
const SubmitButtonContainer = (props) => {
    const handleSubmit = () => {
        props.onClick();
    }
    return <SubmitButton label={props.label} onClick={handleSubmit}/>;
}

export default SubmitButtonContainer;