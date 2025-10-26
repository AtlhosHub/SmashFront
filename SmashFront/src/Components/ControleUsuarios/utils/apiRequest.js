import { api } from '../../../provider/apiProvider';

export const postUsuario = (userInfo) => {
    const request = api.post('/usuarios', userInfo, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    });

    return request;
};

export const deleteUsuario = (idUsuario) => {
    api.delete(`usuarios/${idUsuario}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    });

    return true;
};

export const putUsuario = (idUsuario, userInfo) => {
    api.put(`usuarios/${idUsuario}`, userInfo, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    });

    return true;
};

export const getUsuarioData = (idUsuario) => {
    const request = api.get(`/usuarios/${idUsuario}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    })
        .then((response) => { return response.data; });

    return request;
};

export const getAllUsuarios = (payload) => {
    const request =
        api.post('/usuarios/filtro', payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => { return response.data; });

    return request;
};