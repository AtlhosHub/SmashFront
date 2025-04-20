import { Box } from "@mui/material";
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader";
import { MenuCadastro } from "./Components/MenuCadastro/MenuCadastro";
import { useEffect, useState } from "react";
import { FormInfo } from "./Components/FormularioCadastro/FormInfo";
import { FormEndereco } from "./Components/FormularioCadastro/FormEndereco";
import { api } from "../../provider/apiProvider"

export const FichaInscricao = () => {
    const [tabAtiva, setTabAtiva] = useState("info");
    const [infoConcluido, setInfoConcluido] = useState(false);
    const [enderecoConcluido, setEnderecoConcluido] = useState(false);
    const [maiorIdade, setMaiorIdade] = useState(true);

    const [userInfo, setUserInfo] = useState({
        nome: null,
        email: null,
        dataNascimento: null,
        cpf: null,
        rg: null,
        nomeSocial: null,
        genero: null,
        celular: null,
        nacionalidade: null,
        naturalidade: null,
        telefone: null,
        profissao: null,
        ativo: null,
        temAtestado: null,
        temAssinatura: null,
        deficiencia: null,
        autorizado: null,
        dataInclusao: null,
        endereco: {
          logradouro: null,
          numLogradouro: null,
          bairro: null,
          cidade: null,
          cep: null
        }
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

    useEffect(() => {
        console.log(userInfo)
    }, [userInfo])

    useEffect(() => {
        cadastrarAluno()
    }, [])

    function cadastrarAluno() {
        api
          .post("/alunos", {
            nome: "Lucas Almeida Ferreira",
            email: "lucas.ferreira@example.com",
            dataNascimento: "1987-11-22",
            cpf: "48249488008",
            rg: "298765432",
            nomeSocial: "Lucas Ferreira",
            genero: "Masculino",
            celular: "(21) 99876-5432",
            nacionalidade: "Brasileira",
            naturalidade: "Rio de Janeiro",
            telefone: "(21) 3222-3344",
            profissao: "Engenheiro Civil",
            ativo: true,
            temAtestado: true,
            temAssinatura: false,
            deficiencia: "Visual parcial",
            autorizado: true,
            dataInclusao: "2025-04-18T14:45:00Z",
            endereco: {
              logradouro: "Avenida Central",
              numLogradouro: "456",
              bairro: "Centro",
              cidade: "Rio de Janeiro",
              cep: "20010-000"
            }
          })
          .then((response) => console.log(response.data))
          .catch((error) => console.error("Erro ao adicionar aluno:", error));
    }

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