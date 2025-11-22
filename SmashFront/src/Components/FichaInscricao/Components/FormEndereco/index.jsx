import React, { useEffect, useRef, useState } from 'react';
import { toasterMsg } from '../../../../utils/toasterService';
import { ToastContainer } from 'react-toastify';
import { useFormEnderecoConfig } from '../../hooks/useFormEnderecoConfig';
import { useFichaInscricao } from '../FichaInscricaoContext';
import { FormBuilder } from '../../../DefaultComponents/FormBuilder';

export const FormEndereco = ({
    handleSalvar,
    handleConfirmar
}) => {
    const {
        userInfo,
        maiorIdade,
        cepValido,
        setUserInfo,
        setEnderecoConcluido,
        setTabAtiva,
        setCepValido,
        operacao,
        setOperacao,
        setIsModalDeleteOpen,
    } = useFichaInscricao();

    const [botaoLiberado, setBotaoLiberado] = useState(false);
    const [numLogDisabled, setNumLogDisabled] = useState(true);
    const messagemErroCEP = useRef();

    const labels = {
        visualizacao: 'Editar',
        cadastro: maiorIdade
            ? 'Salvar'
            : 'Próximo',
        edicao: maiorIdade
            ? 'Salvar'
            : 'Próximo',
    };

    const labelBotao = labels[operacao] ?? 'Próximo';

    const handleClick = () => {
        switch (operacao) {
            case 'visualizacao':
                setOperacao('edicao');
                break;
            case 'cadastro':
                if (maiorIdade) { handleConfirmar(); break; }
                setTabAtiva('resp');
                break;
            case 'edicao':
                if (maiorIdade) { handleSalvar(); break; }
                setTabAtiva('resp');
                break;
        }
    };

    const formatarCep = (valor) => {
        if (!valor) return '';
        const apenasNumeros = valor.replace(/\D/g, '').slice(0, 8);

        if (apenasNumeros.length <= 5) {
            return apenasNumeros;
        }

        return apenasNumeros.slice(0, 5) + '-' + apenasNumeros.slice(5);
    };

    const handleCepChange = async (e) => {
        const cepNumerico = e?.target?.value?.replace(/\D/g, '') ?? '';

        setUserInfo(prev => ({
            ...prev,
            endereco: { ...prev.endereco, cep: { value: cepNumerico } },
        }));

        if (cepNumerico.length === 0) {
            setUserInfo((prev) => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    logradouro: '',
                    bairro: '',
                    cidade: '',
                    estado: '',
                    numLogradouro: '',
                },
            }));
            setCepValido(false);
            return;
        }

        if (
            cepNumerico?.length === 8 &&
            cepNumerico !== (userInfo.endereco.cep.value || '').replace(/\D/g, '')
        ) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
                const data = await response.json();

                if (!data.erro) {
                    setUserInfo((prev) => ({
                        ...prev,
                        endereco: {
                            ...prev.endereco,
                            logradouro: data.logradouro,
                            bairro: data.bairro,
                            cidade: data.localidade,
                            estado: data.uf,
                            numLogradouro: prev.endereco.numLogradouro,
                        },
                    }));
                    setCepValido(true);
                } else {
                    toasterMsg('error', 'CEP não encontrado!');
                    setCepValido(false);
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        } else if (cepNumerico?.length !== 8) {
            setCepValido(false);
        }
    };

    useEffect(() => {
        const camposPreenchidos = (operacao === 'cadastro' ? cepValido : true) && userInfo.endereco.numLog;

        setBotaoLiberado(camposPreenchidos);
        setEnderecoConcluido(camposPreenchidos);
    }, [userInfo, cepValido]);

    useEffect(() => {
        const { logradouro, bairro, cidade, estado } = userInfo.endereco;
        if (logradouro && bairro && cidade && estado) {
            setNumLogDisabled(false);
        } else {
            setNumLogDisabled(true);
        }
    }, [userInfo.endereco]);

    const formConfig = useFormEnderecoConfig({
        userInfo,
        setUserInfo,
        operacao,
        numLogDisabled,
        handleCepChange,
        formatarCep,
        messagemErroCEP
    });

    return (
        <React.Fragment>
            <FormBuilder
                campos={formConfig.campos}
                radios={formConfig.radios}
                cancelButton={{
                    label: operacao === 'visualizacao' ? 'Excluir' : 'Voltar',
                    onClick: operacao === 'visualizacao'
                        ? () => setIsModalDeleteOpen(true)
                        : () => setTabAtiva('info'),
                    color: operacao === 'visualizacao' ? 'red' : ''
                }}
                confirmButton={{
                    label: labelBotao,
                    onClick: handleClick,
                    disabled: !botaoLiberado
                }}
                columnsWidth={[1, 1]}
                operacao={operacao}
            />
            <ToastContainer />
        </React.Fragment>
    );
};

export default FormEndereco;