import {
    Box,
    Link,
    TextField,
    Typography,
    Button
} from "@mui/material";
import bgImg2 from '../../assets/loginBg2.png';
import { useState } from "react";
import { DefaultLoginCard } from "../DefaultComponents/DefaultLoginCard/DefaultLoginCard";
import { useNavigate } from "react-router-dom";

export const TelaEsqueciSenha = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRecuperarSenha = () => {
        console.log('E-mail para recuperação:', email);
        alert('Se o e-mail estiver cadastrado, você receberá um link para recuperação de senha.');
    };

    return (
        <>
            <Box
                sx={{
                    backgroundImage: `url(${bgImg2})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10%',
                    backgroundSize: '800px',
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
                        height: "600px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <DefaultLoginCard
                        typeButton="contained"
                        withButton={false}
                        sx={{
                            width: "400px",
                            height: "500px",
                        }}
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
                                ESQUECEU SUA SENHA?
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
                                Informe seu email e enviaremos um link para a recuperação da sua senha.
                            </Typography>
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="E-mail:"
                                placeholder=""
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{
                                    width: "100%",
                                    marginTop: "5rem",
                                    marginBottom: "3rem",
                                    '& .MuiInputBase-root': {
                                        borderRadius: '8px',
                                    },
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleRecuperarSenha}
                                sx={{
                                    backgroundColor: "#0D3C53",
                                    color: "#FFFFFF",
                                    textTransform: "none",
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    borderRadius: "8px",
                                    '&:hover': {
                                        backgroundColor: "#093962",
                                    },
                                }}
                            >
                                Enviar Link
                            </Button>
                            <Link
                                onClick={() => navigate('/telaInicial')}
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
                        SMASH
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
            </Box>
        </>
    );
};

export default TelaEsqueciSenha;    