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
    Tooltip
} from '@mui/material';
import { useEffect, useRef, useState, React } from 'react';
import {
    Add,
    Search
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { toasterMsg } from '../../utils/toasterService';
import ActionMenu from '../DefaultComponents/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalDelete } from '../DefaultComponents/Modals/ModalDelete';
import dayjs from 'dayjs';
import { ModalStatus } from '../DefaultComponents/Modals/ModalStatus';
import { getAlunos } from './utils/apiRequest';
import { formatResponse } from './utils/formatResponse';
import { getHeadCells } from './constants/headerCells';

export const ListaAlunos = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const timeoutRef = useRef(null);
    const searchValueRef = useRef(null);
    const idToDelete = useRef(undefined);

    const [pageableDate, setPageableDate] = useState({
        offset: 0,
        limit: 5,
        totalItens: 0
    });

    const [isFirstLoad, setIsFirstLoad] = useState(false);

    const [rowData, setRowData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [statusPagamento, setStatusPagamento] = useState(null);
    const [statusPresenca, setStatusPresenca] = useState(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(dayjs().startOf('month'));
    const [selectedMonthRange, setSelectedMonthRange] = useState({
        start: dayjs().startOf('month'),
        end: dayjs().endOf('month')
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
                handleApplyFilter();
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg('error', 'Erro ao deletar aluno, por favor contacte os admnistradores.');
                } else {
                    toasterMsg('error', error.response.data);
                }
            });
    };

    const handleApplyFilter = () => {
        const objFilter = {
            nome: searchValueRef.current != '' ? searchValueRef.current : null,
            status: statusPagamento?.label,
            ativo: statusPresenca?.value,
            dataEnvioFrom: selectedMonthRange.start,
            dataEnvioTo: selectedMonthRange.end,
            offset: pageableDate.offset,
            limit: pageableDate.limit
        };

        fetchAlunos(objFilter);
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
            handleApplyFilter();
        }, 1000);
    };

    const fetchAlunos = async (objFilter) => {
        if (isFirstLoad && pageableDate.offset == pageableDate.totalItens) return;

        try {
            const { offset, total, content } = await getAlunos(objFilter);

            const formattedData = formatResponse(content);

            setRowData(formattedData);
            setPageableDate({
                ...pageableDate,
                offset: offset + 5,
                totalItens: total
            });
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg('error', 'Erro ao listar alunos, por favor contacte os admnistradores.');
            } else {
                toasterMsg('error', error.response.data);
            }
        } finally {
            setIsFirstLoad(true);
        }
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
        handleApplyFilter();
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
                        handleApplyFilter={handleApplyFilter}
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
                        rowData={rowData.map(row => ({
                            ...row, valor: row.desconto ? (
                                <Tooltip title="Pago com desconto" arrow placement="top">
                                    <span style={{ color: row.valorColor }}>
                                        {row.valor}
                                    </span>
                                </Tooltip>
                            ) : (
                                <span style={{ color: row.valorColor }}>
                                    {row.valor}
                                </span>
                            ),
                            acoes: <ActionMenu menuOptions={[
                                {
                                    label: 'Visualizar',
                                    icon: <VisibilityIcon fontSize="small" />,
                                    onClickFunc: () => {
                                        navigate('/fichaInscricao', {
                                            state: {
                                                idAluno: row.id,
                                                operacao: 'visualizacao'
                                            }
                                        });
                                    }
                                },
                                {
                                    label: 'Alterar Status',
                                    icon: <CurrencyExchangeIcon fontSize="small" />,
                                    onClickFunc: () => {
                                        setIsModalStatusOpen(true);
                                        setStatusInfoModal({
                                            idAluno: row.id,
                                            idMensalidade: row.idMensalidade,
                                            dataVencimento: row.dataVencimento,
                                            nome: row.nome,
                                            status: row.status,
                                            dataPagamento: row.dataEnvioOriginal,
                                            formaPagamento: row.formaPagamento,
                                            valor: row.valor,
                                        });
                                    },
                                    disabled: row.automatico === true,
                                    disabledLabel: 'Não é possível alterar o status de Pagamentos Automáticos',
                                },
                                {
                                    label: 'Editar',
                                    icon: <EditIcon fontSize="small" />,
                                    onClickFunc: () => {
                                        navigate('/fichaInscricao', {
                                            state: {
                                                idAluno: row.id,
                                                operacao: 'edicao'
                                            }
                                        });
                                    }
                                },
                                {
                                    label: 'Excluir',
                                    icon: <DeleteIcon fontSize="small" />,
                                    onClickFunc: () => {
                                        idToDelete.current = row.id;
                                        setIsModalDeleteOpen(true);
                                    }
                                }
                            ]}
                            />
                        }))}
                        withStatus={true}
                        withPagStatus={true}
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
                handleApplyFilter={handleApplyFilter}
            />
            <ToastContainer />
        </React.Fragment>
    );
};