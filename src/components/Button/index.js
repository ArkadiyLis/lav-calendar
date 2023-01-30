import {Icon} from "@mui/material";
import './button.css';
const Button = ({icon, title, onClick}) => {

    const handleOnClick = e => {
        e.preventDefault();
        e.stopPropagation();

        onClick && onClick(e);
    };

    return (
        <div className="button" onClick={handleOnClick}>
            {icon && (<Icon className="button-icon">{icon}</Icon>)}
            {title && (<span className="button-title">{title}</span>)}
        </div>
    );

}
export default Button;