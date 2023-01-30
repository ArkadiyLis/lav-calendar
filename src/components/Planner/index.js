import './planner.css';
import Calendar from "../Calendar";
import {Icon} from "@mui/material";
import Button from "../Button";
// import CalendarTable from "../CalendarTableVirtualize";
import CalendarTable from "../CalendarTable";
import {useReducer, useState} from "react";
import {DateTime} from "luxon";
import Modal, {ModalBody, ModalFooter, ModalForm, ModalTitle} from "../Modal";
import {useDispatch} from "react-redux";
import {show, close} from "../Modal/reducer";
import Datepicker from "../Datepicker";

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
    const [date, setDate] = useState();
    const reduxDispatch = useDispatch();

    return (
        <ModalForm>
            <ModalTitle>ADD EVENT MODAL</ModalTitle>
            <ModalBody>
                <Datepicker date={date} onChange={setDate}/>
            </ModalBody>
            <ModalFooter>
                <Button title={'Close'} icon={'close'} onClick={() => reduxDispatch(close())}/>
                <Button title={'Add'} icon={'add'} onClick={() => {
                    // console.log('add event');
                    console.log(date);
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
                <CalendarTable date={date}/>
            </div>
        </div>
    );
};

export default Planner;