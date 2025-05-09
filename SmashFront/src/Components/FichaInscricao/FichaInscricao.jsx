import { Box } from "@mui/material";
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader";
import { MenuCadastro } from "../DefaultComponents/MenuCadastro/MenuCadastro";
import { useEffect, useState } from "react";
import { FormInfo } from "./Components/FormularioCadastro/FormInfo";
import { FormEndereco } from "./Components/FormularioCadastro/FormEndereco";
import { api } from "../../provider/apiProvider"
import { FormResponsavel } from "./Components/FormularioCadastro/FormResponsavel";
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HistoryIcon from '@mui/icons-material/History';
import dayjs from "dayjs";
import { HistPagamento } from "./Components/HistPag/HistPagamento";
import { toasterMsg } from "../../utils/toasterService";
import { ToastContainer } from "react-toastify";
import { ModalDelete } from "../Modals/ModalDelete/ModalDelete";
import { tokenValidationFunction } from "../../utils/tokenValidationFunction";

export const FichaInscricao = () => {
    const location = useLocation();
    const navigate = useNavigate();

    //Variaveis de Controle Tela
    const [tabAtiva, setTabAtiva] = useState("info");
    const [infoConcluido, setInfoConcluido] = useState(false);
    const [enderecoConcluido, setEnderecoConcluido] = useState(false);
    const [respConcluido, setRespConcluido] = useState(false);
    const [operacao, setOperacao] = useState(location.state?.operacao || "cadastro");
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    // Variaveis de Controle Form
    const [maiorIdade, setMaiorIdade] = useState(true);
    const [cpfValidoAluno, setCpfValidoAluno] = useState(false);
    const [cpfValidoResp, setCpfValidoResp] = useState(false);
    const [cepValido, setCepValido] = useState(false);
    const [isDeficiente, setIsDeficiente] = useState(false)

    const definirNomePagina = () => {
        if (operacao === "cadastro") return "Adicionar Ficha de Inscrição"
        if (operacao === "visualizacao") return "Visualizar Ficha de Inscrição"
        return "Editar Ficha de Inscrição"
    }

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
            description: definirNomePagina()
        }
    ]

    const etapasMenu = [
        {
            id: "info",
            nome: "Informações",
            Icone: AccountCircleOutlinedIcon,
            visivel: true,
            concluido: infoConcluido,
            podeAtivar: () => true
        },
        {
            id: "ende",
            nome: "Endereço",
            Icone: FmdGoodOutlinedIcon,
            visivel: true,
            concluido: enderecoConcluido,
            podeAtivar: () => infoConcluido
        },
        {
            id: "resp",
            nome: "Responsável",
            Icone: FamilyRestroomIcon,
            visivel: !maiorIdade,
            concluido: respConcluido,
            podeAtivar: () => infoConcluido && enderecoConcluido
        },
        {
            id: "paga",
            nome: "Histórico de Pagamento",
            Icone: HistoryIcon,
            visivel: operacao === "visualizacao",
            concluido: true,
            podeAtivar: () => true
        }
    ];

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
        if (operacao !== "cadastro") {
            listarDadosAluno(location.state?.idAluno);
        }
    }, []);

    const editarAluno = () => {
        const dadosAluno = { ...userInfo };

        if (maiorIdade) {
            dadosAluno.responsaveis = [];
        }

        api.put(`/alunos/${userInfo.id}`, dadosAluno, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then(() => {
                toasterMsg("success", "Aluno editado com sucesso!");
                setOperacao("visualizacao")
            })
            .catch((error) => {
                toasterMsg("error", "Algum erro aconteceu, por favor contacte os admnistradores.")
                console.error("Erro ao editar aluno:", error)
            })
    }

    const deletarAluno = () => {
        api.delete(`/alunos/${userInfo.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then(() => {
                navigate("/alunos", { state: { userCreated: true } })
            })
            .catch((error) => {
                toasterMsg("error", "Algum ero aconteceu, por favor contacte os admnistradores.")
                console.error("Erro ao excluir aluno:", error)
            })
    }

    const listarDadosAluno = (id) => {
        api.get(`/alunos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                const hoje = dayjs()
                const nascimento = dayjs(response.data.dataNascimento)

                setUserInfo(response.data)
                setMaiorIdade(hoje.diff(nascimento, 'year') >= 18);
            })
            .catch((error) => {
                toasterMsg("error", "Algum ero aconteceu, por favor contacte os admnistradores.")
                console.error("Erro ao exibir aluno:", error)
            })
    }

    useEffect(() => {
        const validateToken = async () => {
            const isValid = await tokenValidationFunction();
            if (!isValid) {
                navigate("/", { state: { tokenLogout: true } });
            }
        };

        validateToken();
    }, []);


    return (
        <>
            <Box sx={{
                display: "grid",
                gridTemplateRows: "auto auto 1fr",
                height: "100vh",
            }}>
                <DefaultHeader pageTitle={definirNomePagina()} />
                <DefaultBreadcrumb rotas={rotas} />
                <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
                    <MenuCadastro
                        operacao={operacao}
                        tabAtiva={tabAtiva}
                        setTabAtiva={setTabAtiva}
                        etapas={etapasMenu}
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
                            setOperacao={setOperacao}
                            setIsModalDeleteOpen={setIsModalDeleteOpen}
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
                            setOperacao={setOperacao}
                            handleSalvar={editarAluno}
                            setIsModalDeleteOpen={setIsModalDeleteOpen}
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
                            setOperacao={setOperacao}
                            handleSalvar={editarAluno}
                            setIsModalDeleteOpen={setIsModalDeleteOpen}
                        />
                    }
                    {tabAtiva === "paga" &&
                        <HistPagamento
                            userInfo={userInfo}
                        />
                    }
                </Box>
            </Box >
            <ToastContainer />
            <ModalDelete
                isModalOpen={isModalDeleteOpen}
                setIsModalOpen={setIsModalDeleteOpen}
                handleDelete={deletarAluno}
            />
        </>
    );
}