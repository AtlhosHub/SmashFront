import dayjs from "dayjs"

export const getMonthRange = () => {
    const todaysDate = dayjs(); 

    const start = todaysDate.startOf("month");
    const end = todaysDate.endOf("month");

    return [start, end];
}