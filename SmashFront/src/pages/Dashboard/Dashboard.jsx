import { Box } from "@mui/material"
import { DefaultBreadcrumb } from "../../Components/DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb"
import { Kpi } from "../../Components/DefaultComponents/KPI/KPI"
import people from "../../assets/Users.png"
import discount from "../../assets/Discount.png"
import { Grafico } from "./Grafico/Grafico"
import { Aniversariantes } from "./Aniversariantes/Aniversariantes"
import { useEffect } from "react"

export const Dashboard = () => {
    const rotas = [
        {
            route: "/dashboard",
            description: "Dashboard"
        }
    ]

    useEffect(() => {
        document.body.style.backgroundColor = "#F3F9F9";

        return () => {
            document.body.style.backgroundColor = "white"; // volta pro padrão
        };
    }, []);

    const aniversariantes = [
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-04-07T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-06-07T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-07T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-08T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-16T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-14T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-14T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-14T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-14T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-14T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-14T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-14T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-14T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-14T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-14T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-14T00:00:00",
        },
        {
            nomeAluno: "CAROL TEIXEIRA NERES",
            dataNascimento: "2000-05-14T00:00:00",
        },
    ]

    return (
        <Box fontFamily={"Poppins, sans-serif"}
            sx={{
                display: "grid",
                gridTemplateRows: "auto 1fr",
            }}
        >
            <DefaultBreadcrumb rotas={rotas} altura={70} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    p: "30px",
                    gap: "30px",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        boxSizing: "border-box",
                        gap: "30px",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: "30px"
                        }}
                    >
                        <Kpi
                            title="total de alunos ativos"
                            content={"54"}
                            startIcon={
                                <img src={people} />
                            }
                        />
                        <Kpi
                            title="pagamentos com desconto"
                            content={"12"}
                            startIcon={
                                <img
                                    src={discount}
                                />
                            }
                        />
                    </Box>
                    <Grafico />
                </Box>
                <Box
                    sx={{
                        width: "60%",
                    }}
                >
                    <Aniversariantes
                        alunos={aniversariantes}
                    />
                </Box>
            </Box>
        </Box>
    )
}