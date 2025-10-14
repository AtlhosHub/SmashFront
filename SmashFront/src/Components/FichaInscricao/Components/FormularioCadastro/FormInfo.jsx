import dayjs from 'dayjs';
import { useEffect, useRef, useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkDateFilled } from '../../utils/checkDateFilled';
import { FormBuilder } from '../../../DefaultComponents/FormBuilder';
import { useFichaInscricao } from '../FichaInscricaoContext';
import { formatCPF, validarCpf } from '../../../../utils/validateCpf';
import { useFormInfoConfig } from '../../hooks/useFormInfoConfig';
import { ToastContainer } from 'react-toastify';

export const FormInfo = () => {
    const navigate = useNavigate();

    const {
        userInfo,
        setUserInfo,
        maiorIdade,
        isDeficiente,
        setMaiorIdade,
        setTabAtiva,
        setInfoConcluido,
        setIsDeficiente,
        setIsModalDeleteOpen,
        setCpfValido,
        operacao,
        setOperacao
    } = useFichaInscricao();

    const [botaoLiberado, setBotaoLiberado] = useState(false);
    const [cpfUser, setCpfUser] = useState(formatCPF(userInfo?.cpf));

    const errorDate = useRef(false);
    const dataPreenchida = useRef(false);

    const labels = {
        visualizacao: 'Editar',
        cadastro: 'Próximo',
        edicao: 'Próximo'
    };

    const labelBotao = labels[operacao] ?? 'Próximo';

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
        switch (operacao) {
            case 'visualizacao':
                setOperacao('edicao');
                break;
            default:
                setTabAtiva('ende');
                break;
        }
    };

    useEffect(() => {
        const cpf = userInfo?.cpf || '';
        const cpfFormatado = formatCPF(cpf);
        const cpfEhValido = validarCpf(cpf);

        setCpfUser(cpfFormatado);
        setCpfValido(cpfEhValido);

        const camposPreenchidos =
            userInfo.nome &&
            userInfo.rg &&
            cpfEhValido &&
            checkDateFilled(userInfo?.dataNascimento, setMaiorIdade, dataPreenchida);

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const emailValido = regexEmail.test(userInfo.email);
        const emailNecessario = maiorIdade ? emailValido : true;

        const nomeMaiorQueTres = userInfo?.nome?.length >= 3;

        const condicionalLiberacao =
            camposPreenchidos &&
            emailNecessario &&
            (!isDeficiente ? true : !!userInfo.deficiencia === true) &&
            !errorDate.current &&
            nomeMaiorQueTres;

        setBotaoLiberado(condicionalLiberacao);
        setInfoConcluido(condicionalLiberacao);
    }, [userInfo, maiorIdade, isDeficiente]);

    const formConfig = useFormInfoConfig({
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
    });

    return (
        <React.Fragment>
            <FormBuilder
                campos={formConfig.campos}
                radios={formConfig.radios}
                cancelButton={{
                    label: operacao === 'visualizacao' ? 'Excluir' : 'Cancelar',
                    onClick: operacao === 'visualizacao'
                        ? () => setIsModalDeleteOpen(true)
                        : () => navigate('/alunos'),
                    color: operacao === 'visualizacao' ? 'red' : ''
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
        </React.Fragment>
    );
};