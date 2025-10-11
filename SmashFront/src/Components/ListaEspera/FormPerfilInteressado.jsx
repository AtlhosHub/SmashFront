import {
    Box,
    FormControl,
    TextField,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider, renderTimeViewClock } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HelpIcon from "@mui/icons-material/Help";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DefaultButton } from "../DefaultComponents/DefaultButton";
import { formatarTelefone } from "../../Components/FichaInscricao/utils/validacaoForm";
import { useNavigate } from "react-router-dom";
import { api } from "../../provider/apiProvider";

export const FormInfo = ({
    userInfo,
    setUserInfo,
    operacao,
    setOperacao,
    setInfoConcluido,
    handleCadastrar,
    handleSalvar,
    handleDeletar
}) => {
    const navigate = useNavigate();
    const [botaoLiberado, setBotaoLiberado] = useState(false);
    const [horarios, setHorarios] = useState([]);
    const [loadingHorarios, setLoadingHorarios] = useState(true);

    const nomeSocialText = "Nome social é o nome em que a pessoa prefere ser chamada, diferente do seu nome legal.";

    useEffect(() => {
        api
            .get("/horario-preferencia", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
                }
            })
            .then(({ data }) => setHorarios(data || []))
            .catch(() => setHorarios([]))
            .finally(() => setLoadingHorarios(false));
    }, []);

    useEffect(() => {
        const camposObrigatorios =
            userInfo.nome &&
            userInfo.dataInteresse &&
            userInfo.email &&
            userInfo.horarioPref?.id &&
            userInfo.celular;

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValido = regexEmail.test(userInfo.email);

        setBotaoLiberado(camposObrigatorios && emailValido);
        setInfoConcluido(camposObrigatorios && emailValido);
    }, [userInfo]);

    const handleDataContato = (v) => {
        setUserInfo({
            ...userInfo,
            dataInteresse: v ? v.format('YYYY-MM-DDTHH:mm') : null
        });

    };
    const handleDataNascimento = (v) => setUserInfo({ ...userInfo, dataNascimento: v });

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
                paddingBlock: "30px",
                pr: "30px",
                display: "flex",
                flex: 1,
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    width: "100%",
                    color: "black",
                }}
            >
                {/* Coluna 1 */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                    <Box>
                        <label>
                            Nome do Interessado <span style={{ color: "red", display: operacao === "visualizacao" ? "none" : "inline" }}>*</span>
                        </label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={userInfo.nome || ""}
                            onChange={(e) => setUserInfo({ ...userInfo, nome: e.target.value })}
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                },
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
                                title={<Typography sx={{ fontSize: "14px" }}>{nomeSocialText}</Typography>}
                                placement="right"
                                arrow
                            >
                                <HelpIcon sx={{ marginTop: "1px", color: "#286DA8", fontSize: "18px" }} />
                            </Tooltip>
                        </label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={userInfo.nomeSocial || ""}
                            onChange={(e) => setUserInfo({ ...userInfo, nomeSocial: e.target.value })}
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                },
                            }}
                        />
                    </Box>

                    <Box>
                        <label>Telefone</label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={formatarTelefone(userInfo.telefone)}
                            onChange={(e) => setUserInfo({ ...userInfo, telefone: e.target.value })}
                            variant="outlined"
                            size="small"
                            type="tel"
                            placeholder={operacao === "cadastro" ? "(00) 00000-0000" : ""}
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                },
                            }}
                        />
                    </Box>
                </Box>

                {/* Coluna 2 */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                    <Box>
                        <label>Data de Nascimento</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disabled={operacao === "visualizacao"}
                                value={userInfo.dataNascimento ? dayjs(userInfo.dataNascimento) : null}
                                onChange={handleDataNascimento}
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        fullWidth: true,
                                        placeholder: "DD/MM/AAAA"
                                    },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box>
                        <label>
                            Gênero
                        </label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={userInfo.genero || ""}
                            onChange={(e) => setUserInfo({ ...userInfo, genero: e.target.value })}
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                },
                            }}
                        />
                    </Box>

                    <Box>
                        <label>
                            Email <span style={{ color: "red", display: operacao === "visualizacao" ? "none" : "inline" }}>*</span>
                        </label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={userInfo.email || ""}
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                            variant="outlined"
                            size="small"
                            type="email"
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                },
                            }}
                        />
                    </Box>
                </Box>

                {/* Coluna 3 */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                    <Box>
                        <label>
                            Data de Contato <span style={{ color: "red", display: operacao === "visualizacao" ? "none" : "inline" }}>*</span>
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                            <DateTimePicker
                                disabled={operacao === 'visualizacao'}
                                value={userInfo.dataInteresse ? dayjs(userInfo.dataInteresse) : null}
                                onChange={handleDataContato}
                                ampm={false}
                                format="DD/MM/YYYY HH:mm"
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                maxDateTime={dayjs()}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        placeholder: 'DD/MM/AAAA HH:mm',
                                    },
                                    layout: {
                                        sx: {
                                            '& .MuiClock-root': {
                                                marginBottom: 0,
                                            },
                                            '& .MuiClock': {
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: 'auto',
                                            },
                                            '& .MuiPickersLayout-contentWrapper': {
                                                alignItems: 'center',
                                            },
                                        },
                                    },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box>
                        <label>
                            Celular <span style={{ color: "red", display: operacao === "visualizacao" ? "none" : "inline" }}>*</span>
                        </label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={formatarTelefone(userInfo.celular)}
                            onChange={(e) => setUserInfo({ ...userInfo, celular: e.target.value })}
                            variant="outlined"
                            size="small"
                            type="tel"
                            placeholder={operacao === "cadastro" ? "(00) 00000-0000" : ""}
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                },
                            }}
                        />
                    </Box>

                    <Box>
                        <label>
                            Horário de Preferência{" "}
                            <span style={{ color: "red", display: operacao === "visualizacao" ? "none" : "inline" }}>
                                *
                            </span>
                        </label>
                        <TextField
                            select
                            disabled={operacao === "visualizacao" || loadingHorarios}
                            value={userInfo.horarioPref?.id || ""}
                            onChange={e =>
                                setUserInfo({
                                    ...userInfo,
                                    horarioPref: {
                                        ...userInfo.horarioPref,
                                        id: e.target.value === "" ? null : Number(e.target.value)
                                    }
                                })
                            }
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px"
                                }
                            }}
                        >
                            <MenuItem value="">
                                <em>—— Selecione ——</em>
                            </MenuItem>

                            {loadingHorarios ? (
                                <MenuItem disabled>Carregando horários...</MenuItem>
                            ) : horarios.length === 0 ? (
                                <MenuItem disabled>Nenhum horário disponível</MenuItem>
                            ) : (
                                horarios.map(h => (
                                    <MenuItem key={h.id} value={h.id}>
                                        {dayjs(`2000-05-10 ${h.horarioAulaInicio}`).format("HH:mm")} - {dayjs(`2000-05-10 ${h.horarioAulaFim}`).format("HH:mm")}
                                    </MenuItem>
                                ))
                            )}
                        </TextField>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ marginTop: "auto", display: "flex", gap: "10px" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px", width: "100%" }}>
                    <DefaultButton
                        variant="outlined"
                        label={operacao === "visualizacao"
                            ? "Excluir"
                            : "Cancelar"
                        }
                        onClick={() =>
                            operacao === "visualizacao"
                                ? handleDeletar()
                                : navigate("/listaEspera")
                        }
                        color={operacao === "visualizacao" ? "red" : ""}
                    />
                    <DefaultButton
                        variant="contained"
                        label={labelBotao}
                        disabled={!botaoLiberado}
                        onClick={handleClick}
                    />
                </Box>
            </Box>
        </FormControl>
    );
};