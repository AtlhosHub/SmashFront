import { Box } from "@mui/material";
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
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
import { defaultUser } from "./utils/defaultUser";
import { setTabName } from "./utils/setTabName";

export const FichaInscricao = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        ...defaultUser,
        usuarioInclusao: { id: sessionStorage.getItem("idUsuario") }
    });

    const [tabAtiva, setTabAtiva] = useState("info");
    const [operacao, setOperacao] = useState(location.state?.operacao || "cadastro");

    const [infoConcluido, setInfoConcluido] = useState(false);
    const [enderecoConcluido, setEnderecoConcluido] = useState(false);
    const [respConcluido, setRespConcluido] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const [maiorIdade, setMaiorIdade] = useState(true);
    const [isDeficiente, setIsDeficiente] = useState(false)
    const [cpfValidoAluno, setCpfValidoAluno] = useState(false);
    const [cpfValidoResp, setCpfValidoResp] = useState(false);
    const [cepValido, setCepValido] = useState(false);

    const rotas = [
        {
            route: "/alunos",
            description: "Lista de Alunos"
        },
        {
            route: "/fichaInscricao",
            description: setTabName(operacao)
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
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg("error", "Erro ao cadastrar aluno, por favor contacte os admnistradores.");
                } else {
                    toasterMsg("error", error.response.data);
                }
            });
    }

    const editarAluno = () => {
        const dadosAluno = {
            ...userInfo,
            usuarioInclusao: { id: sessionStorage.getItem("idUsuario") }
        };

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
                if (error.message.status === 500) {
                    toasterMsg("error", "Erro ao editar aluno, por favor contacte os admnistradores.");
                } else {
                    toasterMsg("error", error.response.data);
                }
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
                if (error.message.status === 500) {
                    toasterMsg("error", "Erro ao deletar aluno, por favor contacte os admnistradores.");
                } else {
                    toasterMsg("error", error.response.data);
                }
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
                if (error.message.status === 500) {
                    toasterMsg("error", "Erro ao listar alunos, por favor contacte os admnistradores.");
                } else {
                    toasterMsg("error", error.response.data);
                }
            })
            .finally(() => {

            })
    }

    useEffect(() => {
        if (operacao !== "cadastro") listarDadosAluno(location.state?.idAluno)
    }, []);

    return (
        <>
            <Box sx={{
                display: "grid",
                gridTemplateRows: "auto 1fr",
                height: "90.9vh"
            }}>
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
                textoModal={"a Ficha de Inscrição do Aluno"}
                isModalOpen={isModalDeleteOpen}
                setIsModalOpen={setIsModalDeleteOpen}
                handleDelete={deletarAluno}
            />
        </>
    );
}