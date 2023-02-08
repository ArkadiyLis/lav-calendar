import './variables.css';
import './planner.css';
import Calendar from "../Calendar";
import {Icon} from "@mui/material";
import Button from "../Button";
// import CalendarTable from "../CalendarTableVirtualize";
import CalendarTable from "../CalendarTable";
import {useReducer, useState} from "react";
import {DateTime} from "luxon";
import Modal, {ModalBody, ModalFooter, ModalForm, ModalTitle} from "../Modal";
import {useDispatch, useSelector} from "react-redux";
import {show, close} from "../Modal/reducer";
import Datepicker from "../Datepicker";
import EventsTable from "../EventsTable";
import _ from "lodash";
import {addEvent} from "./reducer";
import Selector from "../Selector";

const initialPlannerState = {
    events: [
        {
            id: 1, startDate: DateTime.now().set({hour: 3}), endDate: DateTime.now().set({hour: 3}).plus({hours: 2})
        },
    ]
};
const plannerReducer = (state, action) => {
    switch (action.type) {
        case 'add_event':
            return {events: [...state.events, action.event]};
        default:
            return state;
    }
};

const AddEventModal = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const reduxDispatch = useDispatch();

    const hours = _.times(24, (hour) => {
        const currentHourDate = DateTime.now().startOf('day').plus({hours: hour})
        return {
            date: currentHourDate,
            value: currentHourDate.toLocaleString({hour: 'numeric', minute: '2-digit'}) ,
        };
    });

    return (
        <ModalForm>
            <ModalTitle>ADD EVENT</ModalTitle>
            <ModalBody>
                <div className="event-form-container">
                    <div className="event-start-date-title">Start: </div>
                    <Datepicker date={startDate} onChange={setStartDate}/>
                    <Selector data={hours} value={startHour} onChange={(value, item) => setStartHour(value)} renderValue={({value, formattedValue}) => value}/>
                    <div className="event-start-date-title">End: </div>
                    <Datepicker date={endDate} onChange={setEndDate}/>
                    <Selector data={hours} value={endHour} onChange={setEndHour} renderValue={({value, formattedValue}) => value}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button className="button-close" title={'Close'} icon={'close'} onClick={() => reduxDispatch(close())}/>
                <Button className="button-success" title={'Add'} icon={'add'} onClick={() => {
                    reduxDispatch(addEvent({
                        startDate, endDate, startHour, endHour
                    }));
                    reduxDispatch(close());
                }}/>
            </ModalFooter>
        </ModalForm>
    );
};

const Planner = () => {
    const [date, setDate] = useState(DateTime.now())
    const [state, dispatch] = useReducer(plannerReducer, initialPlannerState);
    const reduxDispatch = useDispatch()
    const {events} = useSelector(state => state.planner);

    return (
        <div className="planner">
            <div className="left-panel">
                <div className="left-panel-title">
                    Planner
                </div>

                <div className="new-event">
                    <Button title={'New Event'} icon={'add'} onClick={() => reduxDispatch(show(AddEventModal))}/>
                </div>

                <Calendar date={date} setDate={setDate}/>

                <div className="left-panel-events"></div>
                <div className="left-panel-toolbar"></div>

            </div>
            <div className="head"></div>
            <div className="content">
                <EventsTable events={events}/>
            </div>
        </div>
    );
};

export default Planner;