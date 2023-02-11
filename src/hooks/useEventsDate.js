import {Interval} from "luxon";
import {
    DEFAULT_END_ACTIVE_DAY,
    DEFAULT_END_ACTIVE_HOUR,
    DEFAULT_START_ACTIVE_DAY,
    DEFAULT_START_ACTIVE_HOUR
} from "../utils/constants";

const useEventsDate = (selectedDate) => {
    const currentDayDate = selectedDate.set({minutes: 0, seconds: 0, millisecond: 0});
    const startViewDate = currentDayDate.startOf('day');
    const endViewDate = currentDayDate.endOf('day');
    const currentDayInterval = Interval.fromDateTimes(startViewDate, endViewDate);

    const startActiveDate = currentDayDate.set({hour: DEFAULT_START_ACTIVE_HOUR});
    const endActiveDate = currentDayDate.set({hour: DEFAULT_END_ACTIVE_HOUR});
    const activeDateInterval = Interval.fromDateTimes(startActiveDate, endActiveDate);

    const startWeekDate = currentDayDate.startOf('week');
    const endWeekDate = currentDayDate.endOf('week');
    const currentWeekInterval = Interval.fromDateTimes(startWeekDate, endWeekDate);

    const startActiveWeekdayDate = currentDayDate.set({weekday: DEFAULT_START_ACTIVE_DAY})
    const endActiveWeekdayDate = currentDayDate.set({weekday: DEFAULT_END_ACTIVE_DAY})
    const activeWeekdayInterval = Interval.fromDateTimes(startActiveWeekdayDate, endActiveWeekdayDate)

    return {
        currentDayDate,
        startViewDate,
        endViewDate,
        startWeekDate,
        endWeekDate,
        currentDayInterval,
        activeDateInterval,
        currentWeekInterval,

        startActiveWeekdayDate,
        endActiveWeekdayDate,
        activeWeekdayInterval
    };
}
export default useEventsDate;