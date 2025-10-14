import { api } from '../../../provider/apiProvider';

export const postUsuario = (userInfo) => {
    api.post('/usuarios', userInfo, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
    });

    return true;
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
    });

    return request.data;
};