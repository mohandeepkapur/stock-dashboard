import React from 'react';

/**
 * Renders Submit Button.
 */
const SubmitButton = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.label}
        </button>
    );
}

export default SubmitButton;