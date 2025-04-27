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
import { useNavigate } from "react-router-dom";
import { getMonthRange } from "../DefaultComponents/DefaultFilter/utils/getMonthRange";

export const ListaAlunos = () => {
    const navigate = useNavigate();

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
        setDateRange([null, null]);
    }

    useEffect(() => {
        handleApplyFilter()
    }, [])

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
                setRowData(res.data);
                console.log("Dados recebidos:", res.data);
            })
            .catch((err) => {
                console.error("Erro ao buscar alunos:", err);
            });
    }

    return (
        <>
            <Box>
                <DefaultHeader pageTitle="Lista de Alunos" />
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
                            )
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
                        onClick={() => navigate("/cadastrarAluno", {
                            state: {
                                operacao: "cadastrar"
                            }
                        })}
                        endIcon={<Add />}
                    />
                </Box>
                <Box>
                    <DefaultTable
                        headCells={headCells}
                        rowData={rowData}
                        withStatus={true}
                    />
                </Box>
            </Box>
            <ToastContainer />
        </>
    )
}