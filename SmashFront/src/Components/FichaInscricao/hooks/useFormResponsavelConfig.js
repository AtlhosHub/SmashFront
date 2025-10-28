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
                type: 'text',
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
                type: 'text',
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
                type: 'text',
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
                type: 'text',
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
                type: 'text',
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
                type: 'text',
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
                type: 'text',
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
                type: 'text',
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
                type: 'text',
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
                type: 'text',
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
