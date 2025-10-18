import { api } from '../../../provider/apiProvider';

export const listarHorarios = () => {
    const requestResponse = api.get('/horario-preferencia', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    })
        .then((response) => { return response.data; });

    return requestResponse;
};

export const upsertHorario = ({ horario }) => {
    const payload = {
        horarioAulaFim: horario.horarioAulaFim,
        horarioAulaInicio: horario.horarioAulaInicio,
        dataInclusao: null
    };

    const requestResponse = api.post('/horario-preferencia', payload, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    })
        .then((response) => { return response; });

    return requestResponse;
};

export const removerHorario = ({ id }) => {
    const requestResponse =
        api.delete(`/horario-preferencia/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => { return response; });

    return requestResponse;;
};

export const listarValorMensalidade = () => {
    const requestResponse =
        api.get('/mensalidades/valor-atual', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => { return response.data; });

    return requestResponse;
};

export const alterarValorMensalidade = ({ mensalidade }) => {
    const requestResponse =
        api.post('/mensalidades/valor-mensalidade', {
            valor: mensalidade.data,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => { return response; });

    return requestResponse;
};