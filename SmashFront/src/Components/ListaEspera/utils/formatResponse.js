import { dateFormater } from '../../../utils/dateFormaterService';

const formatHorarioPreferencia = (horarioPreferencia) => {
    if (horarioPreferencia && typeof horarioPreferencia === 'object') {
        const start = horarioPreferencia.horarioAulaInicio ? horarioPreferencia.horarioAulaInicio.slice(0, 5) : '';
        const end = horarioPreferencia.horarioAulaFim ? horarioPreferencia.horarioAulaFim.slice(0, 5) : '';
        return `${start} - ${end}`;
    }
    return horarioPreferencia || '';
};

export const formatResponse = (response) => {
    return response.data.map((item) => ({
        ...item,
        dataInteresse: item.dataInteresse ? dateFormater(item.dataInteresse) : null,
        horarioPreferencia: formatHorarioPreferencia(item.horarioPreferencia)
    }));
};