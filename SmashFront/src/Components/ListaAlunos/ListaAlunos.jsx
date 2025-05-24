import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader"
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb"
import { DefaultButton } from "../DefaultComponents/DefaultButton/DefaultButton"
import { DefaultTable } from "../DefaultComponents/DefaultTable/DefaultTable";
import DefaultFilter from "../DefaultComponents/DefaultFilter/DefaultFilter"
import { ToastContainer } from "react-toastify"
import { api } from "../../provider/apiProvider"
import {
    Box,
    InputAdornment,
    TextField,
    Tooltip
} from "@mui/material"
import { useEffect, useRef, useState } from "react"
import {
    Add,
    Search
} from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom";
import { getMonthRange } from "../DefaultComponents/DefaultFilter/utils/getMonthRange";
import { dateFormater } from "../../utils/dateFormaterService";
import { toasterMsg } from "../../utils/toasterService";
import ActionMenu from "../iconButton/iconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalDelete } from "../Modals/ModalDelete/ModalDelete";
import dayjs from "dayjs";

export const ListaAlunos = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const timeoutRef = useRef(null);
    const searchValueRef = useRef(null);
    const idToDelete = useRef(undefined);

    const [rowData, setRowData] = useState([])
    const [searchValue, setSearchValue] = useState("");
    const [statusPagamento, setStatusPagamento] = useState(null);
    const [statusPresenca, setStatusPresenca] = useState(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(dayjs().startOf('month'));
    const [selectedMonthRange, setSelectedMonthRange] = useState({
        start: dayjs().startOf('month'),
        end: dayjs().endOf('month')
    });

    const headCells = [
        {
            name: "nome",
            description: "Nome do Aluno",
            cellWidth: "20%"
        },
        {
            name: "dataEnvio",
            description: "Data de Envio"
        },
        {
            name: "formaPagamento",
            description: "Forma de Pagamento",
            align: "center"
        },
        {
            name: "valor",
            description: "Valor Pago",
            align: "center"
        }
    ]

    const rotas = [
        {
            route: "/listaAlunos",
            description: "Lista de Alunos"
        }
    ]

    const handleDeletarAluno = (idAluno) => {
        api.delete(`/alunos/${idAluno}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then(() => {
                toasterMsg("success", "Aluno excluído com sucesso!")
                setIsModalDeleteOpen(false);
                handleApplyFilter();
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg("error", "Erro ao deletar aluno, por favor contacte os admnistradores.");
                } else {
                    toasterMsg("error", error.response.data);
                }
            })
    }

    const handleApplyFilter = () => {
        const objFilter = {
            nome: searchValueRef.current != "" ? searchValueRef.current : null,
            status: statusPagamento?.label,
            ativo: statusPresenca?.value,
            dataEnvioFrom: selectedMonthRange.start,
            dataEnvioTo: selectedMonthRange.end
        }

        fetchAlunos(objFilter);
    }

    const handleClearFilter = () => {
        setStatusPagamento(null);
        setStatusPresenca(null);
    }

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
    }

    const fetchAlunos = (objFilter) => {
        api.post("/alunos/comprovantes", objFilter, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((res) => {
                const formattedData = res.data.map((aluno) => ({
                    ...aluno,
                    dataEnvio: aluno.dataEnvio ? dateFormater(aluno.dataEnvio) : null,
                    valor: aluno.valor != null
                        ? aluno.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        : null,
                    valorColor: aluno.desconto ? '#286DA8' : 'inherit'
                }));

                setRowData(formattedData);
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg("error", "Erro ao listar alunos, por favor contacte os admnistradores.");
                } else {
                    toasterMsg("error", error.response.data);
                }
            })
    }

    useEffect(() => {
        const flags = [
            { key: 'userCreated', type: 'success', msg: 'Aluno cadastrado com sucesso!' },
            { key: 'userDeleted', type: 'success', msg: 'Aluno deletado com sucesso!' },
        ];

        let newState = { ...location.state };

        flags.forEach(({ key, type, msg }) => {
            if (location.state?.[key]) {
                toasterMsg(type, msg);
                delete newState[key];
            }
        });

        if (JSON.stringify(newState) !== JSON.stringify(location.state)) {
            window.history.replaceState(newState, document.title);
        }
    }, [location])

    useEffect(() => {
        handleApplyFilter()
    }, [])

    return (
        <>
            <Box>
                <DefaultBreadcrumb rotas={rotas} />
            </Box>
            <Box className="main-content">
                <Box className="action-area">
                    <TextField
                        value={searchValue}
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
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
                                    <Search sx={{ color: "black" }} />
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
                        onClick={() => navigate("/fichaInscricao", {
                            state: {
                                operacao: "cadastro",
                            }
                        })}
                        endIcon={<Add />}
                    />
                </Box>
                <Box>
                    <DefaultTable
                        headCells={headCells}
                        rowData={rowData.map(row => ({
                            ...row, valor: (
                                <Tooltip title="Pago com desconto" arrow placement="top">
                                    <span style={{ color: row.valorColor }}>
                                        {row.valor}
                                    </span>
                                </Tooltip>
                            ),
                            acoes: <ActionMenu menuOptions={[
                                {
                                    label: 'Visualizar',
                                    icon: <VisibilityIcon fontSize="small" />,
                                    onClickFunc: () => {
                                        navigate("/fichaInscricao", {
                                            state: {
                                                idAluno: row.id,
                                                operacao: "visualizacao"
                                            }
                                        })
                                    }
                                },
                                {
                                    label: 'Editar',
                                    icon: <EditIcon fontSize="small" />,
                                    onClickFunc: () => {
                                        navigate("/fichaInscricao", {
                                            state: {
                                                idAluno: row.id,
                                                operacao: "edicao"
                                            }
                                        })
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
            <ToastContainer />
        </>
    )
}