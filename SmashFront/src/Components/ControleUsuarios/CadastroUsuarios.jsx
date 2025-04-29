import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader";
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import { Box } from "@mui/material";
import { MenuCadastro } from "../FichaInscricao/Components/MenuCadastro/MenuCadastro";
import { FormInfoUsuario } from "./Components/FormularioCadastroUsuario/FormInfoUsuario";
import { useState } from "react";

export const CadastroUsuarios = () => {
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
                    <MenuCadastro />
                    <FormInfoUsuario
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                    />
                </Box>
            </Box>
        </>
    );
};
