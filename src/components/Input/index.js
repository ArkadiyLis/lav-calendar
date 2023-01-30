import './input.css';
import {useEffect, useRef, useState} from "react";

const Input = ({value, setValue, readonly}) => {
    const handleOnChangeInput = e => {
        !readonly && setValue && setValue(e.target.value);
    };

    useEffect(() => {
        return () => {
        };
    }, []);

    return (<div className="input-container">
            <input
                className="input"
                type="text"
                value={value}
                onChange={handleOnChangeInput}
            />
        </div>);
};
export default Input;