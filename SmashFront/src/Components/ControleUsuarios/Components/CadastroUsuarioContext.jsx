import dayjs from 'dayjs';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { dateIsoFormatter } from '../../../utils/dateFormaterService';

const CadastroUsuarioContext = createContext();

export const CadastroUsuarioProvider = ({ children }) => {
    const location = useLocation();

    const [userInfo, setUserInfo] = useState({
        nome: null,
        email: null,
        celular: null,
        dataNascimento: null,
        nomeSocial: null,
        genero: null,
        senha: null,
        telefone: null,
        cargo: null,
        dataInclusao: dateIsoFormatter(dayjs().toISOString()),
        usuarioInclusao: sessionStorage.getItem('idUsuario')
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

    useEffect(() => {
        if (senha == confirmarSenha) {
            setUserInfo({ ...userInfo, senha: senha });
        }
    }, [senha, confirmarSenha]);

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