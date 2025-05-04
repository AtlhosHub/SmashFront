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
    TextField
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

export const ListaAlunos = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const timeoutRef = useRef(null);
    const searchValueRef = useRef(null);
    const [searchValue, setSearchValue] = useState("");
    const [statusPagamento, setStatusPagamento] = useState(null);
    const [statusPresenca, setStatusPresenca] = useState(null);
    const [dateRange, setDateRange] = useState(getMonthRange());

    const headCells = [
        {
            name: "nome",
            description: "Nome do Aluno"
        },
        {
            name: "dataEnvio",
            description: "Data de Envio"
        }
    ]

    const [rowData, setRowData] = useState([])

    const rotas = [
        {
            route: "/listaAlunos",
            description: "Lista de Alunos"
        }
    ]

    const handleApplyFilter = () => {
        const objFilter = {
            nome: searchValueRef.current != "" ? searchValueRef.current : null,
            status: statusPagamento?.label,
            ativo: statusPresenca?.value,
            dataEnvioForm: dateRange?.[0].format("YYYY-MM-DD"),
            dataEnvioTo: dateRange?.[1].format("YYYY-MM-DD")
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
                    dataEnvio: aluno.dataEnvio ? dateFormater(aluno.dataEnvio) : null
                }));

                setRowData(formattedData);
            })
            .catch((error) => {
                if(error.response.status === 401 || error.response.data.message  === "JWT strings must contain exactly 2 period characters. Found: 0") {
                    sessionStorage.clear();
                    navigate("/", { state: { tokenLogout: true } });
                }
                toasterMsg("error", "Algum ero aconteceu, por favor contacte os admnistradores.")
                console.error("Erro ao buscar os alunos:", error)
            })
    }

    useEffect(() => {
        if (location.state?.userCreated) {
            toasterMsg("success", "Aluno cadastrado com sucesso!")
        }
    }, [location])

    useEffect(() => {
        handleApplyFilter()
    }, [])

    return (
        <>
            <Box>
                <DefaultHeader pageTitle="Lista de Alunos" />
                <DefaultBreadcrumb rotas={rotas} />
            </Box>
            <Box className="main-content">
                <Box className="action-area">
                    <TextField
                        value={searchValue.toUpperCase()}
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                        label="Nome do Aluno"
                        variant="outlined"
                        size="small"
                        sx={{

                            '& .MuiInputBase-root': {
                                borderRadius: '8px',
                            },
                            '& .MuiInputBase-input': {
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 400,
                                fontSize: '14px',
                                color: 'black',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search sx={{ color: "black" }} />
                                </InputAdornment>
                            ),
                            sx: {
                                height: 35,
                                '& input': {
                                    padding: '8px 14px',
                                },
                            },
                        }}
                    />
                    <DefaultFilter
                        statusPagamento={statusPagamento}
                        statusPresenca={statusPresenca}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
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
                            ...row,
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
                                    onClickFunc: () => { }
                                }
                            ]}
                            />
                        }))}
                        withStatus={true}
                        withPagStatus={true}
                    />
                </Box>
            </Box>
            <ToastContainer />
        </>
    )
}