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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HelpIcon from "@mui/icons-material/Help";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DefaultButton } from "../../../DefaultComponents/DefaultButton/DefaultButton";
import { formatarTelefone } from "../../utils/validacaoForm";
import { useNavigate } from "react-router-dom";

export const FormInfo = ({
    userInfo,
    maiorIdade,
    cpfValido,
    isDeficiente, 
    setMaiorIdade,
    setTabAtiva,
    setInfoConcluido,
    setIsDeficiente,
    setUserInfo,
    setCpfValido
}) => {
    const navigate = useNavigate();

    const [botaoLiberado, setBotaoLiberado] = useState(false);

    const nomeSocialText =
        "Nome social é o nome em que o(a) aluno(a) prefere ser chamado, diferente do seu nome legal.";
    const statusPresText =
        "Use este campo para indicar se o aluno(a) ainda está frequentando as aulas, ou se parou de participar.";
    const atestadoText =
        "Use este campo para indicar se o aluno(a) entregou o atestado de capacitação para a prática de esportes.";
    const deficienciaText =
        "Use este campo para indicar se o aluno(a) tem alguma deficiência física, sensorial, intelectual ou condição como autismo, TDAH, entre outras.";

    const formatCPF = (value) => {
        const digits = value.replace(/\D/g, "").slice(0, 11);
        if (digits.length === 11) {
            setCpfValido(true);
        } else {
            setCpfValido(false);
        }

        return digits
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const [cpfUser, setCpfUser] = useState(userInfo?.cpf && formatCPF(userInfo?.cpf));

    useEffect(() => {
        const camposPreenchidos = userInfo.nome && userInfo.rg && cpfValido && userInfo.dataNascimento;

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const emailValido = regexEmail.test(userInfo.email);

        const emailNecessario = maiorIdade ? emailValido : true;
        const condicionalLiberacao = camposPreenchidos && emailNecessario && (!isDeficiente ? true : !!userInfo.deficiencia === true);

        setBotaoLiberado(condicionalLiberacao);
        setInfoConcluido(condicionalLiberacao);
    }, [userInfo, maiorIdade, isDeficiente]);

    useEffect(() => {
        if (!isDeficiente) setUserInfo({ ...userInfo, deficiencia: null })
    }, [isDeficiente])

    const isMaiorDeIdade = (dataNascimento) => {
        const hoje = new Date();
        const nascimento = dayjs(dataNascimento).toDate();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        const dia = hoje.getDate() - nascimento.getDate();

        if (mes < 0 || (mes === 0 && dia < 0)) {
            idade--;
        }

        setMaiorIdade(idade >= 18);
    };

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
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        flex: 1.3,
                        height: "fit-content",
                    }}
                >
                    <Box>
                        <label>
                            Nome do Aluno <span style={{ color: "red" }}>*</span>
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

                    <Box display={"flex"} gap={2}>
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
                                    onChange={(newValue) => {
                                        isMaiorDeIdade(newValue);
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
                    </Box>

                    <Box>
                        <label>Profissão</label>
                        <TextField
                            value={userInfo.profissao}
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, profissao: e.target.value })
                            }
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": { borderRadius: "8px" },
                                width: "100%",
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        flex: 1,
                        height: "fit-content",
                    }}
                >
                    <Box>
                        <label>Nacionalidade</label>
                        <TextField
                            value={userInfo.nacionalidade}
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, nacionalidade: e.target.value })
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
                        <label>
                            RG <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                            required
                            value={userInfo.rg}
                            onChange={(e) => setUserInfo({ ...userInfo, rg: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": { borderRadius: "8px" },
                                width: "100%",
                            }}
                        />
                    </Box>

                    <Box>
                        <label>Telefone</label>
                        <TextField
                            value={formatarTelefone(userInfo.telefone)}
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, telefone: e.target.value })
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

                    <Box>
                        <label>
                            Email {maiorIdade && <span style={{ color: "red" }}>*</span>}
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
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        flex: 1,
                        height: "fit-content",
                    }}
                >
                    <Box>
                        <label>Naturalidade</label>
                        <TextField
                            value={userInfo.naturalidade}
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, naturalidade: e.target.value })
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
                        <label>
                            CPF <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                            required
                            value={cpfUser}
                            onChange={(e) => {
                                const raw = e.target.value.replace(/\D/g, "");
                                setCpfUser(formatCPF(raw));
                                setUserInfo({ ...userInfo, cpf: raw });
                            }}
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": { borderRadius: "8px" },
                                width: "100%",
                            }}
                        />
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
            </Box>
            <Box sx={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <Box sx={{ color: "black" }}>
                    <label
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                        }}
                    >
                        Status de Presença
                        <Tooltip
                            title={
                                <Typography sx={{ fontSize: "14px" }}>
                                    {statusPresText}
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
                    <RadioGroup
                        row
                        defaultValue={true}
                        value={userInfo.ativo}
                        onChange={(e) =>
                            setUserInfo({ ...userInfo, ativo: e.target.value })
                        }
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Ativo" />
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label="Inativo"
                        />
                    </RadioGroup>
                </Box>
                <Box sx={{ color: "black" }}>
                    <label
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                        }}
                    >
                        Atestados
                        <Tooltip
                            title={
                                <Typography sx={{ fontSize: "14px" }}>
                                    {atestadoText}
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
                    <RadioGroup
                        row
                        defaultValue="true"
                        value={userInfo.temAtestado}
                        onChange={(e) =>
                            setUserInfo({ ...userInfo, temAtestado: e.target.value })
                        }
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Sim" />
                        <FormControlLabel value={false} control={<Radio />} label="Não" />
                    </RadioGroup>
                </Box>
                <Box sx={{ color: "black" }}>
                    <label
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                        }}
                    >
                        <span>
                            Possui Deficiência e/ou Neurodivergência{" "}
                            <span style={{ color: "red" }}>*</span>
                        </span>
                        <Tooltip
                            title={
                                <Typography sx={{ fontSize: "14px" }}>
                                    {deficienciaText}
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
                    <RadioGroup
                        row
                        defaultValue={false}
                        value={isDeficiente}
                        onChange={(e) => setIsDeficiente(e.target.value === "true")}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Sim" />
                        <FormControlLabel value={false} control={<Radio />} label="Não" />
                        {isDeficiente && (
                            <TextField
                                size="small"
                                placeholder="Especifique"
                                value={userInfo.deficiencia}
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, deficiencia: e.target.value })
                                }
                            />
                        )}
                    </RadioGroup>
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
                        disabled={!botaoLiberado}
                        variant="contained"
                        label="Prosseguir"
                        onClick={() => {
                            setTabAtiva("ende");
                        }}
                    />
                </Box>
            </Box>
        </FormControl>
    );
};
