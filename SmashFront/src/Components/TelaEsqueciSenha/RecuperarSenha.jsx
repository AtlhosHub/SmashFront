import React, { useEffect, useState } from 'react';
import { Box, Link, TextField, Typography, Button } from '@mui/material';
import bgImg2 from '../../assets/loginBg2.png';
import { DefaultLoginCard } from '../DefaultComponents/DefaultLoginCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../provider/apiProvider';
import { toasterMsg } from '../../utils/toasterService';
import { ToastContainer } from 'react-toastify';

export const RecuperarSenha = () => {
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [validToken, setValidToken] = useState(false);
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('token');

    useEffect(() => {
        if (!token) {
            toasterMsg('error', 'Token ausente.');
            navigate('/');
            return;
        }

        api
            .get('/resetPassword/validate', { params: { token } })
            .then(() => setValidToken(true))
            .catch(() => {
                toasterMsg('error', 'Link inválido ou expirado.');
                navigate('/');
            });
    }, [token, navigate]);

    const handleAlterarSenha = () => {
        if (novaSenha !== confirmarSenha) {
            toasterMsg('error', 'As senhas não coincidem.');
            return;
        }
        api
            .post('/resetPassword/reset-password', { token, novaSenha }, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(() => {
                toasterMsg('success', 'Senha alterada com sucesso!');
                navigate('/');
            })
            .catch(err => {
                const msg = err.response?.data?.error || 'Erro ao alterar senha';
                toasterMsg('error', msg);
            });
    };

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
                            ALTERAR SENHA
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
                            Essa ação irá alterar a senha vinculada ao email informado.
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
                                width: '100%',
                                marginTop: '1rem',
                                '& .MuiInputBase-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                        <TextField
                            value={confirmarSenha}
                            onChange={e => setConfirmarSenha(e.target.value)}
                            label="Confirmar Senha"
                            type="password"
                            variant="outlined"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: '100%',
                                marginBottom: '2rem',
                                '& .MuiInputBase-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleAlterarSenha}
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
                            Alterar
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

export default RecuperarSenha;