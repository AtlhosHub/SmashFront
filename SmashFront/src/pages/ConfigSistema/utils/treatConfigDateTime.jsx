export const treatDay = (day) => {
    const cuttedDay = day.match(/^\w+/);

    return cuttedDay;
}

export const normalizeData = (rawData) => {
    let normalizedData = {...rawData};
    normalizedData.horarioAulas.data.map((item) => {
        item['horaInic'] = getCuttedHour(item.hora, 0)
        item['horaFim'] = getCuttedHour(item.hora, 1)
    })
    return normalizedData;
}

export const getCuttedHour = (rawHour, position) => {
    const cutHour = rawHour.match(/\d{2}:\d{2}/g);

    if (!cutHour) {
        console.warn("Regex não bateu ou horário incompleto:", cutHour);
        return null;
    }

    return cutHour[position]; 
}
