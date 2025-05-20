import dayjs from "dayjs";

export const checkDateFilled = (date, setMaiorIdade) => {
    if (String(dayjs(date)?.year()).length !== 4) {
        setMaiorIdade(true);
        return false;
    };
    if (!dayjs(date).isValid()) {
        setMaiorIdade(true);
        return false;
    };

    const dateString = date?.format("DD-MM-YYYY");
    const regex = /^\d{2}-\d{2}-\d{4}/;
    return regex.test(dateString);
};
