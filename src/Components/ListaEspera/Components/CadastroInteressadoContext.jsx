import { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CadastroInteressadoContext = createContext();

export const CadastroInteressadoProvider = ({ children }) => {
    const location = useLocation();

    const [userInfo, setUserInfo] = useState({
        nome: null,
        nomeSocial: null,
        genero: null,
        dataInteresse: null,
        dataNascimento: null,
        celular: null,
        telefone: null,
        email: null,
        horarioPref: null,
        usuarioInclusao: {
            id: sessionStorage.getItem('idUsuario'),
        }
    });

    const [operacao, setOperacao] = useState(location.state?.operacao || 'cadastro');

    const [infoConcluido, setInfoConcluido] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isLoadingHorarios, setIsLoadingHorarios] = useState(true);

    return (
        <CadastroInteressadoContext.Provider
            value={{
                userInfo,
                setUserInfo,
                operacao,
                setOperacao,
                infoConcluido,
                setInfoConcluido,
                isModalDeleteOpen,
                setIsModalDeleteOpen,
                isLoadingHorarios,
                setIsLoadingHorarios,
            }}
        >
            {children}
        </CadastroInteressadoContext.Provider>
    );
};

export const useCadastroInteressado = () => {
    return useContext(CadastroInteressadoContext);
};