import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader"
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb"
import { Box } from "@mui/material";
import { MenuCadastro } from "../FichaInscricao/Components/MenuCadastro/MenuCadastro";
import { FormInfoUsuario } from "./Components/FormularioCadastroUsuario/FormInfoUsuario";

export const CadastroUsuarios = () => {

    const rotas = [
        {
            route: "/controleUsuarios",
            description: "Controle de Usuários"
        },
        {
            route: "/cadastroUsuarios",
            description: "Cadastrar Usuário"
        }
    ]

    return (
        <>
            <Box>
                <DefaultHeader pageTitle="Cadastrar Usuário" />
                <DefaultBreadcrumb rotas={rotas} />

                <Box sx={{
                    display: "grid",
                    gridTemplateRows: "auto auto 1fr",
                    height: "100vh",

                }}>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexGrow: 1,
                        }}
                    >
                        <MenuCadastro

                        />
                        <FormInfoUsuario />
                    </Box>


                </Box>
            </Box>
        </>
    )
}