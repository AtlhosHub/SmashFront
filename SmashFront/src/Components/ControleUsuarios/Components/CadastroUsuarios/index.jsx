import {
    useLocation,
    useNavigate
} from "react-router-dom";
import {
    useEffect
} from "react";
import { ToastContainer } from "react-toastify";

import { DefaultBreadcrumb } from "../../../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { MenuCadastro } from "../../../DefaultComponents/MenuCadastro/MenuCadastro";
import { ModalDelete } from "../../../DefaultComponents/Modals/ModalDelete";
import { toasterMsg } from "../../../../utils/toasterService";
import { Box } from "@mui/material";

import { getBreadcrumbRoutes } from "../../utils/breadCrumbRoutes";
import { deleteUsuario, getUsuarioData, postUsuario, putUsuario } from "../../utils/apiRequest";
import { FormBuilder } from "../../../DefaultComponents/FormBuilder";
import { useFormInfoConfig } from "../../hooks/useFormInfoConfig";
import { useCadastroUsuario } from "../CadastroUsuarioContext";

export const CadastroUsuarios = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        userInfo,
        setUserInfo,
        mostrarSenha,
        setMostrarSenha,
        senha,
        setSenha,
        mostrarConfirmarSenha,
        setMostrarConfirmarSenha,
        confirmarSenha,
        setConfirmarSenha,
        erroConfirmarSenha,
        operacao,
        setOperacao,
        infoConcluido,
        setIsModalDeleteOpen,
        isModalDeleteOpen,
        setErroConfirmarSenha
    } = useCadastroUsuario();

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

    const formConfig = useFormInfoConfig({
        userInfo,
        setUserInfo,
        operacao,
        mostrarSenha,
        setMostrarSenha,
        senha,
        setSenha,
        mostrarConfirmarSenha,
        setMostrarConfirmarSenha,
        confirmarSenha,
        setConfirmarSenha,
        erroConfirmarSenha,
        setErroConfirmarSenha
    });

    const labels = {
        visualizacao: "Editar",
        cadastro: "Concluir",
        edicao: "Salvar"
    };

    const labelBotao = labels[operacao] ?? "Salvar"

    const cadastrarUsuario = () => {
        try {
            postUsuario(userInfo);
            navigate("/controleUsuarios", { state: { userCreated: true } })
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg("error", "Erro ao cadastrar usuário, por favor contacte os admnistradores.")
            } else {
                toasterMsg("error", error.response.message)
            }
        }
    }

    const deletarUsuario = () => {
        try {
            deleteUsuario(location.state?.idUsuario)
            navigate("/controleUsuarios", { state: { userDeleted: true } })
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg("error", "Erro ao deletar usuário, por favor contacte os admnistradores.")
            } else {
                toasterMsg("error", error.message.data)
            }
        }
    }

    const editarUsuario = () => {
        try {
            putUsuario(location.state?.idUsuario, userInfo);

            toasterMsg("success", "Usuário editado com sucesso!");
            setOperacao("visualizacao");
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg("error", "Erro ao editar usuário, por favor contacte os admnistradores.")
            } else {
                toasterMsg("error", error.message.data)
            }
        }
    }

    const listarDadosUsuario = () => {
        try {
            const request = getUsuarioData(location.state?.idUsuario)
            setUserInfo(request)
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg("error", "Erro ao lista dados do usuário, por favor contacte os admnistradores.")
            } else {
                toasterMsg("error", error.message.data)
            }
        }
    }

    const handleClick = () => {
        if (operacao === "visualizacao") {
            setOperacao("edicao");
        } else if (operacao === "cadastro") {
            cadastrarUsuario()
        } else {
            editarUsuario();
        }
    }

    useEffect(() => {
        if (operacao !== "cadastro") {
            listarDadosUsuario()
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
                <DefaultBreadcrumb rotas={getBreadcrumbRoutes(operacao)} />

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
                    <FormBuilder
                        campos={formConfig.campos}
                        radios={formConfig.radios}
                        cancelButton={{
                            label: operacao === "visualizacao" ? "Excluir" : "Voltar",
                            onClick: operacao === "visualizacao"
                                ? () => setIsModalDeleteOpen(true)
                                : () => setOperacao("info"),
                            color: operacao === "visualizacao" ? "red" : ""
                        }}
                        confirmButton={{
                            label: labelBotao,
                            onClick: handleClick,
                            disabled: true
                        }}
                        columnsWidth={[1, 1, 1]}
                        operacao={operacao}
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
