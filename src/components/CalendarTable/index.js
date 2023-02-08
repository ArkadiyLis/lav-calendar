import {DateTime, Settings, Info} from 'luxon';
import _ from 'lodash';
import './calendar-table.css';
import cn from "classnames";

const CalendarTable = ({date = DateTime.now(), events}) => {
    const firstDayWeek = date.startOf('week');

    return (<div className="table-scroll">
            <table className="table">
                <tbody>
                <tr className="row">
                    <th className="hour-title"/>
                    {_.map(Info.weekdays(), (day, dayIndex) => {
                        const dayDate = firstDayWeek.plus({days: dayIndex});

                        const dayTitleClassName = cn('day-title', {
                            'today-title': DateTime.now().hasSame(dayDate, 'day'),
                        })

                        return (<th className={dayTitleClassName} key={dayIndex}>{day}</th>);
                    })}
                </tr>

                <tr className="row">
                    <th className="hour-header"/>
                    {_.map(Info.weekdays(), (day, dayIndex) => {
                        const dayDate = firstDayWeek.plus({days: dayIndex});

                        const dayHeaderClassName = cn('day-header', {
                            // 'current-month': dayDate.hasSame(date, 'month'),
                            'today-header': DateTime.now().hasSame(dayDate, 'day'),
                        })

                        return (<th className={dayHeaderClassName} key={dayIndex}>{dayDate.day}</th>);
                    })}
                </tr>

                {_.times(24, (hour) => {
                    return (<tr className="row" key={`row-${hour}`}>
                        <th className="hour-header">{hour}</th>
                        {_.map(Info.weekdays(), (day, dayIndex) => {
                            const dayDate = firstDayWeek.plus({days: dayIndex});
                            const hourDate = dayDate.set({hour});

                            return (<td className="hour-cell" key={dayIndex}>{hourDate.toLocaleString({
                                hour: 'numeric', minute: '2-digit'
                            })}</td>);
                        })}
                    </tr>);
                })}
                </tbody>


            </table>
        <div className="event"/>

        </div>);
}
export default CalendarTable;