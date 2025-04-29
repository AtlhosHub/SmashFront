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
                    backgroundPosition: 'right 10%', // Move a imagem mais para a direita
                    backgroundSize: '800px', // largura x altura fixa
                    height: '100vh', // Altura total da tela
                    width: '100vw', // Largura total da tela
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    overflow: 'hidden', // Evita que o conteúdo ultrapasse os limites
                }}
            >
                <Box
                    sx={{
                        width: "1400px", // Largura fixa
                        height: "600px", // Altura fixa
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <DefaultLoginCard
                        typeButton="contained"
                        withButton={false}
                        sx={{
                            width: "400px", // Largura fixa
                            height: "500px", // Altura fixa
                        }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            <Typography
                                sx={{
                                    fontFamily: "'Mohave', sans-serif",
                                    fontWeight: "600",
                                    fontSize: "35px",
                                    textAlign: "center",
                                    color: "#1E1919",
                                    marginBottom: "0.2rem", // Reduz o espaçamento abaixo da frase
                                }}
                            >
                                ESQUECEU SUA SENHA?
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    textAlign: "center",
                                    color: "#1E1919",
                                    marginTop: "0rem", // Remove o espaçamento acima da frase
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
                                    marginTop: "5rem", // Espaçamento acima do campo
                                    marginBottom: "5rem", // Espaçamento abaixo do campo
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