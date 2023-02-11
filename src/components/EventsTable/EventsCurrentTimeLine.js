import {DateTime, Interval} from "luxon";
import {DAY_CELL_HEIGHT, DAY_CELL_WIDTH, ONE_MINUTE_IN_SECONDS} from "../../utils/constants";
import useEventsDate from "../../hooks/useEventsDate";

const EventsCurrentTimeLine = ({selectedDate}) => {
    const {
        currentDayDate
    } = useEventsDate(selectedDate);

    const currentTimeRender = () => {
        const currentTimeDate = DateTime.now();
        const startWeekDate = currentDayDate.startOf('week');
        const endWeekDate = currentDayDate.endOf('week');
        const currentWeekInterval = Interval.fromDateTimes(startWeekDate, endWeekDate);

        const isCurrentTimeShow = currentWeekInterval.overlaps(Interval.fromDateTimes(currentTimeDate.startOf('day'), currentTimeDate.endOf('day')));

        return isCurrentTimeShow && (<div className="current-time-container" style={{
            top: (DAY_CELL_HEIGHT * currentTimeDate.hour) + ((DAY_CELL_HEIGHT / ONE_MINUTE_IN_SECONDS) * currentTimeDate.minute),
            width: DAY_CELL_WIDTH * currentTimeDate.weekday,
            left: 0,
        }}>
            <div className="current-time-line"/>
            <div className="current-time-day"/>
        </div>)
    };

    return (
        <div className="events-table-current-time">
            {currentTimeRender()}
        </div>
    );
};
export default EventsCurrentTimeLine;