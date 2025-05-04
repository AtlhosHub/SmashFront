import { Box } from "@mui/material"
import { DefaultButton } from "../../../DefaultComponents/DefaultButton/DefaultButton"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { DefaultTable } from "../../../DefaultComponents/DefaultTable/DefaultTable";
import { dateFormater } from "../../../../utils/dateFormaterService";

export const HistPagamento = ({ userInfo }) => {
    const [filtroData, setFiltroData] = useState();

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

    const rowData = [
        {
            dataEnvio: dateFormater("2025-05-02T15:50:43.756066800"),
            formaPagamento: "PIX",
            valor: "R$100,00",
            status: "PAGO"
        }
    ]

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "25px", pt: "30px", pr: "30px", flex: 1 }}>
            <h2 style={{ textTransform: "uppercase", color: "black" }}>{userInfo.nome}</h2>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        size="small"
                        value={filtroData}
                        format="MMMM/YYYY"
                        views={['year', 'month']}
                        maxDate={dayjs()}
                        onChange={(e) => setFiltroData(e)}
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
                />
                <DefaultButton
                    label="Limpar"
                    variant="outlined"
                    onClick={() => setFiltroData(undefined)}
                />
            </Box>
            <DefaultTable
                headCells={headCells}
                rowData={rowData}
                withPagStatus={true}
            />
        </Box>
    )
}