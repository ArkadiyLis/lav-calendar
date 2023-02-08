import './hour-picker.css';
import Input from "../Input";
import {useState} from "react";
import Calendar from "../Calendar";
import _ from 'lodash';
import Selector from "../Selector";
import {DateTime, Interval} from "luxon";
const Hourpicker = ({data, value, onChange}) => {

    return (
        <Selector data={data} value={value} onChange={onChange} renderValue={({value, formattedValue}) => value}/>
    )
};
export default Hourpicker;