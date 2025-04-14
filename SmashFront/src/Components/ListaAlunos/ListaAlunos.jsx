import { ToastContainer } from "react-toastify"
import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader"
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb"
import { Box } from "@mui/material"
import DefaultFilter from "../DefaultComponents/DefaultFilter/DefaultFilter"
import { useState } from "react"
import { DefaultButton } from "../DefaultComponents/DefaultButton/DefaultButton"
import { Download, Search } from "@mui/icons-material"

export const ListaAlunos = () => {
    const [statusPagamento, setStatusPagamento] = useState(null)
    const [statusPresenca, setStatusPresenca] = useState(null)
    const [horarioPref, setHorarioPref] = useState(null)

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

    const rotas = [
        {
            route: "/listaAlunos",
            description: "Lista de Alunos"
        }
    ]

    return (
        <>
            <Box>
                <DefaultHeader pageTitle="Lista de Alunos" />
                <DefaultBreadcrumb rotas={rotas} />
            </Box>
            <Box className="main-content">
                <Box className="action-area">
                    <Box className="input-search">
                        <input type="text" />
                        <Search sx={{color: "black"}} />
                    </Box>
                    <DefaultFilter
                        statusPagamento={statusPagamento}
                        statusPresenca={statusPresenca}
                        horarioPref={horarioPref}
                        setStatusPagamento={setStatusPagamento}
                        setStatusPresenca={setStatusPresenca}
                        setHorarioPref={setHorarioPref}
                    />
                    <DefaultButton
                        variant="contained"
                        label="Exportar"
                        endIcon={<Download />}
                    />
                </Box>
            </Box>
            <ToastContainer />
        </>
    )
}