import { Box } from "@mui/material";
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader";
import { MenuCadastro } from "./Components/MenuCadastro/MenuCadastro";
import { useState } from "react";
import { FormInfo } from "./Components/FormularioCadastro/FormInfo";
import { FormEndereco } from "./Components/FormularioCadastro/FormEndereco";
import { api } from "../../provider/apiProvider"
import { FormResponsavel } from "./Components/FormularioCadastro/FormResponsavel";
import { useLocation } from "react-router-dom";

export const FichaInscricao = () => {
    const location = useLocation();

    //Variaveis de Controle Tela
    const [tabAtiva, setTabAtiva] = useState("info");
    const [infoConcluido, setInfoConcluido] = useState(false);
    const [enderecoConcluido, setEnderecoConcluido] = useState(false);
    const [respConcluido, setRespConcluido] = useState(false);
    const [operacao, setOperacao] = useState(location.state?.operacao || "");

    // Variaveis de Controle Form
    const [maiorIdade, setMaiorIdade] = useState(true);
    const [cpfValidoAluno, setCpfValidoAluno] = useState(false);
    const [cpfValidoResp, setCpfValidoResp] = useState(false);
    const [cepValido, setCepValido] = useState(false);
    const [isDeficiente, setIsDeficiente] = useState(false)

    // Dados dos Form
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
        ativo: true,
        temAtestado: true,
        deficiencia: null,
        autorizado: null,
        dataInclusao: null,
        endereco: {
            logradouro: null,
            numLogradouro: null,
            bairro: null,
            cidade: null,
            cep: null
        },
        responsavel: [
            {
                nome: null,
                nomeSocial: null,
                cpf: null,
                rg: null,
                profissao: null,
                genero: null,
                telefone: null,
                celular: null,
                email: null
            }
        ],
        usuarioInclusao: {
            id: null
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

    const cadastrarAluno = () => {
        api.post("/alunos", {
                nome: userInfo.nome,
                email: userInfo.email,
                dataNascimento: userInfo.dataNascimento,
                cpf: userInfo.cpf,
                rg: userInfo.rg,
                nomeSocial: userInfo.nomeSocial,
                genero: userInfo.genero,
                celular: userInfo.celular,
                nacionalidade: userInfo.nacionalidade,
                naturalidade: userInfo.naturalidade,
                telefone: userInfo.telefone,
                profissao: userInfo.profissao,
                ativo: userInfo.ativo,
                temAtestado: userInfo.temAtestado,
                deficiencia: userInfo.deficiencia,
                autorizado: userInfo.autorizado,
                dataInclusao: userInfo.dataInclusao,
                endereco: {
                    logradouro: userInfo.endereco.logradouro,
                    numLogradouro: userInfo.endereco.numLogradouro,
                    bairro: userInfo.endereco.bairro,
                    cidade: userInfo.endereco.cidade,
                    cep: userInfo.endereco.cep
                },
                responsaveis: [
                    {
                        nome: userInfo.responsavel[0].nome,
                        nomeSocial: userInfo.responsavel[0].nomeSocial,
                        cpf: userInfo.responsavel[0].cpf,
                        rg: userInfo.responsavel[0].rg,
                        profissao: userInfo.responsavel[0].profissao,
                        genero: userInfo.responsavel[0].genero,
                        telefone: userInfo.responsavel[0].telefone,
                        celular: userInfo.responsavel[0].celular,
                        email: userInfo.responsavel[0].email
                    }
                ],
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
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
                        respConcluido={respConcluido}
                        maiorIdade={maiorIdade}
                        tabAtiva={tabAtiva}
                        setTabAtiva={setTabAtiva}
                    />
                    {tabAtiva === "info" &&
                        <FormInfo
                            userInfo={userInfo}
                            maiorIdade={maiorIdade}
                            cpfValido={cpfValidoAluno}
                            isDeficiente={isDeficiente}
                            setMaiorIdade={setMaiorIdade}
                            setUserInfo={setUserInfo}
                            setTabAtiva={setTabAtiva}
                            setInfoConcluido={setInfoConcluido}
                            setIsDeficiente={setIsDeficiente}
                            setCpfValido={setCpfValidoAluno}
                        />
                    }
                    {tabAtiva === "ende" &&
                        <FormEndereco
                            userInfo={userInfo}
                            maiorIdade={maiorIdade}
                            cepValido={cepValido}
                            setUserInfo={setUserInfo}
                            setEnderecoConcluido={setEnderecoConcluido}
                            setTabAtiva={setTabAtiva}
                            setCepValido={setCepValido}
                            handleConfirmar={cadastrarAluno}
                        />
                    }
                    {tabAtiva === "resp" &&
                        <FormResponsavel
                            userInfo={userInfo}
                            cpfValido={cpfValidoResp}
                            infoConcluido={infoConcluido}
                            enderecoConcluido={enderecoConcluido}
                            setTabAtiva={setTabAtiva}
                            setUserInfo={setUserInfo}
                            setRespConcluido={setRespConcluido}
                            setCpfValido={setCpfValidoResp}
                            handleConfirmar={cadastrarAluno}
                        />
                    }
                </Box>
            </Box >
        </>
    );
}