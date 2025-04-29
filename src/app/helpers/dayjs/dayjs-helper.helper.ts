import dayjs from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

type Units = "day" | "week" | "quarter" | "month" | "year" | "hour" | "minute" | "second" | "millisecond";

export class DayjsHelper {
    static compareTwoDateTime = (date1: dayjs.Dayjs, date2: dayjs.Dayjs, unit: Units = "day"): number => {
        let date1Format: string = date1.format("YYYY-MM-DD");
        let date2Format: string = date2.format("YYYY-MM-DD");
        return dayjs(date1Format).diff(dayjs(date2Format), unit);
    }

    static isTomorrowDate = (thisDate: dayjs.Dayjs, tomorrowDate: dayjs.Dayjs): boolean => {
        return this.compareTwoDateTime(thisDate, tomorrowDate) === -1;
    }

    static isThisWeekDate = (thisDate: dayjs.Dayjs, thisWeekDate: dayjs.Dayjs): boolean => {
        return thisDate.week() === thisWeekDate.week();
    }
}
