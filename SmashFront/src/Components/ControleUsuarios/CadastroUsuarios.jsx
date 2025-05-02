import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader";
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import { Box } from "@mui/material";
import { MenuCadastro } from "../DefaultComponents/MenuCadastro/MenuCadastro";
import { FormInfoUsuario } from "./Components/FormularioCadastroUsuario/FormInfoUsuario";
import { useState } from "react";
import { api } from "../../provider/apiProvider"
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export const CadastroUsuarios = () => {
    const navigate = useNavigate();
    const [infoConcluido, setInfoConcluido] = useState(false);

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

    // Dados dos Form
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

    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateRows: "auto auto 1fr",
                    height: "100vh",
                }}
            >
                <DefaultHeader pageTitle="Cadastrar Usuário" />
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
                        // setTabAtiva={setTabAtiva}
                        etapas={etapasMenu}
                    />
                    <FormInfoUsuario
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        handleApplyClick={cadastrarUsuario}
                    />
                </Box>
            </Box>
        </>
    );
};
