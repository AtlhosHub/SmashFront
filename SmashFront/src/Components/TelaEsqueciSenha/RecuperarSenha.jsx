import React, { useEffect, useState } from 'react';
import { Box, Link, TextField, Typography, Button } from '@mui/material';
import bgImg2 from '../../assets/loginBg2.png';
import { DefaultLoginCard } from '../DefaultComponents/DefaultLoginCard/DefaultLoginCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from "../../provider/apiProvider"
import { toasterMsg } from "../../utils/toasterService";
import { ToastContainer } from "react-toastify"

export const RecuperarSenha = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(search);
    const token = params.get('token');

    const [validToken, setValidToken] = useState(false);

    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [regrasSenha, setRegrasSenha] = useState({
        minLength: false,
        upperCase: false,
        lowerCase: false,
        number: false,
        specialChar: false
    });

    const handleAlterarSenha = () => {
        if (novaSenha !== confirmarSenha) {
            toasterMsg('error', 'As senhas não coincidem.');
            return;
        }

        setIsLoading(true);
        api
            .post('/resetPassword/reset-password', { token, novaSenha }, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(() => {
                toasterMsg('success', 'Senha alterada com sucesso!');
                navigate('/', { state: { resetedPassword: true } });
            })
            .catch(err => {
                const msg = err.response?.data?.error || 'Erro ao alterar senha';
                toasterMsg('error', msg);
            })
            .finnaly(() => {
                setIsLoading(false);
            });
    };

    const setRegraStyle = (regra) => {
        if (regrasSenha[regra] === true) {
            return { color: 'green', fontWeight: 'bold' };
        }
        return { color: 'black', fontWeight: 'normal' };
    }

    useEffect(() => {
        const newRegrasSenha = {
            minLength: novaSenha.length >= 8,
            upperCase: /[A-Z]/.test(novaSenha),
            lowerCase: /[a-z]/.test(novaSenha),
            number: /\d/.test(novaSenha),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(novaSenha),
            senhasIguais: novaSenha === confirmarSenha
        };

        setRegrasSenha(newRegrasSenha);
    }, [novaSenha]);

    useEffect(() => {
        if (!token) {
            toasterMsg('error', 'Token ausente.');
            navigate('/');
            return;
        }

        api
            .get(`/resetPassword/validate`, { params: { token } })
            .then(() => setValidToken(true))
            .catch(() => {
                toasterMsg('error', 'Link inválido ou expirado.');
                navigate('/');
            });
    }, [token, navigate]);

    if (!validToken) {
        return null;
    }

    return (
        <Box
            sx={{
                backgroundImage: `url(${bgImg2})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10%',
                backgroundSize: '900px',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    width: "1400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <DefaultLoginCard
                    withButton={true}
                    isProcessing={isLoading}
                    onClickButton={handleAlterarSenha}
                    disabledCondition={!regrasSenha.minLength || !regrasSenha.senhasIguais}
                    typeButton="contained"
                    buttonLabel="Alterar Senha"
                >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <Typography
                            sx={{
                                fontFamily: "'Mohave', sans-serif",
                                fontWeight: "600",
                                fontSize: "35px",
                                textAlign: "left",
                                color: "#1E1919",
                                marginBottom: "0.1rem",
                            }}
                        >
                            ALTERAR SENHA
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: "400",
                                fontSize: "15px",
                                textAlign: "left",
                                color: "#1E1919",
                                marginTop: "0rem",
                            }}
                        >
                            Essa ação irá alterar a senha vinculada ao email informado.<br />Por favor insira a nova senha abaixo:
                        </Typography>
                        <TextField
                            value={novaSenha}
                            onChange={e => setNovaSenha(e.target.value)}
                            label="Senha"
                            type="password"
                            variant="outlined"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: "100%",
                                marginTop: "0.5rem",
                                '& .MuiInputBase-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                        <Box>
                            <Typography>A senha deve seguir as seguintes regras:</Typography>
                            <ul>
                                <li style={setRegraStyle("minLength")}> Conter ao menos 8 caracteres</li>
                                <li style={setRegraStyle("upperCase")}> 1 letra maiúscula </li>
                                <li style={setRegraStyle("lowerCase")}> 1 letra minúscula </li>
                                <li style={setRegraStyle("number")}> 1 número </li>
                                <li style={setRegraStyle("specialChar")}> 1 caractére especial (!, @, #, $) </li>
                            </ul>
                        </Box>
                        <TextField
                            value={confirmarSenha}
                            onChange={e => {
                                setConfirmarSenha(e.target.value);
                                if (e.target.value !== novaSenha && e.target.value.length > 0) {
                                    setRegrasSenha(prev => ({ ...prev, senhasIguais: false }));
                                } else {
                                    setRegrasSenha(prev => ({ ...prev, senhasIguais: true }));
                                }
                            }}
                            error={!regrasSenha.senhasIguais && confirmarSenha.length > 0}
                            helperText={!regrasSenha.senhasIguais && confirmarSenha.length > 0 ? "As senhas não coincidem" : ""}
                            label="Confirmar Senha"
                            type="password"
                            variant="outlined"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: "100%",
                                marginBottom: "1rem",
                                '& .MuiInputBase-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                        <Link
                            onClick={() => navigate('/')}
                            sx={{
                                textAlign: "center",
                                color: "#0D3C53",
                                textDecoration: "none",
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: "500",
                                fontSize: "16px",
                                cursor: "pointer",
                                '&:hover': {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            Início
                        </Link>
                    </Box>
                </DefaultLoginCard>
            </Box>
            <Box
                sx={{
                    justifyContent: "end",
                    display: "flex",
                    flexDirection: "column",
                    color: "#0D3C53",
                    width: "100%",
                    pr: "5rem",
                    pb: "1rem",
                    textAlign: "right",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "80px",
                        fontFamily: "'Mohave', sans-serif ",
                        fontWeight: "700",
                        lineHeight: "70px",
                    }}
                >
                    CT Vila Formosa
                </Typography>
                <Typography
                    sx={{
                        fontSize: "25px",
                        fontFamily: "'Poppins', sans-serif ",
                        fontWeight: "400",
                        lineHeight: "30px",
                    }}
                >
                    Sistema de Gerenciamento Financeiro
                </Typography>
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default RecuperarSenha;