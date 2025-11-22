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
    } else {
        formattedData.responsaveis = [{
            nome: { value: data.responsaveis[0]?.nome },
            nomeSocial: { value: data.responsaveis[0]?.nomeSocial },
            cpf: { value: data.responsaveis[0]?.cpf },
            rg: data.responsaveis[0]?.rg,
            profissao: data.responsaveis[0]?.profissao,
            genero: data.responsaveis[0]?.genero,
            telefone: { value: data.responsaveis[0]?.telefone },
            celular: { value: data.responsaveis[0]?.celular },
            email: { value: data.responsaveis[0]?.email }
        }];
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
    } else {
        formattedData.responsaveis = [{
            nome: { value: data.responsaveis[0]?.nome },
            nomeSocial: { value: data.responsaveis[0]?.nomeSocial },
            cpf: { value: data.responsaveis[0]?.cpf },
            rg: data.responsaveis[0]?.rg,
            profissao: data.responsaveis[0]?.profissao,
            genero: data.responsaveis[0]?.genero,
            telefone: { value: data.responsaveis[0]?.telefone },
            celular: { value: data.responsaveis[0]?.celular },
            email: { value: data.responsaveis[0]?.email }
        }];
    };

    return formattedData;
};