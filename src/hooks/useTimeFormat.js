import { format, fromUnixTime } from "date-fns";

export const useTimeFormat = (time, formatString) => {
    return format(time, formatString);
};

export const useUnixTime = unixTime => {
    return fromUnixTime(unixTime);
};