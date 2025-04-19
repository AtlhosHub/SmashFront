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
import { useEffect, useState } from "react"
import {
    Add,
    Search
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export const ListaAlunos = () => {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState(null);
    const [statusPagamento, setStatusPagamento] = useState(null);
    const [statusPresenca, setStatusPresenca] = useState(null);
    const [horarioPref, setHorarioPref] = useState(null);
    const [dateRange, setDateRange] = useState([null, null]);

    const headCells = [
        {
            name: "nome",
            description: "Nome do Aluno"
        },
        {
            name: "dtEnvio",
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
            nome: searchValue != "" ? searchValue : null,
            status: statusPagamento?.label,
            ativo: statusPresenca?.value,
            dataEnvioForm: dateRange?.[0],
            dataEnvioTo: dateRange?.[1]
        }

        fetchAlunos(objFilter);
    }

    useEffect(() => {
        handleApplyFilter()
    }, [])

    // useEffect(() => {
    //     fetchAlunos()
    // }, [searchValue])

    const fetchAlunos = (objFilter) => {
        api.post("/alunos/comprovantes", objFilter)
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
                        onChange={(e) => setSearchValue(e.target.value)}
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
                        horarioPref={horarioPref}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                        setStatusPagamento={setStatusPagamento}
                        setStatusPresenca={setStatusPresenca}
                        setHorarioPref={setHorarioPref}
                        handleApplyFilter={handleApplyFilter}
                    />
                    <DefaultButton
                        variant="contained"
                        label="Novo Cadastro"
                        onClick={() => navigate("/cadastrarAluno")}
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