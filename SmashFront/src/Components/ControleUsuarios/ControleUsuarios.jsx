import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader"
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb"
import { DefaultButton } from "../DefaultComponents/DefaultButton/DefaultButton"
import { DefaultTable } from "../DefaultComponents/DefaultTable/DefaultTable";
import { ToastContainer } from "react-toastify"
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

export const ControleUsuarios = () => {

    const [searchValue, setSearchValue] = useState("");
    const [rowData, setRowData] = useState([])

    const rotas = [
        {
            route: "/controleUsuarios",
            description: "Controle de Usuários"
        }
    ]

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

    return (
        <>
            <Box>
                <DefaultHeader pageTitle="Controle de Usuários" />
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
                                width: '400px',
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