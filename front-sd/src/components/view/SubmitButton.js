import React from 'react';

const SubmitButton = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.label}
        </button>
    );
}

export default SubmitButton;