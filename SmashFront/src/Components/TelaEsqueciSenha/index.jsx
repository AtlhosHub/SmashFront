import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Link,
    TextField,
    Typography,
    Button
} from '@mui/material';
import { DefaultLoginCard } from '../DefaultComponents/DefaultLoginCard/DefaultLoginCard';

import bgImg2 from '../../assets/loginBg2.png';
import { api } from '../../provider/apiProvider';
import { toasterMsg } from '../../utils/toasterService';

export const TelaEsqueciSenha = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRecuperarSenha = () => {
        if (!email.trim()) {
            toasterMsg('error', 'Por favor, preencha o campo de e-mail.');
            return;
        }
        api.post('/resetPassword/request-reset', { email }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 204) {
                    toasterMsg('error', 'E-mail não está cadastrado.');
                } else {
                    toasterMsg('success', 'E-mail enviado com sucesso!');
                }
            })
            .catch((error) => {
                if (error.response?.status === 500) {
                    toasterMsg('error', 'Erro ao enviar e-mail, por favor contacte os administradores.');
                } else {
                    toasterMsg('error', error.response?.data?.error || 'Erro ao enviar e-mail');
                }
            });
    };

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
                    width: '1400px',
                    height: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <DefaultLoginCard
                    typeButton="contained"
                    withButton={false}
                    sx={{
                        width: '400px',
                        height: '500px',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Typography
                            sx={{
                                fontFamily: '\'Mohave\', sans-serif',
                                fontWeight: '600',
                                fontSize: '35px',
                                textAlign: 'left',
                                color: '#1E1919',
                                marginBottom: '0.1rem',
                            }}
                        >
                            ESQUECEU SUA SENHA?
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: '\'Inter\', sans-serif',
                                fontWeight: '400',
                                fontSize: '15px',
                                textAlign: 'left',
                                color: '#1E1919',
                                marginTop: '0rem',
                            }}
                        >
                            Informe seu email e enviaremos um link para a recuperação da sua senha.
                        </Typography>
                        <Box>
                            <label>
                                Email <span style={{ color: 'red' }}>*</span>
                            </label>
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        borderRadius: '8px'
                                    },
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        WebkitTextFillColor: 'rgba(0, 0, 0, 0.60)'
                                    },
                                    width: '100%',
                                }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            onClick={handleRecuperarSenha}
                            sx={{
                                backgroundColor: '#0D3C53',
                                color: '#FFFFFF',
                                textTransform: 'none',
                                fontFamily: '\'Inter\', sans-serif',
                                fontWeight: '600',
                                fontSize: '16px',
                                borderRadius: '8px',
                                '&:hover': {
                                    backgroundColor: '#093962',
                                },
                            }}
                        >
                            Enviar Link
                        </Button>
                        <Link
                            onClick={() => navigate('/')}
                            sx={{
                                textAlign: 'center',
                                color: '#0D3C53',
                                textDecoration: 'none',
                                fontFamily: '\'Inter\', sans-serif',
                                fontWeight: '500',
                                fontSize: '16px',
                                cursor: 'pointer',
                                '&:hover': {
                                    textDecoration: 'underline',
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
                    justifyContent: 'end',
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#0D3C53',
                    width: '100%',
                    pr: '5rem',
                    pb: '1rem',
                    textAlign: 'right',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '80px',
                        fontFamily: '\'Mohave\', sans-serif ',
                        fontWeight: '700',
                        lineHeight: '70px',
                    }}
                >
                    CT Vila Formosa
                </Typography>
                <Typography
                    sx={{
                        fontSize: '25px',
                        fontFamily: '\'Poppins\', sans-serif ',
                        fontWeight: '400',
                        lineHeight: '30px',
                    }}
                >
                    Sistema de Gerenciamento Financeiro
                </Typography>
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default TelaEsqueciSenha;