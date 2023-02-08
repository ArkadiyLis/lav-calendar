import './events-table.css';
import {useRef, useState} from "react";
import _ from 'lodash';
import {DateTime, Interval} from "luxon";

const Cell = ({children}) => {
    return (<div className="events-table-cell">{children}</div>);
};

const EventsTable = ({events}) => {
    const eventsCacheRef = useRef({});
    const [dragged, setDragged] = useState(false);

    const handleOnMouseDownCell = () => {
        setDragged(true);
    };
    const handleOnMouseUpCell = () => {
        setDragged(false);
    };

    console.clear();
    console.log(dragged);

    eventsCacheRef.current = {};

    const viewHours = 10;
    const startViewHour = 6;
    const endViewHour = 18;
    const startActiveHour = 8;
    const endActiveHour = 16;

    //todo потом надо будет брать дату текущего дня недели
    const currentDayDate = DateTime.now().set({minutes: 0, seconds: 0, millisecond: 0});
    const startViewDate = currentDayDate.set({hour: startViewHour});
    const endViewDate = currentDayDate.set({hour: endViewHour});
    const currentDayInterval = Interval.fromDateTimes(startViewDate, endViewDate);

    const startWeekDate = currentDayDate.startOf('week');
    const endWeekDate = currentDayDate.endOf('week');
    const currentWeekInterval = Interval.fromDateTimes(startWeekDate, endWeekDate);

    const getRandomColorHex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    const getColorHexByIndex = (index) => {
        const HEX_COLORS = ['#4A13E5', '#602CD5', '#A83CF0', '#A050B9', '#2259FD', '#B872ED', '#3321A0', '#571B5E', '#B90AE3', '#329CE2',]
        return HEX_COLORS[index % 10];
    };
    const overlapsEvents = (rootEvent, rootEvents) => {

        let rootContext = [];
        const overlapsEventsRecursion = (event, events) => {
            const eventInterval = Interval.fromDateTimes(event.start, event.end);

            for (let i = 0; i < events.length; i++) {
                const nextEvent = events[i];
                const nextEventInterval = Interval.fromDateTimes(nextEvent.start, nextEvent.end);
                const nextEventIntervalISO = nextEventInterval.toISO();
                if (eventInterval.overlaps(nextEventInterval) && !_.includes(rootContext, nextEventIntervalISO)) {
                    rootContext = _.union([nextEventIntervalISO], rootContext);
                    overlapsEventsRecursion(nextEvent, events);
                }
            }
        };

        overlapsEventsRecursion(rootEvent, rootEvents);

        const sortedRootContext = _.sortBy(rootContext);
        return sortedRootContext;
    };

    const eventsRender = () => {
        const currentDayDate = DateTime.now().set({minutes: 0, seconds: 0, millisecond: 0});
        const startViewDate = currentDayDate.set({hour: startViewHour});
        const startWeekDate = currentDayDate.startOf('week');

        return _.map(events, (event, eventIndex) => {
            const hourIndex = event.start.hour - startViewDate.hour;
            const dayIndex = event.start.day - startWeekDate.day;
            const eventInterval = Interval.fromDateTimes(event.start, event.end);
            const overlaps = overlapsEvents(event, events);
            const eventWidth = (150 / overlaps.length);
            const eventHeight = 50 * Interval.fromDateTimes(event.start, event.end).length('hours');
            const eventOverlapIndex = _.indexOf(overlaps, eventInterval.toISO());
            const eventTop = 50 * hourIndex;
            const eventLeft = (eventWidth * eventOverlapIndex) + (150 * dayIndex);
            const renderHour = event.start.toLocaleString({hour: 'numeric', minute: '2-digit'});

            return (<div className="events-table-event-container" key={eventIndex} style={{
                width: eventWidth, height: eventHeight, top: eventTop, left: eventLeft
            }}>
                <div className="events-table-event" style={{backgroundColor: getColorHexByIndex(eventIndex)}}>
                    {/*{renderHour}*/}
                </div>
            </div>);
        })
    };

    return (<div className="events-table-scroll">

        <div className="events-table-columns">

            <div className="events-table-column events-table-hours-fixed">
                <div className="events-table-rows">

                    <div className="events-table-row events-table-empty-fixed">
                        <div className="events-table-cell events-table-hour-header"/>
                    </div>

                    {_.times(currentDayInterval.length('hours'), (hour) => {
                        const currentRowDate = currentDayInterval.start.plus({hours: hour});
                        const currentRowDateInterval = Interval.fromDateTimes(currentRowDate, currentRowDate.plus({hours: 1}));
                        const renderTime = currentRowDate.toFormat('ha').toLowerCase();

                        return (<div className="events-table-row">
                            <div className="events-table-cell events-table-hour-header">
                                {renderTime}
                            </div>
                        </div>);
                    })}

                </div>

            </div>

            <div className="events-table-column">

                <div className="events-table-rows events-table-days-fixed">
                    <div className="events-table-row">
                        <div className="events-table-columns">
                            {_.times(Math.round(currentWeekInterval.length('days')), (day) => {
                                const currentDayDate = currentWeekInterval.start.plus({days: day});
                                const currentDayRender = currentDayDate.toFormat('EEEE d');
                                return (<div className="events-table-column">
                                    <div className="events-table-row">
                                        <div className="events-table-cell">
                                            {currentDayRender}
                                        </div>
                                    </div>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>

                <div className="events-table-rows">
                    <div className="events-relative-container events-table-row">
                        <div className="events-table-columns">
                            {_.times(Math.round(currentWeekInterval.length('days')), (day) => {
                                const currentDayDate = currentWeekInterval.start.plus({days: day});

                                return (<div className="events-table-column">
                                    <div className="events-table-rows">
                                        {_.times(currentDayInterval.length('hours'), (hour) => {
                                            const currentRowDate = currentDayInterval.start.plus({hours: hour});
                                            const currentRowDateInterval = Interval.fromDateTimes(currentRowDate, currentRowDate.plus({hours: 1}));
                                            const renderTime = currentRowDate.toLocaleString({
                                                hour: 'numeric', minute: '2-digit'
                                            });

                                            return (<div className="events-table-row">
                                                <div className="events-table-cell">
                                                    {/*{renderTime}*/}
                                                </div>
                                            </div>);
                                        })}
                                    </div>
                                </div>)
                            })}
                        </div>

                        <div className="events-table-events">
                            {eventsRender()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};
export default EventsTable;