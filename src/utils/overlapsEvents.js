import {Interval} from "luxon";
import _ from "lodash";

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

export default overlapsEvents;