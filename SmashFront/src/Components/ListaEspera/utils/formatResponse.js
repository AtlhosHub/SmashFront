import dayjs from 'dayjs';
import { dateFormater } from '../../../utils/dateFormaterService';

const formatHorarioPreferencia = (horarioPreferencia) => {
    if (horarioPreferencia && typeof horarioPreferencia === 'object') {
        const start = horarioPreferencia.horarioAulaInicio ? horarioPreferencia.horarioAulaInicio.slice(0, 5) : '';
        const end = horarioPreferencia.horarioAulaFim ? horarioPreferencia.horarioAulaFim.slice(0, 5) : '';
        return `${start} - ${end}`;
    }
    return horarioPreferencia || '';
};

export const formatListResponse = (response) => {
    return response.map((item) => ({
        ...item,
        nome: item.nome.value,
        dataInteresse: item.dataInteresse ? dateFormater(item.dataInteresse.value) : null,
        horarioPreferencia: formatHorarioPreferencia(item.horarioPref)
    }));
};

export const formatFormResponse = (response) => {
    return {
        nome: response.nome.value,
        nomeSocial: response.nomeSocial ? response.nomeSocial.value : null,
        genero: response.genero,
        email: response.email.value,
        celular: response.celular.value,
        telefone: response.telefone.value,
        dataNascimento: response.dataNascimento.value,
        dataInteresse: response.dataInteresse.value,
        horarioPref: {
            label: `${dayjs(`2000-05-10 ${response.horarioPref.horarioAulaInicio}`).format('HH:mm')} - ${dayjs(`2000-05-10 ${response.horarioPref.horarioAulaFim}`).format('HH:mm')}`,
            id: response.horarioPref.id
        }
    };
};