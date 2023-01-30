import './datepicker.css';
import Input from "../Input";
import {useState} from "react";
import Calendar from "../Calendar";

const Datepicker = ({date, onChange}) => {
    const [focus, setFocus] = useState(false)

    const handleOnFocusInput = () => {
        setFocus(true);
    };
    const handleOnBlurInput = () => {
        setFocus(false);
    };

    const handleSetDate = (updatedDate) => {
        onChange && onChange(updatedDate);
        setFocus(false);
    };

    const handleOnMouseDownPreventParentBlur = e => {
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <div className="datepicker" onClick={handleOnFocusInput} onBlur={handleOnBlurInput}>

            <Input readonly={true} value={date ? date.toFormat('D') : ''}/>

            {focus && (
                <div className="datepicker-calendar" onMouseDown={handleOnMouseDownPreventParentBlur}>
                    <Calendar date={date} setDate={handleSetDate}/>
                </div>
            )}
        </div>
    );
};

export default Datepicker;