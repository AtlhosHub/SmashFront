import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader"
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb"
import { DefaultButton } from "../DefaultComponents/DefaultButton/DefaultButton"
import { DefaultTable } from "../DefaultComponents/DefaultTable/DefaultTable";
import DefaultFilter from "../DefaultComponents/DefaultFilter/DefaultFilter"
import { ToastContainer } from "react-toastify"
// import { api } from "../../provider/apiProvider"
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

export const ListaAlunos = () => {
    //Variáveis do filtro
    const [searchValue, setSearchValue] = useState(null);
    const [statusPagamento, setStatusPagamento] = useState(null);
    const [statusPresenca, setStatusPresenca] = useState(null);
    const [horarioPref, setHorarioPref] = useState(null);
    const [dateRange, setDateRange] = useState([null, null]);

    //Variáveis de moc da tabela
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
    // const rowData = [
    //     {
    //         statusAluno: true,
    //         nomeAluno: "Carolina Timoteo Teixeira de Camargo",
    //         dtEnvio: "02/03/25 - 15:59",
    //         statusComprovante: "Enviado"
    //     },
    //     {
    //         statusAluno: false,
    //         nomeAluno: "Cauã Gouvea do Nascimento",
    //         dtEnvio: "02/03/25 - 15:59",
    //         statusComprovante: "Pendente"
    //     },
    //     {
    //         statusAluno: false,
    //         nomeAluno: "Juliana Murakami Oshikawa",
    //         dtEnvio: "02/03/25 - 15:59",
    //         statusComprovante: "Atrasado"
    //     }
    // ]

    const [rowData, setRowData] = useState([])

    //Variável para o breadcrumb
    const rotas = [
        {
            route: "/listaAlunos",
            description: "Lista de Alunos"
        }
    ]

    const handleApplyFilter = () => {
        const fitlerObj = {
            "statusPag": statusPagamento,
            "statusPres": statusPresenca,
            "horarioPref": horarioPref
        }

        //Passar o filterObj no fetch
        // fetchAlunos();
    }

    // useEffect(() => {
    //     fetchAlunos()
    // }, []) 

    // function fetchAlunos(
    //     nome = searchValue != "" ? searchValue : null, 
    //     status = statusPagamento?.label, 
    //     ativo = statusPresenca, 
    //     dataEnvioForm = dateRange?.[0], 
    //     dataEnvioTo = dateRange?.[1]) {
    //     api.post("/alunos/comprovantes", {
    //         nome,
    //         status,
    //         ativo,
    //         dataEnvioForm,
    //         dataEnvioTo,
    //     })
    //     .then((res) => {
    //         console.log("Dados recebidos:", res.data);
    //     })
    //     .catch((err) => {
    //         console.error("Erro ao buscar alunos:", err);
    //     });
    // }

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