import { Box } from "@mui/material";
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader";
import { MenuCadastro } from "./Components/MenuCadastro/MenuCadastro";
import { useEffect, useState } from "react";
import { FormInfo } from "./Components/FormularioCadastro/FormInfo";
import { FormEndereco } from "./Components/FormularioCadastro/FormEndereco";

export const FichaInscricao = () => {
    const [tabAtiva, setTabAtiva] = useState("info");
    const [infoConcluido, setInfoConcluido] = useState(false);
    const [enderecoConcluido, setEnderecoConcluido] = useState(false);
    const [maiorIdade, setMaiorIdade] = useState(true);

    const [userInfo, setUserInfo] = useState({
        nome: "",
        nomeSocial: "",
        dtNascimento: "",
        genero: "",
        profissao: "",
        nacionalidade: "",
        rg: "",
        telefone: "",
        email: "",
        naturalidade: "",
        cpf: "",
        celular: "",
        isAtivo: true,
        isAtestado: true,
        deficiencia: "",
        cep: "",
        numero: "",
        rua: "",
        bairro: "",
        estado: "",
        cidade: ""
    });

    const rotas = [
        {
            route: "/alunos",
            description: "Lista de Alunos"
        },
        {
            route: "/cadastrarAluno",
            description: "Ficha de Inscrição"
        }
    ]

    return (
        <>
            <Box sx={{
                display: "grid",
                gridTemplateRows: "auto auto 1fr",
                height: "100vh",
            }}>
                <DefaultHeader pageTitle={"Ficha de Inscrição"} />
                <DefaultBreadcrumb rotas={rotas} />
                <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
                    <MenuCadastro
                        infoConcluido={infoConcluido}
                        enderecoConcluido={enderecoConcluido}
                        maiorIdade={maiorIdade}
                        tabAtiva={tabAtiva}
                        setTabAtiva={setTabAtiva}
                    />
                    {tabAtiva === "info" &&
                        <FormInfo
                            userInfo={userInfo}
                            setUserInfo={setUserInfo}
                            maiorIdade={maiorIdade}
                            setMaiorIdade={setMaiorIdade}
                            setTabAtiva={setTabAtiva}
                        />
                    }
                    {tabAtiva === "ende" &&
                        <FormEndereco
                            userInfo={userInfo}
                            setUserInfo={setUserInfo}
                        />
                    }
                </Box>
            </Box >
        </>
    );
}