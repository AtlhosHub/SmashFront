import { useMemo } from "react";
import dayjs from "dayjs";
import { checkDateFilled } from "../utils/checkDateFilled";
import { formatarTelefone } from "../utils/validacaoForm";
import { TOOLTIP_MESSAGES } from "../../../constants/tooltips";

export const useFormInfoConfig = ({
    userInfo,
    setUserInfo,
    isDeficiente,
    setIsDeficiente,
    cpfUser,
    setCpfUser,
    setMaiorIdade,
    dataPreenchida,
    errorDate,
    maiorIdade,
    operacao,
    isMaiorDeIdade,
    formatCPF
}) => {
    const formConfig = useMemo(() => ({
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
    }), [
        userInfo,
        isDeficiente,
        cpfUser,
        operacao,
        maiorIdade,
        setUserInfo,
        setCpfUser,
        setIsDeficiente
    ]);

    return formConfig;
};