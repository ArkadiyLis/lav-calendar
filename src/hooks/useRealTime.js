import {useEffect, useState} from "react";
import {DateTime} from "luxon";
import {DEFAULT_TIME_FORMAT, ONE_SECOND_IN_MILLISECONDS} from "../utils/constants";
import _ from "lodash";

let mounted = false;
const useRealTime = (format = DEFAULT_TIME_FORMAT) => {
    const [nowDate, setNowDate] = useState(DateTime.now());

    useEffect(() => {
        if (!mounted) {
            mounted = true;
            setInterval(() => {
                setNowDate(DateTime.now());
            }, ONE_SECOND_IN_MILLISECONDS);
        }
    });

    return [_.lowerCase(nowDate.toFormat(format)), nowDate];
};

export default useRealTime;