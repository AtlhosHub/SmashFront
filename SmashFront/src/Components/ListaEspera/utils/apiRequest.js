import { api } from '../../../provider/apiProvider';

export const getListaEspera = async (filtro) => {
    const request = api.post('/lista-espera', filtro, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        },
    })
        .then((response) => { return response.data; });

    return request;
};

export const getDadosInteressado = async (id) => {
    const request = api.get(`/lista-espera/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    })
        .then((response) => { return response.data; });

    return request;
};

export const getHorarios = async () => {
    const request =
        api.get('/horario-preferencia', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => { return response.data; });

    return request;
};

export const deleteInteressado = async (id) => {
    const request = api.delete(`lista-espera/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    });

    return request;
};

export const editInteressado = async (id, userInfo) => {
    const request = api.put(`/lista-espera/${id}`, userInfo, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    });

    return request;
};

export const savePessoaInteressada = async (payload) => {
    const request = api.post('/lista-espera/adicionar', payload, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    });

    return request;
};