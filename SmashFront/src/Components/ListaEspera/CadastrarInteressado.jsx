import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader";
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb";
import { FormPerfilInteressado } from "./FormPerfilInteressado";
import { api } from "../../provider/apiProvider";

export const CadastrarInteressado = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const operacao = state?.operacao || "cadastro";

  const rotas = [
    { route: "/listaEspera", description: "Lista de Espera" },
    { route: "/cadastrarListaEspera", description: "Perfil do Interessado" },
  ];  

  const [perfil, setPerfil] = useState({
    nome: "",
    nomeSocial: "",
    telefone: "",
    genero: "",
    dataNascimento: null,
    email: "",
    dataContato: null,
    celular: "",
    horarioPreferencia: "",
  });
  const [botaoLiberado, setBotaoLiberado] = useState(false);
  const [concluido, setConcluido] = useState(false);
  

  useEffect(() => {
    if (concluido) {
      api.post("/lista-espera", perfil, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      })
        .then(() => navigate("/listaEspera"))
        .catch(console.error);
    }
  }, [concluido]);

  return (
    <>
      <Box>
        <DefaultHeader pageTitle="Perfil do Interessado" />
        <DefaultBreadcrumb rotas={rotas} />
      </Box>

      {/* Conteúdo principal */}
      <Box className="main-content" sx={{ px: 4, py: 2 }}>
        <FormPerfilInteressado
          perfil={perfil}
          setPerfil={setPerfil}
          operacao={operacao}
          botaoLiberado={botaoLiberado}
          setBotaoLiberado={setBotaoLiberado}
          setConcluido={setConcluido}
        />
      </Box>
    </>
  );
};