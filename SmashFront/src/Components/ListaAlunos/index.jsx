import { DefaultBreadcrumb } from '../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb';
import { DefaultButton } from '../DefaultComponents/DefaultButton';
import { DefaultTable } from '../DefaultComponents/DefaultTable';
import DefaultFilter from '../DefaultComponents/DefaultFilter/DefaultFilter';
import { ToastContainer } from 'react-toastify';
import { api } from '../../provider/apiProvider';
import {
    Box,
    InputAdornment,
    TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import {
    Add,
    Search
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toasterMsg } from '../../utils/toasterService';
import { ModalDelete } from '../DefaultComponents/Modals/ModalDelete';
import dayjs from 'dayjs';
import { ModalStatus } from '../DefaultComponents/Modals/ModalStatus';
import { getAlunos } from './utils/apiRequest';
import { formatResponse } from './utils/formatResponse';
import { getHeadCells } from './constants/headerCells';
import { renderAcoes, renderValor } from './utils/renderColmns';

export const ListaAlunos = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const timeoutRef = useRef(null);
    const searchValueRef = useRef(null);
    const idToDelete = useRef(undefined);

    const [pageableData, setPageableData] = useState({
        offset: 0,
        limit: 5,
        totalItens: 0
    });

    const [rowData, setRowData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [statusPagamento, setStatusPagamento] = useState(null);
    const [statusPresenca, setStatusPresenca] = useState(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(dayjs().startOf('month'));
    const [selectedMonthRange, setSelectedMonthRange] = useState({
        start: dayjs().startOf('month').format('YYYY-MM-DD'),
        end: dayjs().endOf('month').format('YYYY-MM-DD'),
    });
    const [statusInfoModal, setStatusInfoModal] = useState({
        idAluno: null,
        idMensalidade: null,
        dataVencimento: null,
        nome: null,
        status: null,
        dataPagamento: null,
        formaPagamento: null,
        valor: null,
    });

    const rotas = [
        {
            route: '/listaAlunos',
            description: 'Mensalidades'
        }
    ];

    const handleDeletarAluno = (idAluno) => {
        api.delete(`/alunos/${idAluno}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then(() => {
                toasterMsg('success', 'Aluno excluído com sucesso!');
                setIsModalDeleteOpen(false);
                fetchAlunos();
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg('error', 'Erro ao deletar aluno, por favor contacte os admnistradores.');
                } else {
                    toasterMsg('error', error.response.data);
                }
            });
    };

    const handleClearFilter = () => {
        setStatusPagamento(null);
        setStatusPresenca(null);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        searchValueRef.current = value;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            fetchAlunos();
        }, 1000);
    };

    const fetchAlunos = async (novoOfsset = pageableData.offset) => {
        const objFilter = {
            nome: searchValueRef.current ?? null,
            status: statusPagamento ? [statusPagamento?.label] : null,
            ativo: statusPresenca?.value,
            dataEnvioFrom: selectedMonthRange.start,
            dataEnvioTo: selectedMonthRange.end,
            offset: novoOfsset,
            limit: pageableData.limit
        };

        try {
            const { total, content } = await getAlunos(objFilter);

            if (content.length === 0) {
                setRowData([]);
                setPageableData({
                    ...pageableData,
                    totalItens: 0,
                    offset: 0,
                });
                return;
            };

            const formattedData = formatResponse(content);

            setRowData(formattedData);
            setPageableData({
                ...pageableData,
                totalItens: total,
                offset: novoOfsset,
            });
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg('error', 'Erro ao listar alunos, por favor contacte os admnistradores.');
            } else {
                toasterMsg('error', error.response);
            }
        }
    };

    const formatRowData = (rows) => {
        return rows.map(row => ({
            ...row,
            valor: renderValor(row),
            acoes: renderAcoes({
                row,
                navigate,
                idToDelete,
                setStatusInfoModal,
                setIsModalStatusOpen,
                setIsModalDeleteOpen,
            })
        }));
    };

    useEffect(() => {
        const flags = [
            { key: 'userCreated', type: 'success', msg: 'Aluno cadastrado com sucesso!' },
            { key: 'userDeleted', type: 'success', msg: 'Aluno deletado com sucesso!' },
        ];

        const newState = { ...location.state };

        flags.forEach(({ key, type, msg }) => {
            if (location.state?.[key]) {
                toasterMsg(type, msg);
                delete newState[key];
            }
        });

        if (JSON.stringify(newState) !== JSON.stringify(location.state)) {
            window.history.replaceState(newState, document.title);
        }
    }, [location]);

    useEffect(() => {
        fetchAlunos();
    }, []);

    return (
        <React.Fragment>
            <Box>
                <DefaultBreadcrumb rotas={rotas} />
            </Box>
            <Box className="main-content">
                <Box className="action-area">
                    <TextField
                        value={searchValue}
                        onChange={(e) => handleInputChange(e)}
                        label="Nome do Aluno"
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: '8px',
                                height: '35px',
                            },
                            '& .MuiInputBase-input': {
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 400,
                                fontSize: '14px',
                                color: 'black',
                                padding: '8px 14px',
                                display: 'flex',
                                alignItems: 'center',
                            },
                            '& .MuiInputLabel-root': {
                                top: '-4px',
                                fontSize: '16px',
                            },
                            '& .MuiInputLabel-shrink': {
                                top: 0,
                                fontSize: '16px',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search sx={{ color: 'black' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <DefaultFilter
                        statusPagamento={statusPagamento}
                        statusPresenca={statusPresenca}
                        selectedMonth={selectedMonth}
                        setSelectedMonthRange={setSelectedMonthRange}
                        setSelectedMonth={setSelectedMonth}
                        setStatusPagamento={setStatusPagamento}
                        setStatusPresenca={setStatusPresenca}
                        handleApplyFilter={fetchAlunos}
                        handleClearFilter={handleClearFilter}
                    />
                    <DefaultButton
                        variant="contained"
                        label="Novo Cadastro"
                        onClick={() => navigate('/fichaInscricao', {
                            state: {
                                operacao: 'cadastro',
                            }
                        })}
                        endIcon={<Add />}
                    />
                </Box>
                <Box>
                    <DefaultTable
                        headCells={getHeadCells()}
                        rowData={formatRowData(rowData)}
                        withStatus={true}
                        withPagStatus={true}
                        totalItems={pageableData.totalItens}
                        fetchMoreData={fetchAlunos}
                    />
                </Box>
            </Box>
            <ModalDelete
                isModalOpen={isModalDeleteOpen}
                setIsModalOpen={setIsModalDeleteOpen}
                handleDelete={() => handleDeletarAluno(idToDelete.current)}
            />
            <ModalStatus
                isModalOpen={isModalStatusOpen}
                setIsModalOpen={setIsModalStatusOpen}
                statusInfoModal={statusInfoModal}
                handleApplyFilter={fetchAlunos}
            />
            <ToastContainer />
        </React.Fragment>
    );
};