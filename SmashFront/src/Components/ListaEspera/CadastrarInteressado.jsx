import { Box } from "@mui/material";
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader";
import { MenuCadastro } from "../DefaultComponents/MenuCadastro/MenuCadastro";
import { useEffect, useState } from "react";
import { FormInfo } from "../ListaEspera/FormPerfilInteressado";
import { tokenValidationFunction } from "../../utils/tokenValidationFunction";
import { api } from "../../provider/apiProvider"
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toasterMsg } from "../../utils/toasterService";
import { ModalDelete } from "../Modals/ModalDelete/ModalDelete";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import dayjs from "dayjs";

export const CadastrarInteressado = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [tabAtiva, setTabAtiva] = useState("info");
  const [infoConcluido, setInfoConcluido] = useState(false);
  const [operacao, setOperacao] = useState(location.state?.operacao);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({
    nome: null,
    nomeSocial: null,
    genero: null,
    dataInteresse: null,
    dataNascimento: null,
    celular: null,
    telefone: null,
    email: null,
    horarioPref: null,
    usuarioInclusao: {
      id: sessionStorage.getItem("idUsuario"),
    }
  });

  const definirNomePagina = () => {
    if (operacao === "cadastro") return "Adicionar Perfil do Interessado"
    if (operacao === "visualizacao") return "Visualizar Perfil do Interessado"
    return "Editar Perfil do Interessado"
  }

  const rotas = [
    { route: "/listaEspera", description: "Lista de Espera" },
    { route: "/cadastrarListaEspera", description: definirNomePagina() },
  ];

  const cadastrarPessoaInteressada = () => {
    const payload = {
      nome: userInfo.nome,
      email: userInfo.email,
      dataInteresse: userInfo.dataInteresse
        ? dayjs(userInfo.dataInteresse).toISOString()
        : null,
      celular: userInfo.celular,
      nomeSocial: userInfo.nomeSocial,
      genero: userInfo.genero,
      dataNascimento: userInfo.dataNascimento
        ? dayjs(userInfo.dataNascimento).format("YYYY-MM-DD")
        : null,
      telefone: userInfo.telefone,
      horarioPref: userInfo.horarioPref,
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
    if (operacao !== "cadastro") {
      listarDadosPessoaInteressada(location.state?.idPessoa);
    }
  }, []);

  const listarDadosPessoaInteressada = (id) => {
    api.get(`/lista-espera/${id}`, {
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

  const editarPessoaInteressada = () => {
    api.put(`/lista-espera/${location.state?.idPessoa}`, userInfo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
      }
    })
      .then(() => {
        toasterMsg("success", "Perfil de Pessoa Interessada editado com sucesso!");
        setOperacao("visualizacao")
      })
      .catch((error) => {
        toasterMsg("error", "Algum erro aconteceu, por favor contacte os admnistradores.")
        console.error("Erro ao editar Perfil de Pessoa Interessada:", error)
      })
  }

  const deletarPessoaInteressada = () => {
    api.delete(`lista-espera/${location.state?.idPessoa}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
      }
    })
      .then(() => {
        toasterMsg("success", "Perfil de Pessoa Interessada deletado com sucesso!");
        navigate("/listaEspera", { state: { userDeleted: true } })
      })
      .catch((error) => {
        toasterMsg("error", "Algum ero aconteceu, por favor contacte os admnistradores.")
        console.error("Erro ao excluir Perfil de Pessoa Interessada:", error)
      })
  }

  return (
    <>
      <Box sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "90.9vh"
      }}>
        <DefaultBreadcrumb rotas={rotas} />
        <Box sx={{ display: "flex", flex: 1 }}>
          <MenuCadastro
            operacao={operacao}
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
              setOperacao={setOperacao}
              operacao={operacao}
              handleSalvar={editarPessoaInteressada}
              handleCadastrar={cadastrarPessoaInteressada}
              handleDeletar={() => setIsModalDeleteOpen(true)}
            />
          }
        </Box>
      </Box>
      <ToastContainer />
      <ModalDelete
        textoModal={"o perfil de Pessoa Interessada"}
        isModalOpen={isModalDeleteOpen}
        setIsModalOpen={setIsModalDeleteOpen}
        handleDelete={deletarPessoaInteressada}
      />
    </>
  );
}