import { Box } from "@mui/material"
import { DefaultBreadcrumb } from "../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb"
import { Kpi } from "../DefaultComponents/KPI/KPI"
import people from "../../assets/Users.png"
import discount from "../../assets/Discount.png"
import { Grafico } from "./Grafico/Grafico"
import { Aniversariantes } from "./Aniversariantes/Aniversariantes"
import { useEffect, useState } from "react"
import { api } from "../../provider/apiProvider"

export const Dashboard = () => {
    const rotas = [
        {
            route: "/dashboard",
            description: "Dashboard"
        }
    ]

    const [aniversariantes, setAniversariantes] = useState([])
    const [qtdAlunosAtivos, setQtdAlunosAtivos] = useState("0")
    const [qtdPagamentosComDesconto, setQtdPagamentosComDesconto] = useState("0")
    const [dadosDash, setDadosDash] = useState([])

    useEffect(() => {
        document.body.style.backgroundColor = "#F3F9F9";

        return () => {
            document.body.style.backgroundColor = "white";
        };
    }, []);

    useEffect(() => {
        listarAniversariantes();
        listarQtdAlunosAtivos();
        listarPagamentosComDesconto();
        listarDadosDashboard();
    }, [])

    const listarAniversariantes = () => {
        api.get("/alunos/aniversariantes", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                setAniversariantes(response.data)
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.data.message === "JWT strings must contain exactly 2 period characters. Found: 0") {
                    sessionStorage.clear();
                    navigate("/", { state: { tokenLogout: true } });
                }
                console.error("Erro ao buscar dados:", error)
            });
    }

    const listarQtdAlunosAtivos = () => {
        api.get("/alunos/ativos", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                setQtdAlunosAtivos(response.data)
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.data.message === "JWT strings must contain exactly 2 period characters. Found: 0") {
                    sessionStorage.clear();
                    navigate("/", { state: { tokenLogout: true } });
                }
                console.error("Erro ao buscar dados:", error)
            });
    }

    const listarPagamentosComDesconto = () => {
        api.get("/mensalidades/qtd-descontos", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                setQtdPagamentosComDesconto(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.data.message === "JWT strings must contain exactly 2 period characters. Found: 0") {
                    sessionStorage.clear();
                    navigate("/", { state: { tokenLogout: true } });
                }
                console.error("Erro ao buscar dados:", error)
            });
    }

    const listarDadosDashboard = () => {
        api.get("/mensalidades/grafico", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                setDadosDash(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.data.message === "JWT strings must contain exactly 2 period characters. Found: 0") {
                    sessionStorage.clear();
                    navigate("/", { state: { tokenLogout: true } });
                }
                console.error("Erro ao buscar dados:", error)
            });
    }

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
                            content={qtdAlunosAtivos}
                            startIcon={
                                <img src={people} />
                            }
                        />
                        <Kpi
                            title="pagamentos com desconto (ano)"
                            content={qtdPagamentosComDesconto}
                            startIcon={
                                <img
                                    src={discount}
                                />
                            }
                        />
                    </Box>
                    <Grafico 
                        dadosDash={dadosDash}
                    />
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