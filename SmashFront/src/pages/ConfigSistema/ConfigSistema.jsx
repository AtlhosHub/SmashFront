import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Switch,
    IconButton,
    Collapse,
    TextField,
    Paper,
    Divider,
    Autocomplete,
} from '@mui/material';
import { Add, Delete, ExpandLess, ExpandMore } from '@mui/icons-material';
import { DefaultBreadcrumb } from '../../Components/DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb';
import { DefaultButton } from '../../Components/DefaultComponents/DefaultButton/DefaultButton';
import { toasterMsg } from '../../utils/toasterService';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { treatEndHour, treatStartHour } from './utils/treatConfigDateTime';
import dayjs from 'dayjs';

export default function ConfigSistema() {
    const [modoEdicao, setModoEdicao] = useState(false);

    const [abertas, setAbertas] = useState({
        'Horário de Aulas': true,
        'Valor de Mensalidade': false,
    });

    const [dados, setDados] = useState({
        'Horário de Aulas': {
            data: [],
            key: 'diaHorario',
            type: 'multiple',
        },
        'Valor de Mensalidade': {
            data: null,
            key: 'valorMensalidade',
            type: 'single',
        }
    });

    useEffect(() => {
        const novoDados = {
            'Horário de Aulas': {
                data: [
                    { dia: 'Segunda', horaInic: treatStartHour('08:00 às 10:00'), horaFim: treatEndHour('08:00 às 10:00') },
                    { dia: 'Quarta', horaInic: treatStartHour('14:00 às 16:00'), horaFim: treatEndHour('14:00 às 16:00') }
                ],
                key: 'diaHorario',
                type: 'multiple',
            },
            'Valor de Mensalidade': {
                data: 250.00,
                key: 'valorMensalidade',
                type: 'single',
            }
        };

        setDados(novoDados);
    }, []);

    const toggleSecao = (secao) => {
        setAbertas((prev) => ({ ...prev, [secao]: !prev[secao] }));
    };

    const adicionarItem = (secao) => {
        const novoArray = [...dados[secao].data, ''];
        setDados({
            ...dados,
            [secao]: { ...dados[secao], data: novoArray },
        });
    };

    const removerItem = (secao, index) => {
        const novoArray = [...dados[secao].data];
        novoArray.splice(index, 1);
        setDados({
            ...dados,
            [secao]: { ...dados[secao], data: novoArray },
        });
    };

    const rotas = [
        { route: "/listaEspera", description: "Lista de Espera" }
    ];

    const handleSaveConfig = () => {
        toasterMsg("success", "Configurações salvas com sucesso!");
        setModoEdicao(false);
    }

    return (
        <Box>
            <DefaultBreadcrumb rotas={rotas} />
            <Box sx={{ pt: "2rem", px: "4rem" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Typography>Visualização</Typography>
                        <Switch
                            checked={modoEdicao}
                            onChange={(e) => setModoEdicao(e.target.checked)}
                        />
                        <Typography>Edição</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {modoEdicao && <DefaultButton variant="outlined" onClick={() => setModoEdicao(false)} label={"Cancelar"} />}
                        {modoEdicao && <DefaultButton variant="contained" onClick={handleSaveConfig} label={"Salvar"} />}
                    </Box>
                </Box>

                {Object.entries(dados).map(([secao, secaoData]) => (
                    <Paper key={secao} variant="outlined" sx={{ mb: 2 }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            px={2}
                            py={1.5}
                            onClick={() => toggleSecao(secao)}
                            sx={{ cursor: 'pointer', backgroundColor: '#f9f9f9' }}
                        >
                            <Typography variant="subtitle1">{secao.toUpperCase()}</Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                                {modoEdicao && secaoData.type === 'multiple' && (
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            adicionarItem(secao);
                                        }}
                                    >
                                        <Add fontSize="small" />
                                    </IconButton>
                                )}
                                {abertas[secao] ? <ExpandLess /> : <ExpandMore />}
                            </Box>
                        </Box>

                        <Collapse in={abertas[secao]}>
                            <Divider />
                            <Box p={2} display="flex" flexDirection="column" gap={2}>
                                {secaoData.type === 'multiple' ? (
                                    secaoData.data.map((valor, index) => (
                                        <Box
                                            key={index}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            gap={2}
                                        >
                                            {modoEdicao && secao === 'Horário de Aulas' ? (
                                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                    <Autocomplete
                                                        value={valor.dia}
                                                        renderInput={(p) => <TextField sx={{ width: "10rem" }} {...p} label="Dia da Semana" />}
                                                        options={['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']}
                                                        size="small"
                                                    />
                                                    -
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <TimePicker
                                                            label="Escolha a Hora"
                                                            slotProps={{
                                                                textField: {
                                                                    InputProps: {
                                                                        endAdornment: null,
                                                                    },
                                                                    size: "small",
                                                                },
                                                            }}
                                                            ampm={false}
                                                            value={dayjs(valor.horaInic, "HH:mm")}
                                                        />
                                                        às
                                                        <TimePicker
                                                            label="Escolha a Hora"
                                                            slotProps={{
                                                                textField: {
                                                                    InputProps: {
                                                                        endAdornment: null,
                                                                    },
                                                                    size: "small",
                                                                },
                                                            }}
                                                            ampm={false}
                                                            value={dayjs(valor.horaFim, "HH:mm")}
                                                        />
                                                    </LocalizationProvider>
                                                </Box>
                                            ) : (
                                                <Typography>{valor.dia} - {valor.horaInic} às {valor.horaFim}</Typography>
                                            )}

                                            {modoEdicao && (
                                                <Box>
                                                    <IconButton onClick={() => removerItem(secao, index)}>
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            )}
                                        </Box>
                                    ))
                                ) : (
                                    <TextField
                                        fullWidth
                                        type="number"
                                        value={secaoData.data}
                                        disabled={!modoEdicao}
                                        onChange={(e) => atualizarValorUnico(secao, parseFloat(e.target.value))}
                                    />
                                )}
                            </Box>
                        </Collapse>
                    </Paper>
                ))}
            </Box>
            <ToastContainer />
        </Box>
    );
}
