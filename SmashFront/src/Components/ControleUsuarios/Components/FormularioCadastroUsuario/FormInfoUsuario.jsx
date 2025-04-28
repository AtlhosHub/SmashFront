import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
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

export const FormInfoUsuario = ({
    userInfo,
    setUserInfo,
}) => {
    const nomeSocialText =
        "Nome social é o nome em que a pessoa prefere ser chamada, diferente do seu nome legal.";

    const [confirmarSenha, setConfirmarSenha] = useState("");

    useEffect(() => {
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const emailValido = regexEmail.test(userInfo.email);
    }, [userInfo])

    return (
        <>
            <FormControl sx={{
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
                                required
                                value={userInfo.nome}
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, nome: e.target.value })
                                }
                                variant="outlined"
                                size="small"
                                sx={{
                                    "& .MuiInputBase-root": { borderRadius: "8px" },
                                    width: "100%",
                                }}
                            />
                        </Box>

                        <Box sx={{ width: "100%" }}>
                            <label>Gênero</label>
                            <TextField
                                value={userInfo.genero}
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, genero: e.target.value })
                                }
                                variant="outlined"
                                size="small"
                                sx={{
                                    "& .MuiInputBase-root": { borderRadius: "8px" },
                                    width: "100%",
                                }}
                            />
                        </Box>

                        <Box sx={{ width: "100%" }}>
                            <label>Cargo</label>
                            <TextField
                                value={userInfo.cargo}
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, cargo: e.target.value })
                                }
                                variant="outlined"
                                size="small"
                                sx={{
                                    "& .MuiInputBase-root": { borderRadius: "8px" },
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
                                value={userInfo.nomeSocial}
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, nomeSocial: e.target.value })
                                }
                                variant="outlined"
                                size="small"
                                sx={{
                                    "& .MuiInputBase-root": { borderRadius: "8px" },
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
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box>
                            <label>Celular</label>
                            <TextField
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
                                required
                                value={userInfo.email}
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, email: e.target.value })
                                }
                                variant="outlined"
                                size="small"
                                type="email"
                                sx={{
                                    "& .MuiInputBase-root": { borderRadius: "8px" },
                                    width: "100%",
                                }}
                            />
                        </Box>

                        <Box>
                            <label>
                                Senha  <span style={{ color: "red" }}>*</span>
                            </label>
                            <TextField
                                required
                                value={userInfo.senha}
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, senha: e.target.value })
                                }
                                variant="outlined"
                                size="small"
                                type="password"
                                sx={{
                                    "& .MuiInputBase-root": { borderRadius: "8px" },
                                    width: "100%",
                                }}
                            />
                        </Box>

                        <Box>
                            <label>
                                Confirmar senha  <span style={{ color: "red" }}>*</span>
                            </label>
                            <TextField
                                required
                                value={confirmarSenha}
                                onChange={(e) =>
                                    setConfirmarSenha(e.target.value)
                                }
                                variant="outlined"
                                size="small"
                                type="password"
                                sx={{
                                    "& .MuiInputBase-root": { borderRadius: "8px" },
                                    width: "100%",
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
                    <DefaultButton variant="outlined" label="Cancelar" onClick={() => navigate("/alunos")} />
                    <DefaultButton
                        // disabled={!botaoLiberado}
                        variant="contained"
                        label="Concluir"
                        onClick={() => {
                            setTabAtiva("ende");
                        }}
                    />
                </Box>
            </FormControl>
        </>
    )
}