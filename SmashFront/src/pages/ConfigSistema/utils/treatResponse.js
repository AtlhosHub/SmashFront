import dayjs from "dayjs"

export const treatHourResponse = (hours) => {
    let treatedHourList = []

    hours.map((hour) => {
        treatedHourList.push({
            id: hour.id,
            horarioAulaFim: dayjs(`01/01/2000 ${hour.horarioAulaFim}`, "DD/MM/YYYY HH:mm:ss").format("HH:mm"),
            horarioAulaInicio: dayjs(`01/01/2000 ${hour.horarioAulaInicio}`, "DD/MM/YYYY HH:mm:ss").format("HH:mm")
        })
    })

    return treatedHourList;
}

export const treatValueResponse = (values) => {
    let treatedValuesList = [];
    
    values.map((value) => {
        treatedValuesList.push({
            id: value.id,
            data: value.valor
        })
    })

    return treatedValuesList;
}