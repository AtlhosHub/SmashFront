import { dateFormater } from '../../../utils/dateFormaterService';

export const formatResponse = (data) => {
    const formattedData = data.map((aluno) => ({
        ...aluno,
        dataEnvioOriginal: aluno.dataEnvio,
        dataEnvio: aluno.dataEnvio ? dateFormater(aluno.dataEnvio) : null,
        valor: aluno.valor != null
            ? aluno.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : null,
        valorColor: aluno.desconto ? '#286DA8' : 'inherit'
    }));

    return formattedData;
};