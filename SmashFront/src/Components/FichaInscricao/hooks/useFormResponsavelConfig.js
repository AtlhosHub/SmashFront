import { useMemo } from 'react';
import { TOOLTIP_MESSAGES } from '../../../constants/tooltips';
// import { formatarTelefone } from '../../utils/validacaoForm';

export const useFormResponsavelConfig = ({
    userInfo,
    setUserInfo,
    operacao,
    cpfUser,
    setCpfUser,
    formatCPF
}) => {
    const formConfig = useMemo(() => ({
        campos: [
            {
                key: 'nome',
                label: 'Nome',
                required: true,
                disabled: operacao === 'visualizacao',
                value: userInfo.responsaveis[0].nome,
                onChange: (e) =>
                    setUserInfo({
                        ...userInfo,
                        responsaveis: [{ ...userInfo.responsaveis[0], nome: e.target.value }],
                    }),
            },
            {
                key: 'rg',
                label: 'RG',
                disabled: operacao === 'visualizacao',
                value: userInfo.responsaveis[0].rg,
                onChange: (e) =>
                    setUserInfo({
                        ...userInfo,
                        responsaveis: [{ ...userInfo.responsaveis[0], rg: e.target.value }],
                    }),
            },
            {
                key: 'cpf',
                label: 'CPF',
                required: true,
                disabled: operacao === 'visualizacao',
                value: cpfUser,
                onChange: (e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    setCpfUser(formatCPF(raw));
                    setUserInfo({
                        ...userInfo,
                        responsaveis: [{ ...userInfo.responsaveis[0], cpf: raw }],
                    });
                },
            },
            {
                key: 'nomeSocial',
                label: 'Nome Social',
                disabled: operacao === 'visualizacao',
                tooltip: TOOLTIP_MESSAGES.nomeSocial,
                value: userInfo.responsaveis[0].nomeSocial,
                onChange: (e) =>
                    setUserInfo({
                        ...userInfo,
                        responsaveis: [{ ...userInfo.responsaveis[0], nomeSocial: e.target.value }],
                    }),
            },
            {
                key: 'profissao',
                label: 'Profissão',
                disabled: operacao === 'visualizacao',
                value: userInfo.responsaveis[0].profissao,
                onChange: (e) =>
                    setUserInfo({
                        ...userInfo,
                        responsaveis: [{ ...userInfo.responsaveis[0], profissao: e.target.value }],
                    }),
            },
            {
                key: 'genero',
                label: 'Gênero',
                disabled: operacao === 'visualizacao',
                value: userInfo.responsaveis[0].genero,
                onChange: (e) =>
                    setUserInfo({
                        ...userInfo,
                        responsaveis: [{ ...userInfo.responsaveis[0], genero: e.target.value }],
                    }),
            },
            {
                key: 'email',
                label: 'Email',
                required: true,
                disabled: operacao === 'visualizacao',
                value: userInfo.responsaveis[0].email,
                onChange: (e) =>
                    setUserInfo({
                        ...userInfo,
                        responsaveis: [{ ...userInfo.responsaveis[0], email: e.target.value }],
                    }),
            },
            {
                key: 'telefone',
                label: 'Telefone',
                disabled: operacao === 'visualizacao',
                placeholder: operacao === 'cadastro' ? '(00) 00000-0000' : '',
                value: userInfo.responsaveis[0].telefone,
                onChange: (e) =>
                    setUserInfo({
                        ...userInfo,
                        responsaveis: [{ ...userInfo.responsaveis[0], telefone: e.target.value }],
                    }),
            },
            {
                key: 'celular',
                label: 'Celular',
                disabled: operacao === 'visualizacao',
                placeholder: operacao === 'cadastro' ? '(00) 00000-0000' : '',
                value: userInfo.responsaveis[0].celular,
                onChange: (e) =>
                    setUserInfo({
                        ...userInfo,
                        responsaveis: [{ ...userInfo.responsaveis[0], celular: e.target.value }],
                    }),
            },
        ],
        radios: [
            {
                key: 'autorizado',
                radioTitle: 'Autorização',
                toolTip: TOOLTIP_MESSAGES.autorizacao,
                value: userInfo.autorizado,
                onChange: (e) => setUserInfo({
                    ...userInfo,
                    autorizado: e.target.value === 'true'
                }),
                options: [
                    { value: 'true', label: 'Sim', disabled: operacao === 'visualizacao' },
                    { value: 'false', label: 'Não', disabled: operacao === 'visualizacao' }
                ]
            }
        ]
    }), [userInfo, operacao, cpfUser]);

    return formConfig;
};
