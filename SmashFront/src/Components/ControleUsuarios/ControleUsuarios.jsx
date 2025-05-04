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
import ActionMenu from "../iconButton/iconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalDelete } from "../Modals/ModalDelete/ModalDelete";

export const ControleUsuarios = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(undefined);
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
            .catch((error) => {
                if (error.response.status === 401 || error.response.data.message === "JWT strings must contain exactly 2 period characters. Found: 0") {
                    sessionStorage.clear();
                    navigate("/", { state: { tokenLogout: true } });
                }
                console.error("Erro ao buscar dados:", error)
            });
    }

    const handleDelete = (id) => {
        // Deletar usuário
        setIsModalDeleteOpen(false);
        setRowToDelete(undefined);
        toasterMsg("success", "Se pá que deletou viu")
    }

    useEffect(() => {
        listarUsuarios();
    }, [])

    useEffect(() => {
        if (location.state?.userCreated) {
            toasterMsg("success", "Usuário cadastrado com sucesso!")
        }
        if (location.state?.userDeleted) {
            toasterMsg("success", "Usuário deletado com sucesso!")
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
                            setSearchValue(e.target.value);
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
                                operacao: "cadastro"
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
                                        navigate("/cadastroUsuarios", {
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
                                        navigate("/cadastroUsuarios", {
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
                                        setRowToDelete(row.id);
                                        setIsModalDeleteOpen(true);
                                    }
                                }
                            ]}
                            />
                        }))}
                    />
                </Box>
            </Box>
            <ToastContainer />
            <ModalDelete
                isModalOpen={isModalDeleteOpen}
                setIsModalOpen={setIsModalDeleteOpen}
                handleDelete={() => handleDelete(rowToDelete)}
            />
        </>
    )
}