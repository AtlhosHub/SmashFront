import { Square } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { meses } from "../Aniversariantes/enum";

export const Grafico = ({ dadosDash }) => {
    const data = dadosDash?.map(row => {
        const mesIndex = (row.mes.meses || row.mes) - 1;
        const mesNome = meses[mesIndex];
        const mesPascal = mesNome.charAt(0).toUpperCase() + mesNome.slice(1).toLowerCase();
        return {
            ...row,
            mes: mesPascal
        };
    });

    const getTotalTickes = () => {
        let maxTicks = 0;
        let ticksArray = [];

        data.forEach((row) => {
            let totalSum = row.pagos + row.pagos_com_desconto + row.atrasados;
            maxTicks = totalSum > maxTicks ? totalSum : maxTicks;
        });

        for (let index = 0; index < maxTicks; index += 10) {
            ticksArray.push(index);
        }

        return ticksArray;
    };

    return (
        <Box
            sx={{
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "10px",
                pr: "2.5rem",
            }}
        >
            <Box
                sx={{
                    py: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    pl: "2.5rem",
                    pr: "0.4rem",
                }}
            >
                <span style={{ color: "black", fontWeight: 700, fontSize: "1.3rem" }}>
                    Status de Pagamento
                </span>
                <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    <Box sx={{ color: "black", display: "flex" }}>
                        <Square sx={{ color: "#286DA8" }} />
                        Pago
                    </Box>
                    <Box sx={{ color: "black", display: "flex" }}>
                        <Square sx={{ color: "#FFAE03" }} />
                        Pago com Desconto
                    </Box>
                    <Box sx={{ color: "black", display: "flex" }}>
                        <Square sx={{ color: "#CF3333" }} />
                        Atrasado
                    </Box>
                </Box>
            </Box>
            {dadosDash?.length > 0 ?
                <ResponsiveContainer width="100%" height={302}>
                    <BarChart data={data}>
                        <XAxis dataKey="mes" />
                        <YAxis type="number" ticks={getTotalTickes()} />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="0 0" />
                        <Bar dataKey="pagos" stackId="a" fill="#286DA8" name="Pago" />
                        <Bar dataKey="pagos_com_desconto" stackId="a" fill="#FFAE03" name="Pago com Desconto" />
                        <Bar dataKey="atrasados" stackId="a" fill="#CF3333" name="Atrasado" />
                    </BarChart>
                </ResponsiveContainer>
                :
                <Box sx={{ height: 302, ml: "2.5rem", pb: "1.2rem", boxSizing: "border-box" }}>
                    <Box
                        sx={{
                            background: "rgb(243, 249, 249)",
                            border: "2px solid #bfbfbf",
                            borderRadius: 2,
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Typography sx={{ fontWeight: 600, color: "#c7c7c7" }}>NENHUM DADO DISPONÍVEL</Typography>
                    </Box>
                </Box>
            }
        </Box>
    );
};
