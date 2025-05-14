import { Box } from "@mui/material"
import { DefaultBreadcrumb } from "../../Components/DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb"
import { Kpi } from "../../Components/DefaultComponents/KPI/KPI"
import people from "../../assets/Users.png"
import discount from "../../assets/Discount.png"
import { Grafico } from "./Grafico/Grafico"
import { Aniversariantes } from "./Aniversariantes/Aniversariantes"

export const Dashboard = () => {
    const rotas = [
        {
            route: "/dashboard",
            description: "Dashboard"
        }
    ]

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
    ]



    return (
        <Box fontFamily={"Poppins, sans-serif"}>
            <DefaultBreadcrumb rotas={rotas} />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#F3F9F9",
                    p: "30px",
                    gap: "30px",
                }}>
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
                            title={<span>total de alunos<br />ativos</span>}
                            content={"54"}
                            startIcon={
                                <img src={people} />
                            }
                        />
                        <Kpi
                            title={"PAGAMENTOS COM DESCONTO (MÊS)"}
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
                        width: "100%"
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