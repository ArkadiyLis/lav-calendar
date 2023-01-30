import {DateTime, Settings, Info} from 'luxon';
import _ from 'lodash';
import cn from 'classnames';
import './calendar.css';
import {useEffect, useRef, useState} from "react";
import {Icon} from "@mui/material";
import Button from "../Button";

Settings.defaultLocale = 'en';

const Calendar = ({date, setDate}) => {
    const DAYS_IN_VIEW = 42;
    const [dateView, setDateView] = useState(date || DateTime.now());

    const firstDayInMonth = dateView.startOf('month');
    const firstDayWeekOffset = _.indexOf(Info.weekdays('short'), firstDayInMonth.weekdayShort);
    const firstCalendarDate = firstDayInMonth.minus({days: firstDayWeekOffset});

    const handleDayClick = (e, newDate) => {
        e.preventDefault();
        e.stopPropagation();

        setDate(newDate);
    };

    const nextMonth = () => {
        setDateView(dateView.plus({months: 1}));
    };

    const prevMonth = () => {
        setDateView(dateView.minus({months: 1}));
    };

    const goToday = () => {
        setDateView(DateTime.now());
        setDate(DateTime.now());
    };

    return (
        <div className="calendar">
            {
                (dateView && firstCalendarDate) && (
                    <>
                        <div className="calendar-head">
                            <Button icon={'arrow_back'} onClick={prevMonth}/>
                            <Button title={`${dateView.monthLong} ${dateView.year}`} onClick={goToday}/>
                            <Button icon={'arrow_forward'} onClick={nextMonth}/>
                        </div>
                        <div className="calendar-body">
                            <div className="day-name">Su</div>
                            <div className="day-name">Mo</div>
                            <div className="day-name">Tu</div>
                            <div className="day-name">We</div>
                            <div className="day-name">Th</div>
                            <div className="day-name">Fr</div>
                            <div className="day-name">Sa</div>
                            {
                                firstCalendarDate && _.times(DAYS_IN_VIEW, (dayIndex) => {
                                    const day = firstCalendarDate.plus({days: dayIndex});
                                    const dayClassName = cn('day', {
                                        'current-month': day.hasSame(dateView, 'month'),
                                        'today': DateTime.now().hasSame(day, 'day'),
                                        'selected-day': date && date.hasSame(day, 'day'),
                                    })
                                    return (
                                        <div className={dayClassName} key={dayIndex} onClick={e => handleDayClick(e, day)}>{day.day}</div>
                                    );
                                })
                            }

                        </div>
                    </>
                )
            }
            <div className="calendar-footer"></div>
        </div>
    );
};
export default Calendar