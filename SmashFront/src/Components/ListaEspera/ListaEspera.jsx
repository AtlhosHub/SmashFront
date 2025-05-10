import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader"
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb"
import { DefaultButton } from "../DefaultComponents/DefaultButton/DefaultButton"
import { DefaultTable } from "../DefaultComponents/DefaultTable/DefaultTable";
import { ToastContainer } from "react-toastify"
import { api } from "../../provider/apiProvider"
import {
  Box,
  InputAdornment,
  TextField
} from "@mui/material"
import { useEffect, useRef, useState } from "react"
import {
  Add,
  Search
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import { getMonthRange } from "../DefaultComponents/DefaultFilter/utils/getMonthRange";
import ActionMenu from "../iconButton/iconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { dateFormater } from "../../utils/dateFormaterService";
import { ModalDelete } from "../Modals/ModalDelete/ModalDelete";

export const ListaEspera = () => {
  const navigate = useNavigate();

  const timeoutRef = useRef(null);
  const searchValueRef = useRef("");
  const [searchValue, setSearchValue] = useState("");
  const [rowToDelete, setRowToDelete] = useState(undefined);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const headCells = [
    { name: "nome", description: "Nome", cellWidth: "40%" },
    { name: "dataInteresse", description: "Data de Contato", cellWidth: "33%" },
    { name: "horarioPreferencia", description: "Horário de Preferência", cellWidth: "33%" },
  ];

  const [rowData, setRowData] = useState([]);

  const rotas = [
    { route: "/listaEspera", description: "Lista de Espera" }
  ];

  const handleApplyFilter = () => {
    const filtro = {
      nome: searchValueRef.current || null,
    };
    fetchListaEspera(filtro);
  };

  useEffect(() => {
    handleApplyFilter();
  }, []);

  const handleInputChange = e => {
    const v = e.target.value;
    setSearchValue(v);
    searchValueRef.current = v;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleApplyFilter, 800);
  };

  const fetchListaEspera = (filtro) => {
    api.post("/lista-espera/filtro", filtro, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    })
      .then((res) => {
        console.log("Resposta da API:", res.data);
        const formattedData = res.data.map((item) => ({
          ...item,
          dataInteresse: item.dataInteresse ? dateFormater(item.dataInteresse) : null,
        }));

        setRowData(formattedData);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.data.message === "JWT strings must contain exactly 2 period characters. Found: 0") {
          sessionStorage.clear();
          navigate("/", { state: { tokenLogout: true } });
        }
        console.error("Erro ao buscar lista de espera:", error)
      });
  };

  const handleDelete = (id) => {
    api.delete(`lista-espera/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
      }
    })
      .then(() => {
        toasterMsg("success", "Perfil de Pessoa Interessada deletado com sucesso!");
        setIsModalDeleteOpen(false);
        fetchListaEspera({});
        setRowToDelete(undefined);
      })
      .catch((error) => {
        toasterMsg("error", "Algum ero aconteceu, por favor contacte os admnistradores.")
        console.error("Erro ao excluir Pessoa Interessada:", error)
      })
  }

  return (
    <>
      <Box>
        <DefaultHeader pageTitle="Lista de Espera" />
        <DefaultBreadcrumb rotas={rotas} />
      </Box>
      <Box className="main-content">
        <Box className="action-area">
          <TextField
            value={searchValue}
            onChange={handleInputChange}
            label="Nome"
            variant="outlined"
            size="small"
            sx={{

              '& .MuiInputBase-root': {
                borderRadius: '8px',
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: 'black',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              )
            }}
          />
          <DefaultButton
            variant="contained"
            label="Novo Cadastro"
            endIcon={<Add />}
            onClick={() => navigate("/cadastrarListaEspera", { state: { operacao: "cadastro" } })}
          />
        </Box>
        <Box>
          <DefaultTable
            headCells={headCells}
            rowData={rowData.map(row => ({
              ...row,
              acoes: <ActionMenu menuOptions={[
                {
                  label: 'Visualizar',
                  icon: <VisibilityIcon fontSize="small" />,
                  onClickFunc: () => {
                    navigate("/cadastrarListaEspera", {
                      state: {
                        idPessoa: row.id,
                        operacao: "visualizacao"
                      }
                    })
                  }
                },
                {
                  label: 'Editar',
                  icon: <EditIcon fontSize="small" />,
                  onClickFunc: () => {
                    navigate("/cadastrarListaEspera", {
                      state: {
                        idPessoa: row.id,
                        operacao: "edicao"
                      }
                    })
                  }
                },
                {
                  label: 'Excluir',
                  icon: <DeleteIcon fontSize="small" />,
                  onClickFunc: () => {
                    setRowToDelete(row.id);
                    setIsModalDeleteOpen(true);
                  }
                },
              ]} />
            }))}
            withActions={false}
          />
        </Box>
      </Box>
      <ToastContainer />
      <ModalDelete
        isModalOpen={isModalDeleteOpen}
        setIsModalOpen={setIsModalDeleteOpen}
        handleDelete={() => handleDelete(rowToDelete)}
      />
    </>
  );
};