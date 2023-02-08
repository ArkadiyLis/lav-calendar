import {Icon} from "@mui/material";
import './button.css';
import classNames from "classnames";
const Button = ({icon, title, onClick, className}) => {

    const handleOnClick = e => {
        e.preventDefault();
        e.stopPropagation();

        onClick && onClick(e);
    };

    const buttonClassName = classNames('button', className);

    return (
        <div className={buttonClassName} onClick={handleOnClick}>
            {icon && (<Icon className="button-icon">{icon}</Icon>)}
            {title && (<span className="button-title">{title}</span>)}
        </div>
    );

}
export default Button;