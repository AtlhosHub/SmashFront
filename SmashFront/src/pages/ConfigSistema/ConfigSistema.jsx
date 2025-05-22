import { useEffect, useState } from 'react';
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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { normalizeData } from './utils/treatConfigDateTime';
import dayjs from 'dayjs';
import ControleInputHora from './muitolegal';

export default function ConfigSistema() {
    const [modoEdicao, setModoEdicao] = useState(false);
    const [carregado, setCarregado] = useState(false);

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
            data: null,
        }
    });

    const [dadosTemporarios, setDadosTemporarios] = useState(() => structuredClone(dados));

    useEffect(() => {
        const novoDados = {
            horarioAulas: {
                description: 'Horário de Aulas',
                type: 'multiple',
                data: [
                    { dia: 'Segunda', hora: '08:00 às 10:00' },
                    { dia: 'Quarta', hora: '14:00 às 16:00' }
                ],
            },
            'valorMensalidade': {
                description: 'Valor de Mensalidade',
                type: 'single',
                data: 250.00,
            }
        };

        setDados(normalizeData(novoDados));
    }, [abertas, modoEdicao]);

    const toggleSecao = (secao) => {
        setAbertas((prev) => ({ ...prev, [secao]: !prev[secao] }));
    };

    const adicionarItem = (secao) => {
        const novoArray = [...dadosTemporarios[secao].data, ''];
        setDadosTemporarios({
            ...dadosTemporarios,
            [secao]: { ...dadosTemporarios[secao], data: novoArray },
        });
    };

    const removerItem = (secao, index) => {
        const novoArray = [...dadosTemporarios[secao].data];
        novoArray.splice(index, 1);
        setDadosTemporarios({
            ...dadosTemporarios,
            [secao]: { ...dadosTemporarios[secao], data: novoArray },
        });
    };

    const rotas = [
        { route: "/listaEspera", description: "Lista de Espera" }
    ];

    const handleSaveConfig = () => {
        setDados(dadosTemporarios);
        toasterMsg("success", "Configurações salvas com sucesso!");
        setModoEdicao(false);
    }

    useEffect(() => {
        if (dados?.horarioAulas?.data.length > 0 && !carregado) {
            setDadosTemporarios(structuredClone(dados));
            setCarregado(true);
        }
    }, [dados, carregado]);

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

                {Object.entries(dadosTemporarios).map(([secao, secaoData]) => (
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
                            <Typography variant="subtitle1">{secaoData.description.toUpperCase()}</Typography>
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
                                            key={valor + index}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            gap={2}
                                        >
                                            {modoEdicao && secao === 'horarioAulas' ? (
                                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                    ●
                                                    <Autocomplete
                                                        value={valor.dia}
                                                        onChange={(_, newValue) => {
                                                            setDadosTemporarios((prev) => ({
                                                                ...prev,
                                                                [secao]: {
                                                                    ...prev[secao],
                                                                    data: prev[secao].data.map((item, i) =>
                                                                        i === index ? { ...item, dia: newValue } : item
                                                                    )
                                                                }
                                                            }));
                                                        }}
                                                        renderInput={(p) => <TextField sx={{ width: "10rem" }} {...p} label="Dia da Semana" />}
                                                        options={['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']}
                                                        size="small"
                                                    />
                                                    -
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <ControleInputHora
                                                            hora={valor.horaInic}
                                                            setHora={(novaHora) => {
                                                                setDadosTemporarios((prev) => ({
                                                                    ...prev,
                                                                    [secao]: {
                                                                        ...prev[secao],
                                                                        data: prev[secao].data.map((item, i) =>
                                                                            i === index ? { ...item, horaInic: dayjs(novaHora).format("HH:mm") } : item
                                                                        )
                                                                    }
                                                                }));
                                                            }}
                                                        />
                                                        às
                                                        <ControleInputHora
                                                            hora={valor.horaFim}
                                                            setHora={(novaHora) => {
                                                                setDadosTemporarios((prev) => ({
                                                                    ...prev,
                                                                    [secao]: {
                                                                        ...prev[secao],
                                                                        data: prev[secao].data.map((item, i) =>
                                                                            i === index ? { ...item, horaFim: dayjs(novaHora).format("HH:mm") } : item
                                                                        )
                                                                    }
                                                                }));
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </Box>
                                            ) : (
                                                <Typography>● {valor.dia} - {valor.horaInic} às {valor.horaFim}</Typography>
                                            )}

                                            {modoEdicao && (
                                                <IconButton onClick={(e) => { e.stopPropagation(); removerItem(secao, index) }}>
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            )}
                                        </Box>
                                    ))
                                ) : (
                                    <TextField
                                        fullWidth
                                        type="number"
                                        value={secaoData.data}
                                        disabled={!modoEdicao}
                                        onChange={(e) => {
                                            setDadosTemporarios((prev) => ({
                                                ...prev,
                                                [secao]: {
                                                    ...prev[secao],
                                                    data: e.target.value
                                                }
                                            }))
                                        }}
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
