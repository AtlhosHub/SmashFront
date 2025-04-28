import { Box } from "@mui/material";
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader";
import { MenuCadastro } from "./Components/MenuCadastro/MenuCadastro";
import { useEffect, useState } from "react";
import { FormInfo } from "./Components/FormularioCadastro/FormInfo";
import { FormEndereco } from "./Components/FormularioCadastro/FormEndereco";
import { api } from "../../provider/apiProvider"
import { FormResponsavel } from "./Components/FormularioCadastro/FormResponsavel";
import { useLocation, useNavigate } from "react-router-dom";

export const FichaInscricao = () => {
    const location = useLocation();
    const navigate = useNavigate();

    //Variaveis de Controle Tela
    const [tabAtiva, setTabAtiva] = useState("info");
    const [infoConcluido, setInfoConcluido] = useState(false);
    const [enderecoConcluido, setEnderecoConcluido] = useState(false);
    const [respConcluido, setRespConcluido] = useState(false);
    const [operacao, setOperacao] = useState(location.state?.operacao || "cadastro");

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
        responsaveis: [
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
            id: sessionStorage.getItem("idUsuario"),
        }
    });

    const rotas = [
        {
            route: "/alunos",
            description: "Lista de Alunos"
        },
        {
            route: "/fichaInscricao",
            description: "Ficha de Inscrição"
        }
    ]

    const cadastrarAluno = () => {
        const dadosAluno = { ...userInfo };

        if (maiorIdade) {
            dadosAluno.responsaveis = [];
        }

        api.post("/alunos", dadosAluno, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then(() => {
                navigate("/alunos", { state: { userCreated: true } })
            })
            .catch((error) => console.error("Erro ao adicionar aluno:", error));
    }

    useEffect(() => {
        if (operacao === "visualizacao") {
            listarDadosAluno(location.state?.idAluno);
        }
    }, []);

    const listarDadosAluno = (id) => {
        api.get(`/alunos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                setUserInfo(response.data)
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
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
                        operacao={operacao}
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
                            operacao={operacao}
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
                            operacao={operacao}
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
                            operacao={operacao}
                        />
                    }
                </Box>
            </Box >
        </>
    );
}