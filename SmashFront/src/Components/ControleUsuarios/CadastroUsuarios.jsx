import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader";
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import { Box } from "@mui/material";
import { MenuCadastro } from "../DefaultComponents/MenuCadastro/MenuCadastro";
import { FormInfoUsuario } from "./Components/FormularioCadastroUsuario/FormInfoUsuario";
import { useState } from "react";
import { api } from "../../provider/apiProvider"
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ToastContainer } from "react-toastify";
import { tokenValidationFunction } from "../../utils/tokenValidationFunction";
import { useEffect } from "react";
import { toasterMsg } from "../../utils/toasterService";
import { ModalDelete } from "../Modals/ModalDelete/ModalDelete";

export const CadastroUsuarios = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [infoConcluido, setInfoConcluido] = useState(false);
    const [operacao, setOperacao] = useState(location.state?.operacao || "cadastro");
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const [userInfo, setUserInfo] = useState({
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

    const rotas = [
        {
            route: "/controleUsuarios",
            description: "Controle de Usuários",
        },
        {
            route: "/cadastroUsuarios",
            description: "Cadastrar Usuário",
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
            .catch((error) => console.error("Erro ao adicionar usuário: ", error));
    }

    const deletarUsuario = () => {
        // Deletar Usuário
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
                toasterMsg("error", "Algum ero aconteceu, por favor contacte os admnistradores.")
                console.error("Erro ao excluir Usuário:", error)
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
                toasterMsg("error", "Algum ero aconteceu, por favor contacte os admnistradores.")
                console.error("Erro ao editar Usuário:", error)
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
                toasterMsg("error", "Algum ero aconteceu, por favor contacte os admnistradores.")
                console.error("Erro ao excluir aluno:", error)
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
