import {Interval} from "luxon";
import _ from "lodash";
import overlapsEvents from "../../utils/overlapsEvents";
import useEventsDate from "../../hooks/useEventsDate";
import {getColorHexByIndex} from "../../utils";
import {DAY_CELL_HEIGHT, DAY_CELL_WIDTH} from "../../utils/constants";

const Events = ({events, selectedDate}) => {
    const {
        startViewDate,
        startWeekDate,
        currentWeekInterval
    } = useEventsDate(selectedDate);

    const eventsRender = () => {
        const filteredEvents = _.filter(events, (event) => {
            return currentWeekInterval.overlaps(Interval.fromDateTimes(event.start, event.end));
        });

        return _.map(filteredEvents, (event, eventIndex) => {
            const hourIndex = event.start.hour - startViewDate.hour;
            const dayIndex = event.start.day - startWeekDate.day;
            const eventInterval = Interval.fromDateTimes(event.start, event.end);

            const overlaps = overlapsEvents(event, filteredEvents);
            const eventOverlapIndex = _.indexOf(overlaps, eventInterval.toISO());

            const eventWidth = (DAY_CELL_WIDTH / overlaps.length);
            const eventHeight = DAY_CELL_HEIGHT * Interval.fromDateTimes(event.start, event.end).length('hours');
            const eventTop = DAY_CELL_HEIGHT * hourIndex;
            const eventLeft = (eventWidth * eventOverlapIndex) + (DAY_CELL_WIDTH * dayIndex);

            const renderHour = event.start.toLocaleString({hour: 'numeric', minute: '2-digit'});
            const eventTitle = `${event.name}\n${event.description}`;

            return (<div className="events-table-event-container" key={eventIndex} title={eventTitle} style={{
                width: eventWidth, height: eventHeight, top: eventTop, left: eventLeft
            }}>
                <div className="events-table-event" key={eventIndex} style={{backgroundColor: getColorHexByIndex(eventIndex)}}>
                    {/*{renderHour}*/}
                </div>
            </div>);
        })
    };

    return (
        <div className="events-table-events">
            {eventsRender()}
        </div>
    );
};
export default Events;