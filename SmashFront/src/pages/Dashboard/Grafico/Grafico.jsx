import { Square } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export const Grafico = () => {
    const data = [
        { mes: "Jan", normal: 30, desconto: 15, atraso: 5 },
        { mes: "Fev", normal: 25, desconto: 20, atraso: 7 },
        { mes: "Mar", normal: 28, desconto: 18, atraso: 3 },
        { mes: "Abr", normal: 20, desconto: 22, atraso: 10 },
        { mes: "Mai", normal: 33, desconto: 15, atraso: 4 },
        { mes: "Jun", normal: 27, desconto: 20, atraso: 5 },
        { mes: "Jul", normal: 22, desconto: 25, atraso: 4 },
        { mes: "Ago", normal: 35, desconto: 12, atraso: 5 },
        { mes: "Set", normal: 30, desconto: 16, atraso: 6 },
        { mes: "Out", normal: 29, desconto: 18, atraso: 3 },
        { mes: "Nov", normal: 26, desconto: 20, atraso: 6 },
        { mes: "Dez", normal: 24, desconto: 19, atraso: 8 },
    ];

    const getTotalTickes = () => {
        let maxTicks = 0;
        let ticksArray = [];

        data.forEach((row) => {
            let totalSum = row.normal + row.desconto + row.atraso;
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
                        <Square sx={{ color: "#17778D" }} />
                        Pago
                    </Box>
                    <Box sx={{ color: "black", display: "flex" }}>
                        <Square sx={{ color: "#FFAE03" }} />
                        Pago com Desconto
                    </Box>
                    <Box sx={{ color: "black", display: "flex" }}>
                        <Square sx={{ color: "#CF3333" }} />
                        Em Atraso
                    </Box>
                </Box>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="mes" />
                    <YAxis type="number" ticks={getTotalTickes()} />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="0 0" />
                    <Bar dataKey="normal" stackId="a" fill="#17778D" name="Pago Normal" />
                    <Bar dataKey="desconto" stackId="a" fill="#FFAE03" name="Pago com Desconto" />
                    <Bar dataKey="atraso" stackId="a" fill="#CF3333" name="Em Atraso" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};
