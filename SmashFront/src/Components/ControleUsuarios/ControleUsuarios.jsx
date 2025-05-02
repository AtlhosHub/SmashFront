import { useEffect, useState } from "react"
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
import {
    Add,
    Search
} from "@mui/icons-material"
import { api } from "../../provider/apiProvider"
import { useLocation, useNavigate } from "react-router-dom";
import { toasterMsg } from "../../utils/toasterService";

export const ControleUsuarios = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
            description: "Nome do Usuário Admnistrador"
        }
    ]

    useEffect(() => {
        listarUsuarios();
    }, [])

    const listarUsuarios = () => {
        api.get("/usuarios", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                setRowData(response.data || [])
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
    }

    useEffect(() => {
        if (location.state?.userCreated) {
            toasterMsg("success", "Usuário cadastrado com sucesso!")
        }
    }, [location])

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
                            setSearchValue(e.target.value.toUpperCase());
                        }}
                        label="Nome do Usuário"
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
                        onClick={() => navigate("/cadastroUsuarios", {
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
                    />
                </Box>
            </Box>
            <ToastContainer />
        </>
    )
}