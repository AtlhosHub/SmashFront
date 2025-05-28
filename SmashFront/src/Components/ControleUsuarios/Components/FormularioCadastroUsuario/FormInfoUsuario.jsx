import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DefaultButton } from "../../../DefaultComponents/DefaultButton/DefaultButton";
import { formatarTelefone } from "../../../FichaInscricao/utils/validacaoForm";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const FormInfoUsuario = ({
    userInfo,
    setUserInfo,
    operacao,
    setOperacao,
    handleSalvar,
    handleCadastrar,
    handleDeletar
}) => {
    const navigation = useNavigate();

    const nomeSocialText =
        "Nome social é o nome em que a pessoa prefere ser chamada, diferente do seu nome legal.";

    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [botaoLiberado, setBotaoLiberado] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
    const [erroConfirmarSenha, setErroCofirmarSenha] = useState(false);
    const [idUsuario, setIdUsuario] = useState(null);
    const idUsuarioLogado = sessionStorage.getItem("idUsuario");

    useEffect(() => {
        const camposPreenchidos = userInfo.nome && userInfo.dataNascimento;

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const emailValido = regexEmail.test(userInfo.email);

        const condicionalLiberacao = camposPreenchidos && emailValido && validarSenha();
        setBotaoLiberado(condicionalLiberacao);
    }, [userInfo, senha, confirmarSenha]);

    useEffect(() => {
        setIdUsuario(userInfo.id)
    }, [])

    const validarSenha = () => {
        let senhaIgual = false;

        if (operacao === "cadastro") {
            if (!!confirmarSenha === true) {
                senhaIgual = senha === confirmarSenha;
                setErroCofirmarSenha(senha !== confirmarSenha);
            } else {
                setErroCofirmarSenha(false)
            }
        } else {
            senhaIgual = true;
        }

        return senhaIgual;
    }

    const handleClick = () => {
        if (operacao === "visualizacao") {
            setOperacao("edicao");
        } else if (operacao === "cadastro") {
            handleCadastrar()
        } else {
            handleSalvar();
        }
    }

    const labelBotao =
        operacao === "visualizacao"
            ? "Editar"
            : operacao === "edicao"
                ? "Salvar"
                : "Concluir";

    return (
        <FormControl
            sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "30px 20px 20px 0px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    color: "black",
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 0.8fr 0.8fr",
                        columnGap: "20px",
                        rowGap: "10px",
                    }}
                >
                    <Box>
                        <label>
                            Nome do Usuário <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={userInfo.nome || undefined}
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, nome: e.target.value })
                            }
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": { borderRadius: "8px" },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>

                    <Box sx={{ width: "100%" }}>
                        <label>Gênero</label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={userInfo.genero || undefined}
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, genero: e.target.value })
                            }
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": { borderRadius: "8px" },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>

                    <Box sx={{ width: "100%" }}>
                        <label>Cargo</label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={userInfo.cargo || undefined}
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, cargo: e.target.value })
                            }
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": { borderRadius: "8px" },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>

                    <Box>
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            Nome Social
                            <Tooltip
                                title={
                                    <Typography sx={{ fontSize: "14px" }}>
                                        {nomeSocialText}
                                    </Typography>
                                }
                                placement="right"
                                arrow
                            >
                                <HelpIcon
                                    sx={{
                                        marginTop: "1px",
                                        color: "#286DA8",
                                        fontSize: "18px",
                                    }}
                                />
                            </Tooltip>
                        </label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={userInfo.nomeSocial || undefined}
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, nomeSocial: e.target.value })
                            }
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": { borderRadius: "8px" },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>

                    <Box sx={{ width: "100%" }}>
                        <label>
                            Data de Nascimento <span style={{ color: "red" }}>*</span>
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                size="small"
                                disabled={operacao === "visualizacao"}
                                value={
                                    userInfo.dataNascimento
                                        ? dayjs(userInfo.dataNascimento)
                                        : null
                                }
                                format="DD/MM/YYYY"
                                onChange={(newValue) => {
                                    setUserInfo({ ...userInfo, dataNascimento: newValue });
                                }}
                                slotProps={{
                                    textField: { size: "small", placeholder: "DD/MM/AAAA" },
                                }}
                                sx={{
                                    width: "100%",
                                    "& .MuiInputBase-root": { borderRadius: "8px" },
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <label>Celular</label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={formatarTelefone(userInfo.celular)}
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, celular: e.target.value })
                            }
                            variant="outlined"
                            size="small"
                            type="tel"
                            placeholder="(00) 00000-0000"
                            sx={{
                                "& .MuiInputBase-root": { borderRadius: "8px" },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 0.8fr 0.8fr",
                        flex: 1,
                        columnGap: "20px",
                        rowGap: "10px",
                        color: "black",
                        pt: "10px",
                    }}
                >
                    <Box>
                        <label>
                            Email  <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={userInfo.email || undefined}
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, email: e.target.value })
                            }
                            variant="outlined"
                            size="small"
                            type="email"
                            sx={{
                                "& .MuiInputBase-root": { borderRadius: "8px" },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>

                    <Box sx={{ display: operacao === "cadastro" ? "block" : "none" }}>
                        <label>
                            Senha  <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                            value={senha}
                            onChange={(e) => {
                                setUserInfo({ ...userInfo, senha: e.target.value });
                                setSenha(e.target.value);
                            }}
                            variant="outlined"
                            size="small"
                            type={mostrarSenha ? "text" : "password"}
                            sx={{
                                "& .MuiInputBase-root": { borderRadius: "8px" },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
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
                    </Box>

                    <Box sx={{ display: operacao === "cadastro" ? "block" : "none" }}>
                        <label>
                            Confirmar senha  <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                            error={erroConfirmarSenha}
                            value={confirmarSenha}
                            onChange={(e) =>
                                setConfirmarSenha(e.target.value)
                            }
                            variant="outlined"
                            size="small"
                            type={mostrarConfirmarSenha ? "text" : "password"}
                            sx={{
                                "& .MuiInputBase-root": { borderRadius: "8px" },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                                            edge="end"
                                            sx={{
                                                color: "#093962",
                                                '&:hover': {
                                                    color: "#093962",
                                                },
                                            }}
                                        >
                                            {mostrarConfirmarSenha ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "end",
                    alignItems: "end",
                    flex: 1,
                }}
            >
                {operacao === "visualizacao" && String(idUsuario) != String(idUsuarioLogado) && (
                    <DefaultButton
                        variant="outlined"
                        label="Excluir"
                        onClick={handleDeletar}
                    />
                )}
                {operacao !== "visualizacao" && (
                    <DefaultButton
                        variant="outlined"
                        label="Cancelar"
                        onClick={() => navigation("/controleUsuarios")}
                    />
                )}
                <DefaultButton
                    disabled={!botaoLiberado}
                    variant="contained"
                    label={labelBotao}
                    onClick={handleClick}
                />
            </Box>
            <ToastContainer />
        </FormControl>
    )
}
