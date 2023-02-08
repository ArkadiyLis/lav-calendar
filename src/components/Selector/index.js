import {useState} from "react";
import Input from "../Input";
import _ from "lodash";
import './selector.css';
const Selector = ({data, renderValue, value, onChange}) => {
    const [focus, setFocus] = useState(false);

    const handleOnFocusInput = () => {
        setFocus(true);
    };
    const handleOnBlurInput = () => {
        setFocus(false);
    };

    const handleSetValue = (e, updatedValue) => {
        e.stopPropagation();
        e.preventDefault();

        setFocus(false);
        onChange && onChange(updatedValue);
    };

    const handleOnMouseDownPreventParentBlur = e => {
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <div className="selector" onClick={handleOnFocusInput} onBlur={handleOnBlurInput}>
            <Input readonly={true} value={value}/>

            {(focus && data && data.length !== 0) && (
                <div className="selector-list-container" onMouseDown={handleOnMouseDownPreventParentBlur}>
                    <div className="selector-list">
                        {
                            _.map(data, (item, itemIndex) => {
                                const value = renderValue ? renderValue(item) : item;

                                return (
                                    <div className="selector-list-item" key={itemIndex} onClick={e => handleSetValue(e, value, item)}>
                                        <div className="selector-list-item-value">{value}</div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
export default Selector;