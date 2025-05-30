import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import { Box } from "@mui/material";
import { MenuCadastro } from "../DefaultComponents/MenuCadastro/MenuCadastro";
import { FormInfoUsuario } from "./Components/FormularioCadastroUsuario/FormInfoUsuario";
import { useState, useEffect } from "react";
import { api } from "../../provider/apiProvider"
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toasterMsg } from "../../utils/toasterService";
import { ModalDelete } from "../Modals/ModalDelete/ModalDelete";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export const CadastroUsuarios = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [infoConcluido, setInfoConcluido] = useState(false);
    const [operacao, setOperacao] = useState(location.state?.operacao || "cadastro");
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const [userInfo, setUserInfo] = useState({
        ...(operacao !== "cadastro" && { id: location.state?.idUsuario }),
        nome: null,
        email: null,
        dataNascimento: null,
        nomeSocial: null,
        genero: null,
        celular: null,
        telefone: null,
        senha: null,
        cargo: null,
        deletado: false,
        dataInclusao: null,
        usuarioInclusao: {
            id: sessionStorage.getItem("idUsuario"),
        }
    });

    const definirNomePagina = () => {
        if (operacao === "cadastro") return "Adicionar Usuário"
        if (operacao === "visualizacao") return "Visualizar Perfil de Usuário"
        return "Editar Perfil de Usuário"
    }

    const rotas = [
        {
            route: "/controleUsuarios",
            description: "Controle de Usuários",
        },
        {
            route: "/cadastroUsuarios",
            description: definirNomePagina(),
        },
    ];

    const etapasMenu = [
        {
            id: "info",
            nome: "Informações",
            Icone: AccountCircleOutlinedIcon,
            visivel: true,
            concluido: infoConcluido,
            podeAtivar: () => true
        },
    ];

    const cadastrarUsuario = () => {
        api.post("/usuarios", userInfo, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then(() => {
                navigate("/controleUsuarios", { state: { userCreated: true } })
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg("error", "Erro ao cadastrar usuário, por favor contacte os admnistradores.")
                } else {
                    toasterMsg("error", error.response.message)
                }
            });
    }

    const deletarUsuario = () => {
        api.delete(`usuarios/${location.state?.idUsuario}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then(() => {
                toasterMsg("success", "Usuário deletado com sucesso!");
                navigate("/controleUsuarios", { state: { userDeleted: true } })
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg("error", "Erro ao deletar usuário, por favor contacte os admnistradores.")
                } else {
                    toasterMsg("error", error.message.data)
                }
            })
    }

    const editarUsuario = () => {
        api.put(`usuarios/${location.state?.idUsuario}`, userInfo, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then(() => {
                toasterMsg("success", "Usuário editado com sucesso!");
                setOperacao("visualizacao")
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg("error", "Erro ao editar usuário, por favor contacte os admnistradores.")
                } else {
                    toasterMsg("error", error.message.data)
                }
            })
    }

    const listarDadosUsuario = (id) => {
        api.get(`/usuarios/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                setUserInfo(response.data)
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg("error", "Erro ao lista dados do usuário, por favor contacte os admnistradores.")
                } else {
                    toasterMsg("error", error.message.data)
                }
            })
    }

    useEffect(() => {
        if (operacao !== "cadastro") {
            listarDadosUsuario(location.state?.idUsuario)
        }
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateRows: "auto 1fr",
                    height: "90.9vh",
                }}
            >
                <DefaultBreadcrumb rotas={rotas} />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <MenuCadastro
                        operacao="cadastro"
                        tabAtiva="info"
                        etapas={etapasMenu}
                    />
                    <FormInfoUsuario
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        setOperacao={setOperacao}
                        operacao={operacao}
                        handleSalvar={editarUsuario}
                        handleCadastrar={cadastrarUsuario}
                        handleDeletar={() => setIsModalDeleteOpen(true)}
                    />
                </Box>
            </Box>
            <ToastContainer />
            <ModalDelete
                isModalOpen={isModalDeleteOpen}
                setIsModalOpen={setIsModalDeleteOpen}
                handleDelete={deletarUsuario}
            />
        </>
    );
};
