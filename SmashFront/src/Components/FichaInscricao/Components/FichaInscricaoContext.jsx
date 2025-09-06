import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { defaultUser } from "../utils/defaultUser";

const FichaInscricaoContext = createContext();

export const FichaInscricaoProvider = ({ children }) => {
    const location = useLocation();

    const [userInfo, setUserInfo] = useState({
        ...defaultUser,
        usuarioInclusao: { id: sessionStorage.getItem("idUsuario") }
    });

    const [tabAtiva, setTabAtiva] = useState("info");
    const [operacao, setOperacao] = useState(location.state?.operacao || "cadastro");

    const [infoConcluido, setInfoConcluido] = useState(false);
    const [enderecoConcluido, setEnderecoConcluido] = useState(false);
    const [respConcluido, setRespConcluido] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const [maiorIdade, setMaiorIdade] = useState(true);
    const [isDeficiente, setIsDeficiente] = useState(false)
    const [cpfValidoAluno, setCpfValidoAluno] = useState(false);
    const [cpfValido, setCpfValido] = useState(false);
    const [cpfValidoResp, setCpfValidoResp] = useState(false);
    const [cepValido, setCepValido] = useState(false);

    useEffect(() => {
        if (!isDeficiente) setUserInfo({ ...userInfo, deficiencia: null })
    }, [isDeficiente])

    return (
        <FichaInscricaoContext.Provider
            value={{
                userInfo,
                setUserInfo,
                tabAtiva,
                setTabAtiva,
                operacao,
                setOperacao,
                infoConcluido,
                setInfoConcluido,
                enderecoConcluido,
                setEnderecoConcluido,
                respConcluido,
                setRespConcluido,
                maiorIdade,
                setMaiorIdade,
                isDeficiente,
                setIsDeficiente,
                cpfValidoAluno,
                setCpfValidoAluno,
                cpfValidoResp,
                setCpfValidoResp,
                cepValido,
                setCepValido,
                isModalDeleteOpen,
                setIsModalDeleteOpen,
                cpfValido,
                setCpfValido
            }}
        >
            {children}
        </FichaInscricaoContext.Provider>
    )
}

export const useFichaInscricao = () => {
    return useContext(FichaInscricaoContext);
}