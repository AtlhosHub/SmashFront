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
import { DefaultButton } from "../../../DefaultComponents/DefaultButton/DefaultButton";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import HelpIcon from "@mui/icons-material/Help";
import { formatarTelefone } from "../../utils/validacaoForm";

export const FormResponsavel = ({
    userInfo,
    cpfValido,
    setUserInfo,
    setCpfValido,
    setRespConcluido,
    setTabAtiva,
    setOperacao,
    setIsModalDeleteOpen,
    operacao,
    handleSalvar,
    handleConfirmar,
}) => {
    const [botaoLiberado, setBotaoLiberado] = useState(false);

    const nomeSocialText =
        "Nome social é o nome em que o(a) aluno(a) prefere ser chamado, diferente do seu nome legal.";
    const autorizacaoText =
        "O responsável autoriza o filho menor a se inscrever e, ao fazer o seu registro na ACDNB da Vila Formosa, o mesmo poderá disputar as competições promovidas por esta associação.";

    const isVisualizacao = operacao === "visualizacao";
    const isCadastro = operacao === "cadastro";

    const labelBotao = isVisualizacao
        ? "Editar"
        : isCadastro
            ? "Concluir"
            : "Salvar"
        ;

    const handleClick = () => {
        if (isVisualizacao) {
            setOperacao("edicao");
        } else if (isCadastro) {
            handleConfirmar();
        } else {
            handleSalvar();
        }
    };

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

    const [cpfUser, setCpfUser] = useState(userInfo.responsaveis[0].cpf && formatCPF(userInfo.responsaveis[0].cpf));

    useEffect(() => {
        const camposPreenchidos =
            userInfo.responsaveis[0].nome
            && userInfo.responsaveis[0].email
            && cpfValido
            && userInfo.autorizado !== null;

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const emailValido = regexEmail.test(userInfo.responsaveis[0].email);

        const condicionalLiberacao = camposPreenchidos && emailValido;

        setBotaoLiberado(condicionalLiberacao);
        setRespConcluido(condicionalLiberacao);
    }, [userInfo, cpfValido]);

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
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        flexDirection: "row",
                        columnGap: "15px",
                        rowGap: "10px",
                        flex: 1.3,
                        height: "fit-content",
                    }}
                >
                    <Box>
                        <label>
                            Nome <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    responsaveis: [
                                        {
                                            ...userInfo.responsaveis[0],
                                            nome: e.target.value.toUpperCase(),
                                        },
                                    ],
                                })
                            }
                            value={userInfo.responsaveis[0].nome}
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "8px"
                                },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    "-webkit-text-fill-color": "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>
                    <Box>
                        <label>RG</label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    responsaveis: [
                                        {
                                            ...userInfo.responsaveis[0],
                                            rg: e.target.value.toUpperCase(),
                                        },
                                    ],
                                })
                            }
                            value={userInfo.responsaveis[0].rg}
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "8px"
                                },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    "-webkit-text-fill-color": "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>
                    <Box>
                        <label>
                            CPF <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            value={cpfUser}
                            onChange={(e) => {
                                const raw = e.target.value.replace(/\D/g, "");
                                setCpfUser(formatCPF(raw))
                                setUserInfo({
                                    ...userInfo,
                                    responsaveis: [
                                        {
                                            ...userInfo.responsaveis[0],
                                            cpf: raw,
                                        },
                                    ],
                                })
                            }
                            }
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "8px"
                                },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    "-webkit-text-fill-color": "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>
                    <Box>
                        <label
                            style={{ display: "flex", alignItems: "center", gap: "5px" }}
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
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    responsaveis: [
                                        {
                                            ...userInfo.responsaveis[0],
                                            nomeSocial: e.target.value.toUpperCase(),
                                        },
                                    ],
                                })
                            }
                            value={userInfo.responsaveis[0].nomeSocial}
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "8px"
                                },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    "-webkit-text-fill-color": "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>
                    <Box>
                        <label>Profissão</label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    responsaveis: [
                                        {
                                            ...userInfo.responsaveis[0],
                                            profissao: e.target.value.toUpperCase(),
                                        },
                                    ],
                                })
                            }
                            value={userInfo.responsaveis[0].profissao}
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "8px"
                                },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    "-webkit-text-fill-color": "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>
                    <Box>
                        <label>Gênero</label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    responsaveis: [
                                        {
                                            ...userInfo.responsaveis[0],
                                            genero: e.target.value.toUpperCase(),
                                        },
                                    ],
                                })
                            }
                            value={userInfo.responsaveis[0].genero}
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "8px"
                                },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    "-webkit-text-fill-color": "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>
                    <Box>
                        <label>
                            Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    responsaveis: [
                                        {
                                            ...userInfo.responsaveis[0],
                                            email: e.target.value.toUpperCase(),
                                        },
                                    ],
                                })
                            }
                            value={userInfo.responsaveis[0].email}
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "8px"
                                },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    "-webkit-text-fill-color": "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>
                    <Box>
                        <label>Telefone</label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    responsaveis: [
                                        {
                                            ...userInfo.responsaveis[0],
                                            telefone: e.target.value,
                                        },
                                    ],
                                })
                            }
                            placeholder={operacao === "cadastro" ? "(00) 00000-0000" : ""}
                            value={formatarTelefone(userInfo.responsaveis[0].telefone)}
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "8px"
                                },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    "-webkit-text-fill-color": "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>
                    <Box>
                        <label>Celular</label>
                        <TextField
                            disabled={operacao === "visualizacao"}
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    responsaveis: [
                                        {
                                            ...userInfo.responsaveis[0],
                                            celular: e.target.value,
                                        },
                                    ],
                                })
                            }
                            value={formatarTelefone(userInfo.responsaveis[0].celular)}
                            placeholder={operacao === "cadastro" ? "(00) 00000-0000" : ""}
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "8px"
                                },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    "-webkit-text-fill-color": "rgba(0, 0, 0, 0.60)"
                                },
                                width: "100%",
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ color: "black", marginTop: "10px" }}>
                <label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                    }}
                >
                    Autorização <span style={{ color: "red" }}>*</span>
                    <Tooltip
                        title={
                            <Typography sx={{ fontSize: "14px" }}>
                                {autorizacaoText}
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
                    value={userInfo.autorizado}
                    defaultValue="true"
                    onChange={(e) =>
                        setUserInfo({ ...userInfo, autorizado: e.target.value })
                    }
                >
                    <FormControlLabel
                        value={true}
                        control={<Radio
                            disabled={operacao === "visualizacao"}
                            sx={{
                                "&.Mui-disabled.Mui-checked": {
                                    color: "#00000080",
                                },
                            }}
                        />}
                        label="Sim"
                    />
                    <FormControlLabel
                        value={false}
                        control={<Radio
                            disabled={operacao === "visualizacao"}
                            sx={{
                                "&.Mui-disabled.Mui-checked": {
                                    color: "#00000080",
                                },
                            }}
                        />}
                        label="Não"
                    />
                </RadioGroup>
            </Box>
            <Box
                sx={{
                    marginTop: "auto",
                    display: "flex",
                    gap: "10px",
                }}
            >
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
                    <DefaultButton
                        variant="outlined"
                        label={operacao === "visualizacao"
                            ? "Excluir"
                            : "Voltar"
                        }
                        onClick={() => {
                            operacao === "visualizacao"
                                ? setIsModalDeleteOpen(true)
                                : setTabAtiva("ende");
                        }}
                    />
                    <DefaultButton
                        variant="contained"
                        label={labelBotao}
                        disabled={!botaoLiberado}
                        onClick={handleClick}
                    />
                </Box>
            </Box>
            <ToastContainer />
        </FormControl>
    );
};
