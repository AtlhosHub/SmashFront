import { Box, Tooltip } from "@mui/material"
import { DefaultButton } from "../../../DefaultComponents/DefaultButton/DefaultButton"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DefaultTable } from "../../../DefaultComponents/DefaultTable/DefaultTable";
import { dateFormater } from "../../../../utils/dateFormaterService";
import { api } from "../../../../provider/apiProvider";


export const HistPagamento = ({ userInfo }) => {
    const [selectedMonth, setSelectedMonth] = useState(null);

    const headCells = [
        {
            name: "dataEnvio",
            description: "Data de Envio",
            align: "center"
        },
        {
            name: "formaPagamento",
            description: "Forma de Pagamento",
            align: "center"
        },
        {
            name: "valor",
            description: "Valor Pago",
            align: "center"
        }
    ]

    const [rowData, setRowData] = useState([])

    useEffect(() => {
        listarHistoricoPagamento(userInfo.id)
    }, [])

    const handleBuscarClick = () => {
        if (selectedMonth) {
            const dateFrom = dayjs(selectedMonth).startOf('month').format('YYYY-MM-DD');
            const dateTo = dayjs(selectedMonth).endOf('month').format('YYYY-MM-DD');
            listarHistoricoPagamento(userInfo.id, dateFrom, dateTo);
        } else {
            listarHistoricoPagamento(userInfo.id, null, null);
        }
    };

    const listarHistoricoPagamento = (id, dateFrom, dateTo) => {
        api.post(
            `/alunos/${id}/historicoMensalidade`,
            {
                dateFrom: dateFrom || null,
                dateTo: dateTo || null
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
                }
            }
        )
            .then((response) => {
                const formattedData = response.data.map((aluno) => ({
                    ...aluno,
                    dataEnvio: aluno.dataEnvio ? dateFormater(aluno.dataEnvio) : null,
                    valor: aluno.valor != null
                        ? aluno.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        : null,
                    valorColor: aluno.desconto ? '#286DA8' : 'inherit'
                }));

                setRowData(formattedData);
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "25px", pt: "30px", pr: "30px", flex: 1 }}>
            <h2 style={{ textTransform: "uppercase", color: "black" }}>{userInfo.nome}</h2>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        size="small"
                        value={selectedMonth}
                        format="MMMM/YYYY"
                        views={['year', 'month']}
                        maxDate={dayjs().endOf('year')}
                        onChange={(e) => setSelectedMonth(e)}
                        slotProps={{
                            textField: { size: "small", placeholder: "Mês/Ano" },
                        }}
                        sx={{
                            "& .MuiInputBase-root": {
                                height: "35px",
                                borderRadius: "8px"
                            },
                            '& .MuiInputBase-input.Mui-disabled': {
                                "-webkit-text-fill-color": "rgba(0, 0, 0, 0.60)"
                            },
                            '& .MuiInputBase-input': {
                                textTransform: "capitalize"
                            },
                            width: "200px",
                        }}
                    />
                </LocalizationProvider>
                <DefaultButton
                    label="Buscar"
                    variant="contained"
                    onClick={handleBuscarClick}
                />
                <DefaultButton
                    label="Limpar"
                    variant="outlined"
                    onClick={() => selectedMonth(undefined)}
                />
            </Box>
            <DefaultTable
                headCells={headCells}
                rowData={rowData.map(row => ({
                    ...row,
                    valor: row.desconto ? (
                        <Tooltip title="Pago com desconto" arrow placement="top">
                            <span style={{ color: row.valorColor }}>
                                {row.valor}
                            </span>
                        </Tooltip>
                    ) : (
                        <span style={{ color: row.valorColor }}>
                            {row.valor}
                        </span>
                    )
                }))}
                withPagStatus={true}
            />
        </Box>
    )
}