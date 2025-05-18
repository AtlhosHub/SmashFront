import dayjs from "dayjs";

export const treatDay = (day) => {
    const cuttedDay = day.match(/^\w+/);

    return cuttedDay;
}

export const treatStartHour = (rawHour) => {
    const cutHour = rawHour.match(/\d{2}:\d{2}/g);

    if (!cutHour || cutHour.length < 1) {
        console.warn("Regex não bateu ou horário incompleto:", cutHour);
        return null;
    }

    const treatedStartHour = dayjs(`2020-01-01 ${cutHour[0]}`, "YYYY-MM-DD HH:mm");

    if (!treatedStartHour.isValid()) {
        console.warn("Hora de início inválida:", treatedStartHour, cutHour[0]);
        return null;
    }

    console.log("Hora de início tratada:", treatedStartHour.format("HH:mm"));
    return treatedStartHour.format("HH:mm"); 
}


export const treatEndHour = (rawHour) => {
    const cutHour = rawHour.match(/\d{2}:\d{2}/g);

    if (!cutHour || cutHour.length < 2) {
        console.warn("Regex não bateu ou horário incompleto:", rawHour);
        return null;
    }

    const treatedEndHour = dayjs(`2020-01-01 ${cutHour[1]}`, "YYYY-MM-DD HH:mm");

    if (!treatedEndHour.isValid()) {
        console.warn("Hora de fim inválida:", cutHour[1]);
        return null;
    }

    console.log("Hora de fim tratada:", treatedEndHour.format("HH:mm"));
    return treatedEndHour.format("HH:mm");
};
