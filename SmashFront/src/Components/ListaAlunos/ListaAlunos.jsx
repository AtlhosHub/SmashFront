import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader"
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb"
import { DefaultButton } from "../DefaultComponents/DefaultButton/DefaultButton"
import { DefaultTable } from "../DefaultComponents/DefaultTable/DefaultTable";
import DefaultFilter from "../DefaultComponents/DefaultFilter/DefaultFilter"
import { ToastContainer } from "react-toastify"
import { Box, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import { Download, Search, Widgets } from "@mui/icons-material"

export const ListaAlunos = () => {
    //Variáveis do filtro
    const [searchValue, setSearchValue] = useState("");
    const [statusPagamento, setStatusPagamento] = useState(null);
    const [statusPresenca, setStatusPresenca] = useState(null);
    const [horarioPref, setHorarioPref] = useState(null);

    //Variáveis de moc da tabela
    const headCells = [
        {
            name: "nomeAluno",
            description: "Nome do Aluno"
        },
        {
            name: "dtEnvio",
            description: "Data de Envio"
        }
    ]
    const rowData = [
        {
            statusAluno: true,
            nomeAluno: "Carolina Timoteo Teixeira de Camargo",
            dtEnvio: "02/03/25 - 15:59",
            statusComprovante: "Enviado"
        },
        {
            statusAluno: false,
            nomeAluno: "Cauã Gouvea do Nascimento",
            dtEnvio: "02/03/25 - 15:59",
            statusComprovante: "Pendente"
        },
        {
            statusAluno: false,
            nomeAluno: "Juliana Murakami Oshikawa",
            dtEnvio: "02/03/25 - 15:59",
            statusComprovante: "Atrasado"
        }
    ]

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
        fetch
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
                        setStatusPagamento={setStatusPagamento}
                        setStatusPresenca={setStatusPresenca}
                        setHorarioPref={setHorarioPref}
                        handleApplyFilter={handleApplyFilter}
                    />
                    <DefaultButton
                        variant="contained"
                        label="Exportar"
                        endIcon={<Download />}
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