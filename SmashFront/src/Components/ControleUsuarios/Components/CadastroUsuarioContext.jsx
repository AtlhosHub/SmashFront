import { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultUser } from '../utils/defaultUser';

const CadastroUsuarioContext = createContext();

export const CadastroUsuarioProvider = ({ children }) => {
    const location = useLocation();

    const [userInfo, setUserInfo] = useState({
        ...defaultUser,
        usuarioInclusao: { id: sessionStorage.getItem('idUsuario') }
    });

    const [tabAtiva, setTabAtiva] = useState('info');
    const [operacao, setOperacao] = useState(location.state?.operacao || 'cadastro');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [infoConcluido, setInfoConcluido] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const [cpfValido, setCpfValido] = useState(false);
    const [cepValido, setCepValido] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
    const [erroConfirmarSenha, setErroConfirmarSenha] = useState(false);

    return (
        <CadastroUsuarioContext.Provider
            value={{
                userInfo,
                setUserInfo,
                tabAtiva,
                setTabAtiva,
                operacao,
                setOperacao,
                infoConcluido,
                setInfoConcluido,
                cepValido,
                setCepValido,
                isModalDeleteOpen,
                setIsModalDeleteOpen,
                cpfValido,
                setCpfValido,
                mostrarSenha,
                setMostrarSenha,
                senha,
                setSenha,
                mostrarConfirmarSenha,
                setMostrarConfirmarSenha,
                confirmarSenha,
                setConfirmarSenha,
                erroConfirmarSenha,
                setErroConfirmarSenha
            }}
        >
            {children}
        </CadastroUsuarioContext.Provider>
    );
};

export const useCadastroUsuario = () => {
    return useContext(CadastroUsuarioContext);
};