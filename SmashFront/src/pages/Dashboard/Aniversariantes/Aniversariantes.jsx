import { Box } from "@mui/material"
import CakeIcon from '@mui/icons-material/Cake';
import dayjs from "dayjs";
import "./Aniversariantes.css"
import { meses } from "./enum";
import { useEffect, useState } from "react";

export const Aniversariantes = ({ alunos }) => {
    const dataAtual = dayjs().startOf("day");
    const [respostaFormatada, setRespostaFormatada] = useState([]);

    const formatarResposta = () => {
        const respostaObj = {};

        alunos.forEach(({ nomeAluno, dataNascimento }) => {
            const date = new Date(dataNascimento);
            const dia = String(date.getUTCDate()).padStart(2, '0');
            const mes = date.getUTCMonth(); // 0 a 11
            const nomeMes = meses[mes];
            const mesStr = String(mes + 1).padStart(2, '0');

            if (!respostaObj[nomeMes]) respostaObj[nomeMes] = [];

            respostaObj[nomeMes].push({
                nome: nomeAluno,
                data: `${dia}/${mesStr}`
            });
        });

        Object.keys(respostaObj).forEach(mes => {
            respostaObj[mes].sort((a, b) => {
                const diaA = parseInt(a.data.split('/')[0], 10);
                const diaB = parseInt(b.data.split('/')[0], 10);
                return diaA - diaB;
            });
        });

        // Converte para array e ordena meses corretamente
        const resultado = Object.entries(respostaObj).sort(
            ([mesA], [mesB]) => meses.indexOf(mesA) - meses.indexOf(mesB)
        );

        setRespostaFormatada(resultado);
    };

    const verificarAniversario = (data) => {
        const [dia, mes] = data.split("/");
        const anoAtual = dayjs().year();

        const dataFormatada = dayjs(`${anoAtual}-${mes}-${dia}`).startOf("day");
        if (dataFormatada.isBefore(dataAtual)) return "niver-passado"
        else if (dataFormatada.isAfter(dataAtual)) return "niver-futuro"
        else return "niver-atual";
    }

    useEffect(() => {
        formatarResposta(alunos);
    }, [alunos])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                bgcolor: "white",
                border: "1px solid black",
                height: "506px",
                overflowY: "scroll",
                p: "30px 40px",
                boxSizing: "border-box",
            }}
            className="datas-box"
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.8 }}>
                <Box
                    sx={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <CakeIcon />Aniversariantes
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <span style={{ fontWeight: 300 }}>Hoje:</span>
                    <span style={{ fontWeight: 700 }}>{dataAtual.format("DD/MM/YYYY")}</span>
                </Box>
            </Box>
            <Box>
                {respostaFormatada.map(([mes, aniversariantes]) => (
                    <Box className="niver-wrap" key={mes}>
                        <Box className="mes-niver-box atual">
                            <span>
                                {mes.toUpperCase()}
                            </span>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            {aniversariantes.map(({ nome, data }) => {
                                const classe = verificarAniversario(data);
                                const aniversario = classe === "niver-atual";
                                return (
                                    <Box className="niver-box">
                                        <span className={classe}>{data} - {nome}{aniversario && " 🎉"}</span>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}