export const normalizeData = (rawData) => {
    const normalizedData = { ...rawData };
    normalizedData.horarioAulas.data.map((item) => {
        item.horarioAulaInicio;
        item.horarioAulaFim;
    });
    return normalizedData;
};
