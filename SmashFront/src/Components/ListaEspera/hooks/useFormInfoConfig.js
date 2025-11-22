import { useMemo } from 'react';
import dayjs from 'dayjs';

import { TOOLTIP_MESSAGES } from '../../../constants/tooltips';
import { formatarTelefone } from '../../FichaInscricao/utils/validacaoForm';
import { getHorarios } from '../utils/apiRequest';

export const useFormInfoConfig = ({
    userInfo,
    setUserInfo,
    operacao,
    errorDate,
}) => {
    const formConfig = useMemo(() => ({
        campos: [
            {
                key: 'nome',
                label: 'Nome do Interessado',
                disabled: operacao === 'visualizacao',
                required: true,
                value: userInfo.nome,
                type: 'text',
                onChange: (e) => setUserInfo({ ...userInfo, nome: e.target.value }),
            },
            {
                key: 'nomeSocial',
                label: 'Nome Social',
                toolTip: TOOLTIP_MESSAGES.nomeSocial,
                disabled: operacao === 'visualizacao',
                value: userInfo.nomeSocial,
                type: 'text',
                onChange: (e) => setUserInfo({ ...userInfo, nomeSocial: e.target.value })
            },
            {
                key: 'telefone',
                label: 'Telefone',
                disabled: operacao === 'visualizacao',
                value: formatarTelefone(userInfo.telefone),
                type: 'text',
                onChange: (e) => {
                    const numeros = e.target.value.replace(/\D/g, '').slice(0, 11);
                    setUserInfo({ ...userInfo, telefone: numeros });
                },
                placeholder: operacao === 'cadastro' ? '(00) 00000-0000' : ''
            },
            {
                key: 'dataNascimento',
                label: 'Data de Nascimento',
                disabled: operacao === 'visualizacao',
                required: operacao !== 'visualizacao',
                type: 'date',
                value: userInfo.dataNascimento
                    ? dayjs(userInfo.dataNascimento)
                    : null,
                onChange: (newValue) => setUserInfo({ ...userInfo, dataNascimento: dayjs(newValue).format('YYYY-MM-DD') }),
                onError: (reason) => { errorDate.current = !!reason; }
            },
            {
                key: 'genero',
                label: 'Gênero',
                disabled: operacao === 'visualizacao',
                value: userInfo.genero,
                type: 'text',
                onChange: (e) => setUserInfo({ ...userInfo, genero: e.target.value })
            },
            {
                key: 'email',
                label: 'Email',
                required: true,
                disabled: operacao === 'visualizacao',
                value: userInfo.email,
                type: 'text',
                onChange: (e) => setUserInfo({ ...userInfo, email: e.target.value })
            },
            {
                key: 'celular',
                label: 'Celular',
                disabled: operacao === 'visualizacao',
                value: formatarTelefone(userInfo.celular),
                type: 'text',
                onChange: (e) => {
                    const numeros = e.target.value.replace(/\D/g, '').slice(0, 11);
                    setUserInfo({ ...userInfo, celular: numeros });
                },
                placeholder: operacao === 'cadastro' ? '(00) 00000-0000' : ''
            },
            {
                key: 'dataInteresse',
                label: 'Data de Contato',
                required: true,
                disabled: operacao === 'visualizacao',
                value: dayjs(userInfo.dataInteresse),
                maxDateTime: dayjs(),
                type: 'datetime',
                onChange: (e) => setUserInfo({ ...userInfo, dataInteresse: e ? e.format('YYYY-MM-DDTHH:mm') : null })
            },
            {
                key: 'horarioPref',
                label: 'Horário Preferido',
                type: 'autocomplete',
                required: true,
                disabled: operacao === 'visualizacao',
                value: userInfo.horarioPref,
                fetchOptions: async () => {
                    const response = await getHorarios();
                    return response.map((r) => ({
                        label: `${dayjs(`2000-05-10 ${r.horarioAulaInicio}`).format('HH:mm')} - ${dayjs(`2000-05-10 ${r.horarioAulaFim}`).format('HH:mm')}`,
                        id: r.id
                    }));
                },
                onChange: (_, val) => setUserInfo({ ...userInfo, horarioPref: val })
            }
        ]
    }), [userInfo, operacao, setUserInfo]);

    return formConfig;
};

export default useFormInfoConfig;