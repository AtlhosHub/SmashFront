import { api } from '../../../provider/apiProvider';

export const getNumAlunos = async () => {
    const request = await api.get('/alunos/ativos', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    })
    .then(response => response.data);

    return request;
};

export const getNumDesconto = async () => {
    const request = await api.get('/mensalidades/qtd-descontos', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    }).then(response => response.data);

    return request;
};

export const getAlunosAniversariantes = async () => {
    const request = await api.get('/alunos/aniversariantes', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    }).then(response => response.data);

    return request;
};

export const getConteudoGrafico = async () => {
    const request = await api.get('/mensalidades/grafico', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    }).then(response => response.data);

    return request;
};