import { dateFormater } from '../../../utils/dateFormaterService';

export const formatResponse = (data) => {
    const formattedData = data.map((aluno) => ({
        ...aluno,
        dataEnvioOriginal: aluno.dataEnvio,
        dataEnvio: aluno.dataEnvio ? dateFormater(aluno.dataEnvio) : null,
        valor: aluno?.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? null,
    }));

    return formattedData;
};