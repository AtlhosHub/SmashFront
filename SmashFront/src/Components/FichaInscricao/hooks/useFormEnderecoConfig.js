import { useMemo } from "react";

export const useFormEnderecoConfig = ({
    userInfo,
    setUserInfo,
    operacao,
    handleCepChange,
    messagemErroCEP,
    formatarCep
}) => {
    const formConfig = useMemo(() => ({
        campos: [
            {
                key: "cep",
                label: "CEP",
                required: true,
                disabled: operacao === "visualizacao",
                value: formatarCep(userInfo.endereco.cep),
                onChange: (e) => handleCepChange(e),
                inputProps: { maxLength: 9 },
                errorMessage: messagemErroCEP.current
            },
            {
                key: "logradouro",
                label: "Rua",
                required: true,
                disabled: true,
                value: userInfo.endereco.logradouro,
                onChange: (e) =>
                    setUserInfo({ ...userInfo, endereco: { ...userInfo.endereco, logradouro: e.target.value } })
            },
            {
                key: "numLogradouro",
                label: "Número",
                required: true,
                disabled: operacao === "visualizacao",
                value: userInfo.endereco.numLogradouro,
                onChange: (e) => {
                    const regex = /^[A-Za-z0-9]*$/;
                    const valor = e.target.value;
                    if (regex.test(valor)) {
                        setUserInfo({
                            ...userInfo,
                            endereco: {
                                ...userInfo.endereco,
                                numLogradouro: valor,
                            },
                        });
                    }
                }
            },
            {
                key: "bairro",
                label: "Bairro",
                disabled: true,
                value: userInfo.endereco.bairro,
                onChange: (e) =>
                    setUserInfo({ ...userInfo, endereco: { ...userInfo.endereco, bairro: e.target.value } })
            },
            {
                key: "estado",
                label: "Estado",
                disabled: true,
                value: userInfo.endereco.estado,
                onChange: (e) =>
                    setUserInfo({ ...userInfo, endereco: { ...userInfo.endereco, estado: e.target.value } })
            },
            {
                key: "cidade",
                label: "Cidade",
                disabled: true,
                value: userInfo.endereco.cidade,
                onChange: (e) =>
                    setUserInfo({ ...userInfo, endereco: { ...userInfo.endereco, cidade: e.target.value } })
            },
        ]
    }), [userInfo, operacao, setUserInfo, handleCepChange, messagemErroCEP]);

    return formConfig;
};
