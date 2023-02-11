import './input.css';
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";

const Input = ({value, setValue, readonly, className, classNameContainer}) => {
    const handleOnChangeInput = e => {
        !readonly && setValue && setValue(e.target.value);
    };

    useEffect(() => {
        return () => {
        };
    }, []);

    const inputContainerClassNames = classNames('input-container', classNameContainer);
    const inputClassNames = classNames('input', className);

    return (<div className={inputContainerClassNames}>
            <input
                className={inputClassNames}
                type="text"
                value={value}
                onChange={handleOnChangeInput}
            />
        </div>);
};
export default Input;