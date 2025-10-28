import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { DefaultBreadcrumb } from '../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb';
import { DefaultButton } from '../DefaultComponents/DefaultButton';
import { SecaoConfig } from './Components/SecaoConfig';
import {
    Box,
    Typography,
    Switch
} from '@mui/material';

import { toasterMsg } from '../../utils/toasterService';
import {
    upsertHorario,
    alterarValorMensalidade,
    listarHorarios,
    listarValorMensalidade,
    removerHorario,
    editHorario,
} from './utils/apiRequest';
import { treatHourResponse, treatValueResponse } from './utils/treatResponse';
import { diffConfig } from './utils/diffConfig';

export const ConfigSistema = () => {
    const [modoEdicao, setModoEdicao] = useState(false);
    const [errorOnInput, setErrorOnInput] = useState(false);

    const [abertas, setAbertas] = useState({
        horarioAulas: true,
        valorMensalidade: false,
    });
    const [dados, setDados] = useState({
        horarioAulas: {
            description: 'Horário de Aulas',
            type: 'multiple',
            data: [],
        },
        valorMensalidade: {
            description: 'Valor de Mensalidade',
            type: 'single',
            data: [{ valor: null }],
        }
    });
    const [dadosTemporarios, setDadosTemporarios] = useState([]);

    const rotas = [{ route: '/listaEspera', description: 'Lista de Espera' }];

    const fetchDadosConfig = async () => {
        const horarios = await listarHorarios();
        const valor = await listarValorMensalidade();

        const treatedHour = treatHourResponse(horarios);
        const treatedValue = treatValueResponse(valor);

        setDados(prev => ({
            ...prev,
            horarioAulas: {
                ...prev.horarioAulas,
                data: treatedHour,
            },
            valorMensalidade: {
                ...prev.valorMensalidade,
                data: treatedValue
            }
        }));
    };

    const handleSaveConfig = async () => {
        const diff = diffConfig(dados, dadosTemporarios);

        try {
            const promises = [];

            for (const secao of Object.keys(diff)) {
                for (const item of diff[secao].novos) {
                    if (secao === 'horarioAulas') {
                        promises.push(upsertHorario({ horario: item }));
                    }
                }
                for (const item of diff[secao].alterados) {
                    if (secao === 'horarioAulas') {
                        promises.push(editHorario({ horario: item }));
                    } else if (secao === 'valorMensalidade') {
                        promises.push(alterarValorMensalidade({ mensalidade: item }));
                    }
                }
                for (const item of diff[secao].removidos) {
                    if (secao === 'horarioAulas') {
                        promises.push(removerHorario({ id: item.id }));
                    }
                }
            }

            Promise.all(promises)
                .then(() => {
                    toasterMsg('success', 'Configurações salvas com sucesso!');
                    setModoEdicao(false);
                    fetchDadosConfig();
                })
                .catch((error) => {
                    toasterMsg('error', error.response.data.message || 'Erro ao salvar configurações');
                });

        } catch (error) {
            toasterMsg('error', error?.data || 'Erro inesperado');
        }
    };

    const handleCancel = () => {
        setDadosTemporarios(structuredClone(dados));
        setModoEdicao(false);
    };

    useEffect(() => {
        fetchDadosConfig();
    }, []);

    useEffect(() => {
        setDadosTemporarios(structuredClone(dados));
    }, [dados]);

    return (
        <Box>
            <DefaultBreadcrumb rotas={rotas} />
            <Box sx={{ pt: '2rem', px: '4rem' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Typography>Visualização</Typography>
                        <Switch checked={modoEdicao} onChange={(e) => setModoEdicao(e.target.checked)} />
                        <Typography>Edição</Typography>
                    </Box>
                    {modoEdicao && (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <DefaultButton variant="outlined" onClick={handleCancel} label="Cancelar" />
                            <DefaultButton variant="contained" onClick={handleSaveConfig} disabled={errorOnInput} label="Salvar" />
                        </Box>
                    )}
                </Box>

                {Object.entries(dadosTemporarios).map(([secao, config]) => (
                    <SecaoConfig
                        key={secao}
                        secao={secao}
                        aberta={abertas[secao]}
                        toggleSecao={() => setAbertas((prev) => ({ ...prev, [secao]: !prev[secao] }))}
                        config={config}
                        modoEdicao={modoEdicao}
                        dadosTemporarios={dadosTemporarios}
                        setDadosTemporarios={setDadosTemporarios}
                        setError={setErrorOnInput}
                    />
                ))}
            </Box>
            <ToastContainer />
        </Box>
    );
};