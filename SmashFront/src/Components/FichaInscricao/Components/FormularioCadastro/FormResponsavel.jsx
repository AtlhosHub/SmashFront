import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useFormResponsavelConfig } from "../../hooks/useFormResponsavelConfig";
import { useFichaInscricao } from "../FichaInscricaoContext";
import { FormBuilder } from "../../../DefaultComponents/FormBuilder";
import { formatCPF } from "../../../../utils/validateCpf";

export const FormResponsavel = ({
    handleSalvar,
    handleConfirmar
}) => {
    const {
        userInfo,
        setUserInfo,
        setTabAtiva,
        setIsModalDeleteOpen,
        cpfValido,
        operacao,
        setOperacao,
        setRespConcluido
    } = useFichaInscricao();

    const [botaoLiberado, setBotaoLiberado] = useState(false);
    const [cpfUser, setCpfUser] = useState(formatCPF(userInfo.responsaveis[0].cpf));

    const labels = {
        visualizacao: "Editar",
        cadastro: "Concluir",
        edicao: "Salvar"
    };

    const labelBotao = labels[operacao] ?? "Salvar";

    const handleClick = () => {
        switch (operacao) {
            case "visualizacao":
                setOperacao("edicao");
                break;
            case "cadastro":
                handleConfirmar();
                break;
            case "edicao":
                handleSalvar();
                break;
            default:
                handleSalvar();
        };
    }

    useEffect(() => {
        console.log(operacao)
    }, [])

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
    }, [cpfValido, setRespConcluido, userInfo.autorizado, userInfo.responsaveis]);

    const formConfig = useFormResponsavelConfig({
        userInfo,
        setUserInfo,
        operacao,
        cpfUser,
        setCpfUser,
        formatCPF
    })

    return (
        <>
            <FormBuilder
                campos={formConfig.campos}
                radios={formConfig.radios}
                cancelButton={{
                    label: operacao === "visualizacao"
                        ? "Excluir"
                        : "Voltar",
                    onClick: operacao === "visualizacao"
                        ? () => setIsModalDeleteOpen(true)
                        : () => setTabAtiva("ende"),
                    color: operacao === "visualizacao"
                        ? "red"
                        : ""
                }}
                confirmButton={{
                    label: labelBotao,
                    onClick: handleClick,
                    disabled: !botaoLiberado
                }}
                columnsWidth={[1, 1, 1]}
                operacao={operacao}
            />
            <ToastContainer />
        </>
    );
};
