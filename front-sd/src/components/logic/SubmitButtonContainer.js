import React from 'react';
import SubmitButton from "../view/SubmitButton";

const SubmitButtonContainer = (props) => {

    const handleSubmit = () => {
        props.onClick();
    }

    return <SubmitButton label={props.label} onClick={handleSubmit}/>;
}

export default SubmitButtonContainer;