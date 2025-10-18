import { api } from '../../../provider/apiProvider';

export const getAlunos = async (filtro) => {
    const request = api.post('/alunos/comprovantes', filtro, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    })
    .then((response) => { return response.data; });

    return request;
};