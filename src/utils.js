
import moment from "moment";

//returns name of the month
export const getCurrentMonthName = (o) => {
    return moment(o)
        .startOf("month")
        .format('MMMM');
};

//returns year
export const getCurrentYear = (o) => {
    return moment(o)
        .year()
};

//returns index of the first day of the current month (1-monday ... 7-sunday)
export const getFirstDayOfMonth = (o) => {
    return moment(o)
        .startOf("month")
        .isoWeekday();
};

//returns index of the last day of the current month (1-monday ... 7-sunday)
export const getLastDayOfMonth = (o) => {
    return moment(o)
        .endOf("month")
        .isoWeekday();
};

//returns number of days in the current month
export const getNumOfDaysInMonth = (o) => {
    return o.daysInMonth();
};

//returns number of the month
export const getCurrentMonthNum = (o) => {
    return moment(o)
        .startOf("month")
        .format('MM');
};

//adds zero in front of the days that have only one digit (for example, 1 -> 01)
export const formatDay = (d) => {
    let len = d.toString().length;
    if (len === 1) {
        return `0${d}`
    }
    else {
        return d
    }
};