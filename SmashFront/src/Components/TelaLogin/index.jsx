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
    const location = useLocation();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState();
    const [senha, setSenha] = useState();

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erroLogin, setErroLogin] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (location.state?.tokenLogout) {
            toasterMsg("error", "Sessão expirada, por favor faça o login novamente.")
        }
    }, [location])

    const handleLogin = (e) => {
        e.preventDefault();

        if(isProcessing) return;

        if (!usuario?.trim() && !senha?.trim()) {
            setErroLogin(true);
            toasterMsg("error", "Por favor preencha todos os campos antes de enviar!")
            return;
        }

        setIsProcessing(true);
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
                    }, 500);
                } else {
                    throw new Error('Ops! Ocorreu um erro interno.');
                }
            })
            .catch(error => {
                if (error.response?.status === 401) {
                    toasterMsg("error", `${error.response.data.message}.`)
                    setErroLogin(true);
                } else {
                    toasterMsg("error", "Erro interno! Por favor contacte os desenvolvedores.")
                }
            })
            .finally(() => {
                setIsProcessing(false);
            });
    }

    return (
        <>
            <Box
                sx={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'start',
                    backgroundSize: '900px',
                    height: '100vh',
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
                        CT Vila Formosa
                    </Typography>
                    <Typography sx={{ fontSize: "25px", fontFamily: "'Poppins', sans-serif ", fontWeight: "400", lineHeight: "30px" }}>
                        Sistema de Gerenciamento Financeiro
                    </Typography>
                </Box>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <DefaultLoginCard
                        typeButton="contained"
                        withButton={true}
                        onClickButton={handleLogin}
                        buttonLabel="Entrar"
                        isProcessing={isProcessing}
                    >
                        <img src={logo} style={{ maxHeight: "auto", maxWidth: "150px", marginInline: "auto" }} />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                            <TextField
                                value={usuario}
                                error={erroLogin}
                                onChange={(e) => { setUsuario(e.target.value); setErroLogin(false) }}
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
                                    error={erroLogin}
                                    onChange={(e) => { setSenha(e.target.value); setErroLogin(false) }}
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
                                            cursor: 'pointer',
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