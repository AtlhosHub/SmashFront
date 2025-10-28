import dayjs from 'dayjs';
import { dateIsoFormatter } from '../../../utils/dateFormaterService';

export const formatEditPayload = (data, maiorIdade) => {
    const formattedData = {
        ...data,
        nome: { value: data.nome },
        nomeSocial: { value: data.nomeSocial },
        celular: { value: data.celular },
        telefone: { value: data.telefone },
        email: { value: data.email },
        dataNascimento: { value: data.dataNascimento },
        cpf: { value: data.cpf },
        dataInclusao: { value: data.dataInclusao },
        usuarioInclusao: { id: sessionStorage.getItem('idUsuario') }
    };

    if (maiorIdade) {
        formattedData.responsaveis = [];
    }

    return formattedData;
};

export const formatAddPayload = (data, maiorIdade) => {
    const formattedData = {
        ...data,
        dataInclusao: dateIsoFormatter(dayjs().toISOString()),
        usuarioInclusao: { id: sessionStorage.getItem('idUsuario') }
    };

    if (maiorIdade) {
        formattedData.responsaveis = [];
    };

    return formattedData;
};