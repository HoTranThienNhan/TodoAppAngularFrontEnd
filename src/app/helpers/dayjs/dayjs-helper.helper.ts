import dayjs from "dayjs";

type Units = "day" | "week" | "quarter" | "month" | "year" | "hour" | "minute" | "second" | "millisecond";

export class DayjsHelper {
    static compareTwoDateTime = (date1: dayjs.Dayjs, date2: dayjs.Dayjs, unit: Units = "day"): number => {
        let date1Format: string = date1.format("YYYY-MM-DD");
        let date2Format: string = date2.format("YYYY-MM-DD");
        return dayjs(date1Format).diff(dayjs(date2Format), unit);
    }
}
