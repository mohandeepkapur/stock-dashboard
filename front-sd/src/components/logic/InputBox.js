import React from 'react';

/**
 * Input Box.
 */
const InputBox = (props) => {
    const handleChange = (event) => {
        props.onChange(event.target.value);
    }
    return (
        <input type="text" value={props.value} onChange={handleChange}/>
    );
}

export default InputBox;