import { useMemo } from 'react';
import dayjs from 'dayjs';

import { TOOLTIP_MESSAGES } from '../../../constants/tooltips';
import { formatarTelefone } from '../../FichaInscricao/utils/validacaoForm';

export const useFormInfoConfig = ({
    userInfo,
    setUserInfo,
    operacao,
    mostrarSenha,
    setMostrarSenha,
    senha,
    setSenha,
    mostrarConfirmarSenha,
    setMostrarConfirmarSenha,
    confirmarSenha,
    setConfirmarSenha,
    erroConfirmarSenha,
    setErroConfirmarSenha
}) => {
    const formConfig = useMemo(() => ({
        campos: [
            {
                key: 'nome',
                label: 'Nome do Usuário',
                required: true,
                type: 'text',
                disabled: operacao === 'visualizacao',
                value: userInfo.nome,
                onChange: (e) => setUserInfo({ ...userInfo, nome: e.target.value })
            },
            {
                key: 'genero',
                label: 'Gênero',
                type: 'text',
                disabled: operacao === 'visualizacao',
                value: userInfo.genero,
                onChange: (e) => setUserInfo({ ...userInfo, genero: e.target.value })
            },
            {
                key: 'cargo',
                label: 'Cargo',
                type: 'text',
                disabled: operacao === 'visualizacao',
                value: userInfo.cargo,
                onChange: (e) => setUserInfo({ ...userInfo, cargo: e.target.value })
            },
            {
                key: 'nomeSocial',
                label: 'Nome Social',
                type: 'text',
                toolTip: TOOLTIP_MESSAGES.nomeSocial,
                disabled: operacao === 'visualizacao',
                value: userInfo.nomeSocial,
                onChange: (e) => setUserInfo({ ...userInfo, nomeSocial: e.target.value })
            },
            {
                key: 'dataNascimento',
                label: 'Data de Nascimento',
                required: true,
                type: 'date',
                disabled: operacao === 'visualizacao',
                value: userInfo.dataNascimento ? dayjs(userInfo.dataNascimento) : null,
                onChange: (newValue) => setUserInfo({ ...userInfo, dataNascimento: newValue }),
                slotProps: { textField: { size: 'small', placeholder: 'DD/MM/AAAA' } }
            },
            {
                key: 'senha',
                label: 'Senha',
                required: true,
                type: 'password',
                value: senha,
                showToggle: true,
                onChange: (e) => {
                    setSenha(e.target.value);

                    if (confirmarSenha) {
                        setErroConfirmarSenha(e.target.value !== confirmarSenha);
                    }
                },
                show: operacao === 'cadastro',
            },
            {
                key: 'email',
                label: 'Email',
                required: true,
                type: 'text',
                disabled: operacao === 'visualizacao',
                value: userInfo.email,
                onChange: (e) => setUserInfo({ ...userInfo, email: e.target.value })
            },
            {
                key: 'celular',
                label: 'Celular',
                type: 'text',
                disabled: operacao === 'visualizacao',
                value: formatarTelefone(userInfo.celular),
                onChange: (e) => setUserInfo({ ...userInfo, celular: e.target.value }),
                placeholder: '(00) 00000-0000'
            },
            {
                key: 'confirmarSenha',
                label: 'Confirmar senha',
                type: 'password',
                value: confirmarSenha,
                showToggle: true,
                onChange: (e) => {
                    const value = e.target.value;

                    setConfirmarSenha(value);
                    setErroConfirmarSenha(value != senha);
                },
                error: erroConfirmarSenha,
                helperText: erroConfirmarSenha ? 'As senhas não conferem' : '',
                show: operacao === 'cadastro',
            },
        ]
    }),
        [
            operacao,
            userInfo,
            mostrarSenha,
            senha,
            mostrarConfirmarSenha,
            confirmarSenha,
            erroConfirmarSenha,
            setUserInfo,
            setSenha,
            setMostrarSenha,
            setConfirmarSenha,
            setMostrarConfirmarSenha
        ]
    );

    return formConfig;
};