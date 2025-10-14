import { api } from '../../../provider/apiProvider';

export const getAlunos = (filtro) => {
    const request = api.post('/alunos/comprovantes', filtro, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    });

    return request;
};