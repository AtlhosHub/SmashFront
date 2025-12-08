import dayjs from 'dayjs';

export const checkDateFilled = (date, setMaiorIdade, dataPreenchida) => {
    if(!date) return false; 

    if (String(dayjs(date)?.year()).length !== 4 || !dayjs(date).isValid()) {
        setMaiorIdade(true);
        dataPreenchida.current = false;
        return false;
    };

    let dateString;

    if (dayjs.isDayjs(date)) {
        dateString = date.format('DD-MM-YYYY');
    } else {
        dateString = dayjs(date).format('DD-MM-YYYY');
    }

    const regex = /^\d{2}-\d{2}-\d{4}/;
    dataPreenchida.current = regex.test(dateString);
    return regex.test(dateString);
};
