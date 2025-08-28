import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { formatarTelefone } from "../../utils/validacaoForm";
import { useNavigate } from "react-router-dom";
import { checkDateFilled } from "../../utils/checkDateFilled";
import { FormBuilder } from "../../../FormBuilder";
import { TOOLTIP_MESSAGES } from "../../../../constants/tooltips";

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
    setIsModalDeleteOpen,
    setCpfValido,
    operacao,
    setOperacao
}) => {
    const navigate = useNavigate();

    const [botaoLiberado, setBotaoLiberado] = useState(false);

    const errorDate = useRef(false);
    const dataPreenchida = useRef(false);

    const isVisualizacao = operacao === "visualizacao";
    const isCadastro = operacao === "cadastro";
    const labelBotao = isVisualizacao
        ? "Editar"
        : isCadastro
            ? "Próximo"
            : "Próximo"

    const formatCPF = (value) => {
        if (!value) return "";
        const digits = value.replace(/\D/g, "").slice(0, 11);
        return digits
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const validarCpf = (value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length === 11;
    };

    const [cpfUser, setCpfUser] = useState(formatCPF(userInfo?.cpf));

    const isMaiorDeIdade = (dataNascimento) => {
        const hoje = dayjs();
        const nascimento = dayjs(dataNascimento);
        let idade = hoje.year() - nascimento.year();
        const mes = hoje.month() - nascimento.month();
        const dia = hoje.date() - nascimento.date();

        if (mes < 0 || (mes === 0 && dia < 0)) {
            idade--;
        }

        setMaiorIdade(idade >= 18);
    };

    const handleClick = () => {
        if (isVisualizacao) {
            setOperacao("edicao");
        } else {
            setTabAtiva("ende");
        }
    };

    useEffect(() => {
        const cpf = userInfo?.cpf || "";
        setCpfUser(formatCPF(cpf));
        setCpfValido(validarCpf(cpf));
    }, [userInfo?.cpf]);

    useEffect(() => {
        const camposPreenchidos = userInfo.nome && userInfo.rg && cpfValido && checkDateFilled(userInfo?.dataNascimento, setMaiorIdade, dataPreenchida);

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const emailValido = regexEmail.test(userInfo.email);
        const emailNecessario = maiorIdade ? emailValido : true;

        const nomeMaiorQueTres = userInfo?.nome?.length >= 3;

        const condicionalLiberacao = camposPreenchidos && emailNecessario && (!isDeficiente ? true : !!userInfo.deficiencia === true) && !errorDate.current && nomeMaiorQueTres;

        setBotaoLiberado(condicionalLiberacao);
        setInfoConcluido(condicionalLiberacao);
    }, [userInfo, maiorIdade, isDeficiente, cpfValido]);

    useEffect(() => {
        if (!isDeficiente) setUserInfo({ ...userInfo, deficiencia: null })
    }, [isDeficiente])

    const formConfig = {
        campos: [
            {
                key: "nome",
                label: "Nome do Aluno",
                required: operacao !== "visualizacao",
                placeholder: "Digite seu nome",
                disabled: operacao === "visualizacao",
                value: userInfo.nome,
                onChange: (e) => {
                    const regex = /^[A-Za-zÀ-ÿ\s]*$/;
                    if (regex.test(e.target.value)) {
                        setUserInfo({ ...userInfo, nome: e.target.value });
                    }
                }
            },
            {
                key: "nomeSocial",
                label: "Nome Social",
                toolTip: TOOLTIP_MESSAGES.nomeSocial,
                disabled: operacao === "visualizacao",
                value: userInfo.nomeSocial,
                onChange: (e) => {
                    const regex = /^[A-Za-zÀ-ÿ\s]*$/;
                    if (regex.test(e.target.value)) {
                        setUserInfo({ ...userInfo, nomeSocial: e.target.value });
                    }
                }
            },
            {
                key: "dataNascimento",
                label: "Data de Nascimento",
                required: operacao !== "visualizacao",
                type: "date",
                disabled: operacao === "visualizacao",
                value: userInfo.dataNascimento
                    ? dayjs(userInfo.dataNascimento)
                    : null
                ,
                onChange: (newValue) => {
                    checkDateFilled(newValue, setMaiorIdade, dataPreenchida) && isMaiorDeIdade(newValue);
                    setUserInfo({ ...userInfo, dataNascimento: dayjs(newValue).format("YYYY-MM-DD") });
                },
                onError: (reason) => { errorDate.current = !!reason; }
            },
            {
                key: "genero",
                label: "Gênero",
                disabled: operacao === "visualizacao",
                value: userInfo.genero,
                onChange: (e) => setUserInfo({ ...userInfo, genero: e.target.value })
            },
            {
                key: "email",
                label: "Email",
                required: maiorIdade && operacao !== "visualizacao",
                type: "email",
                disabled: operacao === "visualizacao",
                value: userInfo.email,
                onChange: (e) => setUserInfo({ ...userInfo, email: e.target.value })
            },
            {
                key: "nacionalidade",
                label: "Nacionalidade",
                disabled: operacao === "visualizacao",
                value: userInfo.nacionalidade,
                onChange: (e) => setUserInfo({ ...userInfo, nacionalidade: e.target.value })
            },
            {
                key: "naturalidade",
                label: "Naturalidade",
                disabled: operacao === "visualizacao",
                value: userInfo.naturalidade,
                onChange: (e) => setUserInfo({ ...userInfo, naturalidade: e.target.value })
            },
            {
                key: "telefone",
                label: "Telefone",
                type: "tel",
                disabled: operacao === "visualizacao",
                value: formatarTelefone(userInfo.telefone),
                onChange: (e) => setUserInfo({ ...userInfo, telefone: e.target.value }),
                placeholder: operacao === "cadastro" ? "(00) 00000-0000" : ""
            },
            {
                key: "celular",
                label: "Celular",
                type: "tel",
                disabled: operacao === "visualizacao",
                value: formatarTelefone(userInfo.celular),
                onChange: (e) => setUserInfo({ ...userInfo, celular: e.target.value }),
                placeholder: operacao === "cadastro" ? "(00) 00000-0000" : ""
            },
            {
                key: "cpf",
                label: "CPF",
                required: operacao !== "visualizacao",
                disabled: operacao === "visualizacao",
                value: cpfUser,
                onKeyDown: (e) => {
                    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"];
                    const isNumber = /^[0-9]$/.test(e.key);
                    if (!isNumber && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                    }
                },
                onChange: (e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setCpfUser(formatCPF(raw));
                    setUserInfo({ ...userInfo, cpf: raw });
                },
                inputProps: {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 14
                }
            },
            {
                key: "rg",
                label: "RG",
                required: operacao !== "visualizacao",
                disabled: operacao === "visualizacao",
                value: userInfo.rg,
                onChange: (e) => setUserInfo({ ...userInfo, rg: e.target.value })
            },
            {
                key: "profissao",
                label: "Profissão",
                disabled: operacao === "visualizacao",
                value: userInfo.profissao,
                onChange: (e) => setUserInfo({ ...userInfo, profissao: e.target.value })
            }
        ],
        radios: [
            {
                key: "ativo",
                radioTitle: "Status de Presença",
                toolTip: TOOLTIP_MESSAGES.statusPres,
                value: String(userInfo.ativo),
                onChange: (e) => setUserInfo({ ...userInfo, ativo: e.target.value }),
                options: [
                    { value: "true", label: "Ativo", disabled: operacao === "visualizacao" },
                    { value: "false", label: "Inativo", disabled: operacao === "visualizacao" }
                ]
            },
            {
                key: "temAtestado",
                radioTitle: "Atestados",
                toolTip: TOOLTIP_MESSAGES.atestado,
                value: String(userInfo.temAtestado),
                onChange: (e) => setUserInfo({ ...userInfo, temAtestado: e.target.value }),
                options: [
                    { value: "true", label: "Sim", disabled: operacao === "visualizacao" },
                    { value: "false", label: "Não", disabled: operacao === "visualizacao" }
                ]
            },
            {
                key: "deficiencia",
                radioTitle: "Possui Deficiência e/ou Neurodivergência?",
                toolTip: TOOLTIP_MESSAGES.deficiencia,
                value: String(isDeficiente),
                onChange: (e) => setIsDeficiente(e.target.value === "true"),
                options: [
                    { value: "true", label: "Sim", disabled: operacao === "visualizacao" },
                    { value: "false", label: "Não", disabled: operacao === "visualizacao" }
                ],
                textField: {
                    show: isDeficiente,
                    disabled: operacao === "visualizacao",
                    placeholder: "Especifique",
                    value: userInfo.deficiencia,
                    onChange: (e) => {
                        const regex = /^[A-Za-zÀ-ÿ\s]*$/;
                        if (regex.test(e.target.value)) {
                            setUserInfo({ ...userInfo, deficiencia: e.target.value });
                        }
                    }
                }
            }
        ]
    };

    return (
        <FormBuilder
            campos={formConfig.campos}
            radios={formConfig.radios}
            cancelButton={{
                label: operacao === "visualizacao" ? "Excluir" : "Cancelar",
                onClick: operacao === "visualizacao"
                    ? () => setIsModalDeleteOpen(true)
                    : () => navigate("/alunos"),
                color: operacao === "visualizacao" ? "red" : ""
            }}
            confirmButton={{
                label: labelBotao,
                onClick: handleClick,
                disabled: !botaoLiberado
            }}
            columnsWidth={[1, 1, 1]}
            operacao={operacao}
        />
    );
};