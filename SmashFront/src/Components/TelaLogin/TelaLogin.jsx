import {
    Box,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography
} from "@mui/material"
import bgImg from '../../assets/loginBg.png';
import logo from '../../assets/logoACDNB.png';
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DefaultLoginCard } from "../DefaultComponents/DefaultLoginCard/DefaultLoginCard";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../provider/apiProvider"
import { toasterMsg } from "../../utils/toasterService";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

export const TelaLogin = () => {
    const locate = useLocation();
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (locate.state?.tokenLogout) {
            toasterMsg("error", "Sessão expirada, por favor faça o login novamente.")
        }
    }, [locate])

    const handleLogin = (e) => {
        // Aplica o fetch pra validar o login
        e.preventDefault();

        api.post('usuarios/login', {
            email: usuario,
            senha: senha
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200 && response.data?.token) {
                    sessionStorage.setItem('idUsuario', response.data.id);
                    sessionStorage.setItem('authToken', response.data.token);
                    sessionStorage.setItem('usuario', response.data.nome);

                    setTimeout(() => {
                        navigate('/telaInicial');
                    }, 1000);
                } else {
                    throw new Error('Ops! Ocorreu um erro interno.');
                }
            })
            .catch(error => {
                toasterMsg("error", 'Ops! Ocorreu um erro interno.');
            });
    }

    return (
        <>
            <Box
                sx={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'start',
                    backgroundSize: '900px', // largura x altura fixa
                    height: '99vh',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{
                    justifyContent: "end",
                    display: "flex",
                    flexDirection: "column",
                    color: "#0D3C53",
                    width: "100%",
                    pl: "5rem",
                    pb: "1rem",
                }}>
                    <Typography sx={{ fontSize: "80px", fontFamily: "'Mohave', sans-serif ", fontWeight: "700", lineHeight: "70px" }}>
                        SMASH
                    </Typography>
                    <Typography sx={{ fontSize: "25px", fontFamily: "'Poppins', sans-serif ", fontWeight: "400", lineHeight: "30px" }}>
                        Sistema de Financiamento Financeiro
                    </Typography>
                </Box>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <DefaultLoginCard
                        typeButton="contained"
                        withButton={true}
                        onClickButton={handleLogin}
                        buttonLabel="Entrar"
                    >
                        <img src={logo} style={{ maxHeight: "auto", maxWidth: "150px", marginInline: "auto" }} />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                            <TextField
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                label="Email"
                                variant="outlined"
                                size="small"
                                sx={{
                                    width: "100%",
                                    '& .MuiInputBase-root': {
                                        borderRadius: '8px',
                                    },
                                }}
                            />
                            <Box sx={{ alignItems: "end", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                                <TextField
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    label="Senha"
                                    type={mostrarSenha ? "text" : "password"}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        width: "100%",
                                        '& .MuiInputBase-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                                    edge="end"
                                                    sx={{
                                                        color: "#093962",
                                                        '&:hover': {
                                                            color: "#093962",
                                                        },
                                                    }}
                                                >
                                                    {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Link
                                    sx={{
                                        lineHeight: "5px",
                                        color: "#093962",
                                        textDecoration: "none",
                                        fontWeight: "500",
                                        fontFamily: "'Popins', sans-serif",
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                    onClick={() => navigate('/esqueciSenha')}
                                >
                                    Esqueci a senha
                                </Link>
                            </Box>
                        </Box>
                    </DefaultLoginCard>
                </Box>
            </Box>
            <ToastContainer />
        </>
    )
}