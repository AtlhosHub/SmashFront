import { api } from '../../../provider/apiProvider';

export const getListaEspera = async (filtro) => {
    const request = api.post('/lista-espera', filtro, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        },
    });

    return request.data;
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