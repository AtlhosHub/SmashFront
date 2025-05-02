import { DefaultHeader } from "../DefaultComponents/DefaultHeader/DefaultHeader"
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb"
import { DefaultButton } from "../DefaultComponents/DefaultButton/DefaultButton"
import { DefaultTable } from "../DefaultComponents/DefaultTable/DefaultTable";
import DefaultFilter from "../DefaultComponents/DefaultFilter/DefaultFilter"
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

export const ListaEspera = () => {
  const navigate = useNavigate();

  const timeoutRef = useRef(null);
  const searchValueRef = useRef("");
  const [searchValue, setSearchValue] = useState("");
  const [statusFiltro, setStatusFiltro] = useState(null);
  const [dateRange, setDateRange] = useState(getMonthRange());

  const headCells = [
    { name: "nome", description: "Nome" },
    { name: "dataInteresse", description: "Data de Contato" },
    { name: "horarioPreferencia", description: "Horário de Preferência" },

  ]

  const [rowData, setRowData] = useState([]);

  const rotas = [
    { route: "/listaEspera", description: "Lista de Espera" }
  ];

  const handleApplyFilter = () => {
    const filtro = {
      nome: searchValueRef.current || null,
      status: statusFiltro?.label,
      dataFrom: dateRange[0]?.format("YYYY-MM-DD"),
      dataTo:   dateRange[1]?.format("YYYY-MM-DD")
    };
    fetchListaEspera(filtro);
  }

  const handleClearFilter = () => {
    setStatusFiltro(null);
    setDateRange([null, null]);
  }

  useEffect(() => {
    handleApplyFilter();
  }, []);

  const handleInputChange = e => {
    const v = e.target.value;
    setSearchValue(v);
    searchValueRef.current = v;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleApplyFilter, 800);
  }

  const fetchListaEspera = filtro => {
    api.post("/lista-espera/filtro", filtro, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
      }
    })
      .then(res => setRowData(res.data))
      .catch(err => console.error("Erro ao buscar lista de espera:", err));
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              )
            }}
          />
          <DefaultFilter
            statusPagamento={statusFiltro}
            dateRange={dateRange}
            setDateRange={setDateRange}
            setStatusPagamento={setStatusFiltro}
            handleApplyFilter={handleApplyFilter}
            handleClearFilter={handleClearFilter}
          />
          <DefaultButton
            variant="contained"
            label="Novo Cadastro"
            endIcon={<Add />}
            onClick={() => navigate("/cadastrarListaEspera", { state:{ operacao:"cadastrar" } })}
          />
        </Box>
        <Box>
          <DefaultTable
            headCells={headCells}
            rowData={rowData}
            withActions={true}
          />
        </Box>
      </Box>
      <ToastContainer />
    </>
  )
}
