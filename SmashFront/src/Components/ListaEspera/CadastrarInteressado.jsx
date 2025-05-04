import { Box } from "@mui/material";
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader";
import { MenuCadastro } from "../DefaultComponents/MenuCadastro/MenuCadastro";
import { useEffect, useState } from "react";
import { FormInfo } from "../ListaEspera/FormPerfilInteressado";
import { api } from "../../provider/apiProvider"
import { useLocation, useNavigate } from "react-router-dom";

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import dayjs from "dayjs";

export const CadastrarInteressado = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [tabAtiva, setTabAtiva] = useState("info");
  const [infoConcluido, setInfoConcluido] = useState(false);
  const [operacao, setOperacao] = useState(location.state?.operacao || "cadastro");

  const [userInfo, setUserInfo] = useState({
      nome: null,
      nomeSocial: null,
      genero: null,
      dataContato: null,
      dataNascimento: null,
      celular: null,
      telefone: null,
      email: null,
      horarioPreferencia: null,
      usuarioInclusao: {
          id: sessionStorage.getItem("idUsuario"),
      }
  });

  const definirNomePagina = () => {
    if (operacao === "cadastro") return "Adicionar Ficha de Inscrição"
    if (operacao === "visualizacao") return "Visualizar Ficha de Inscrição"
    return "Editar Ficha de Inscrição"
}
  const etapasMenu = [
      {
          id: "info",
          nome: "Informações",
          Icone: AccountCircleOutlinedIcon,
          visivel: true, 
          concluido: infoConcluido,
          podeAtivar: () => true
      }
  ];
  

  const rotas = [
    { route: "/listaEspera", description: "Lista de Espera" },
    { route: "/cadastrarListaEspera", description: "Perfil do Interessado" },
  ];  

  const cadastrarAluno = () => {
    const payload = {
      nome: userInfo.nome,
      email: userInfo.email,
      dataInteresse: userInfo.dataContato
        ? dayjs(userInfo.dataContato).toISOString()
        : null,
      celular: userInfo.celular,
      nomeSocial: userInfo.nomeSocial,
      genero: userInfo.genero,
      dataNascimento: userInfo.dataNascimento
        ? dayjs(userInfo.dataNascimento).format("YYYY-MM-DD")
        : null,
      telefone: userInfo.telefone,
      horarioPref: { id: userInfo.horarioPreferenciaId },  
    };
  
    api.post("/lista-espera", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
      }
    })
    .then(() => {
      navigate("/listaEspera", { state: { saved: true } });
    })
    .catch(err => {
      if (err.response?.status === 409) {
        alert("Este nome e e-mail já estão cadastrados na lista de espera.");
      } else {
        console.error(err);
        alert("Erro ao cadastrar interessado.");
      }
    });
  };
  
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
                const hoje = dayjs()
                const nascimento = dayjs(response.data.dataNascimento)
                
                setUserInfo(response.data)
                setMaiorIdade(hoje.diff(nascimento, 'year') >= 18);
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
    }

    return (
      <Box sx={{ display: "grid", gridTemplateRows: "auto auto 1fr", height: "100vh" }}>
          <DefaultHeader pageTitle={definirNomePagina()} />
          <DefaultBreadcrumb rotas={rotas} />
          <Box sx={{ display: "flex", flex: 1 }}>
        <MenuCadastro
          operacao="cadastro"
          tabAtiva={tabAtiva}
          setTabAtiva={setTabAtiva}
          etapas={[
            {
              id: "info",
              nome: "Informações",
              Icone: AccountCircleOutlinedIcon,
              visivel: true,
              concluido: infoConcluido,
              podeAtivar: () => true
            }
          ]}
        />
              
              {tabAtiva === "info" &&
                  <FormInfo
                      userInfo={userInfo}
                      setUserInfo={setUserInfo}
                      setInfoConcluido={setInfoConcluido}
                      operacao={operacao}
                      onCancelar={() => navigate("/alunos")}
                      onSalvar={cadastrarAluno}
                  />
              }
          </Box>
      </Box>
  );
}