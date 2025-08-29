export const normalizeData = (rawData) => {
    let normalizedData = { ...rawData };
    normalizedData.horarioAulas.data.map((item) => {
        item.horarioAulaInicio
        item.horarioAulaFim
    })
    return normalizedData;
}
