import React from 'react';
import SubmitButton from "../view/SubmitButton";

/**
 * Functionality for Submit Button.
 */
const SubmitButtonContainer = (props) => {
    const handleSubmit = () => {
        props.onClick();
    }
    return <SubmitButton label={props.label} onClick={handleSubmit}/>;
}

export default SubmitButtonContainer;