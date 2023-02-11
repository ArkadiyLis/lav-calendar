import './events-table.css';
import {useRef, useState} from "react";
import _ from 'lodash';
import {DateTime, Interval} from "luxon";
import classNames from "classnames";
import useRealTime from "../../hooks/useRealTime";
import Events from "./Events";
import useEventsDate from "../../hooks/useEventsDate";
import {
    DAY_CELL_HEIGHT,
    DAY_CELL_WIDTH, DEFAULT_END_ACTIVE_HOUR,
    DEFAULT_HOUR_HEADER_FORMAT, DEFAULT_START_ACTIVE_HOUR, DEFAULT_WEEKDAY_HEADER_FORMAT, HOUR_HEADER_HEIGHT,
    ONE_MINUTE_IN_SECONDS
} from "../../utils/constants";
import EventsCurrentTimeLine from "./EventsCurrentTimeLine";

const EventsTable = ({events, selectedDate = DateTime.now()}) => {
    const [selectedCell, setSelectedCell] = useState(null);
    const [defaultFormattedTime, nowDate] = useRealTime();
    const {
        currentDayInterval, currentWeekInterval, activeWeekdayInterval
    } = useEventsDate(selectedDate);

    const hoursHeaderRender = () => {
        return (
            <div className="events-table-column events-table-hours-fixed">
                <div className="events-table-rows">

                    <div className="events-table-row events-table-empty-fixed">
                        <div className="events-table-cell events-table-hour-header">
                            {/*{_.lowerCase(realTime)}*/}
                        </div>
                    </div>

                    {_.times(currentDayInterval.length('hours'), (hour) => {
                        const currentHourDate = currentDayInterval.start.plus({hours: hour});
                        const currentRowDateInterval = Interval.fromDateTimes(currentHourDate, currentHourDate.plus({hours: 1}));

                        const isHourNow = currentRowDateInterval.contains(DateTime.now());
                        const hourNowHeight = 16;
                        const hourNowTop = ((DAY_CELL_HEIGHT / ONE_MINUTE_IN_SECONDS) * nowDate.minute);
                        const processedHourNowTop = hourNowTop >= (HOUR_HEADER_HEIGHT - hourNowHeight)
                            ? HOUR_HEADER_HEIGHT - hourNowHeight
                            : hourNowTop

                        const currentHourDateMeridiem = currentHourDate.toFormat('a') === 'AM' ? 'a' : 'p';
                        const nowDateMeridiem = nowDate.toFormat('a') === 'AM' ? 'a' : 'p';
                        const renderCurrentHourTime = `${currentHourDate.toFormat('h')}${currentHourDateMeridiem}`;

                        return (<div className="events-table-row">
                            <div className="events-table-cell events-table-hour-header">
                                {isHourNow ? (
                                    <div className="events-table-hour-now" style={{top: processedHourNowTop}}>
                                        {nowDate.toFormat('h')}
                                        <span>:</span>
                                        {nowDate.toFormat('mm')}
                                        {nowDateMeridiem}
                                    </div>
                                ) : renderCurrentHourTime}
                            </div>
                        </div>);
                    })}
                </div>
            </div>
        );
    };

    const weekHeaderRender = () => {
        return (
            <div className="events-table-rows events-table-days-fixed">
                <div className="events-table-row">
                    <div className="events-table-columns">
                        {_.times(Math.round(currentWeekInterval.length('days')), (day) => {
                            const currentWeekdayHeaderDate = currentWeekInterval.start.plus({days: day});
                            const currentDayDateInterval = Interval.fromDateTimes(currentWeekdayHeaderDate.startOf('day'), currentWeekdayHeaderDate.endOf('day'));
                            const currentDayRender = currentWeekdayHeaderDate.toFormat(DEFAULT_WEEKDAY_HEADER_FORMAT);

                            const weekHeaderCellClassName = classNames('events-table-cell events-table-week-header', {
                                'events-table-week-header-today': currentDayDateInterval.contains(DateTime.now()),
                            });

                            return (<div className="events-table-column">
                                <div className="events-table-row">
                                    <div className={weekHeaderCellClassName}>
                                        {currentDayRender}
                                    </div>
                                </div>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        )
    };

    const tableGridRender = () => {
        return (
            <div className="events-table-columns">
                {_.times(Math.round(currentWeekInterval.length('days')), (day) => {
                    const currentWeekdayDate = currentWeekInterval.start.plus({days: day});
                    const currentWeekdayDateInterval = Interval.fromDateTimes(currentWeekdayDate.startOf('day').set({hour: DEFAULT_START_ACTIVE_HOUR}), currentWeekdayDate.endOf('day').set({hour: DEFAULT_END_ACTIVE_HOUR}));

                    return (<div className="events-table-column">
                        <div className="events-table-rows">
                            {_.times(currentDayInterval.length('hours'), (hour) => {
                                const currentCellDate = currentWeekdayDate.plus({hours: hour});

                                const cellClassName = classNames('events-table-cell', {
                                    'events-table-cell-active': currentWeekdayDateInterval.contains(currentCellDate) && activeWeekdayInterval.contains(currentWeekdayDate),
                                    'events-table-cell-selected': _.includes(selectedCell, currentCellDate.toISO()),
                                });

                                return (<div className="events-table-row">
                                    <div className={cellClassName} onMouseDown={(e) => handleOnSelectedCell(e, currentCellDate)}>
                                        {/*{renderTime}*/}
                                    </div>
                                </div>);
                            })}
                        </div>
                    </div>)
                })}
            </div>
        );
    };

    const handleOnSelectedCell = (e, cellDate) => {
        e.stopPropagation();
        e.preventDefault();

        let updatedSelectedCell = [];
        const cellDateISO = cellDate.toISO();
        updatedSelectedCell = _.xor([], [cellDateISO]);
        setSelectedCell(updatedSelectedCell);
    };

    return (
        <div className="events-table-scroll">
            <div className="events-table-columns">
                {hoursHeaderRender()}
                <div className="events-table-column">
                    {weekHeaderRender()}
                    <div className="events-table-rows">
                        <div className="events-relative-container events-table-row">
                            {tableGridRender()}
                            <Events events={events} selectedDate={selectedDate}/>
                            <EventsCurrentTimeLine selectedDate={selectedDate}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EventsTable;