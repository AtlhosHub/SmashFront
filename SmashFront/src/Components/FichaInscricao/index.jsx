import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Box } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { DefaultBreadcrumb } from '../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb';
import { MenuCadastro } from '../DefaultComponents/MenuCadastro/MenuCadastro';
import { useFichaInscricao } from './Components/FichaInscricaoContext';
import { ModalDelete } from '../DefaultComponents/Modals/ModalDelete';
import FormResponsavel from './Components/FormResponsavel';
import FormEndereco from './Components/FormEndereco';
import FormInfo from './Components/FormInfo';
import HistoricoPagamento from './Components/HistoricoPagamento';

import { formatEditPayload, formatAddPayload } from './utils/formatPayload';
import { toasterMsg } from '../../utils/toasterService';
import { setTabName } from './utils/setTabName';
import { api } from '../../provider/apiProvider';
import { formatResponse } from './utils/formatResponse';

export const FichaInscricao = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        userInfo,
        operacao,
        infoConcluido,
        enderecoConcluido,
        respConcluido,
        maiorIdade,
        tabAtiva,
        setTabAtiva,
        isModalDeleteOpen,
        setIsModalDeleteOpen,
        setOperacao,
        setUserInfo,
        setMaiorIdade
    } = useFichaInscricao();

    const rotas = [
        {
            route: '/alunos',
            description: 'Mensalidades'
        },
        {
            route: '/fichaInscricao',
            description: setTabName(operacao)
        }
    ];

    const etapasMenu = [
        {
            id: 'info',
            nome: 'Informações',
            Icone: AccountCircleOutlinedIcon,
            visivel: true,
            concluido: infoConcluido,
            podeAtivar: () => true
        },
        {
            id: 'ende',
            nome: 'Endereço',
            Icone: FmdGoodOutlinedIcon,
            visivel: true,
            concluido: enderecoConcluido,
            podeAtivar: () => infoConcluido
        },
        {
            id: 'resp',
            nome: 'Responsável',
            Icone: FamilyRestroomIcon,
            visivel: !maiorIdade,
            concluido: respConcluido,
            podeAtivar: () => infoConcluido && enderecoConcluido
        },
        {
            id: 'paga',
            nome: 'Histórico de Pagamento',
            Icone: HistoryIcon,
            visivel: operacao === 'visualizacao',
            concluido: true,
            podeAtivar: () => true
        }
    ];

    const cadastrarAluno = () => {
        const payload = formatAddPayload(userInfo, maiorIdade);

        api.post('/alunos', payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then(() => {
                navigate('/alunos', { state: { userCreated: true } });
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg('error', 'Erro ao cadastrar aluno, por favor contacte os admnistradores.');
                } else {
                    toasterMsg('error', error.response.data);
                }
            });
    };

    const editarAluno = () => {
        const payload = formatEditPayload(userInfo, maiorIdade);

        api.put(`/alunos/${userInfo.id}`, payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then(() => {
                toasterMsg('success', 'Aluno editado com sucesso!');
                setOperacao('visualizacao');
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg('error', 'Erro ao editar aluno, por favor contacte os admnistradores.');
                } else {
                    toasterMsg('error', error.response.data);
                }
            });
    };

    const deletarAluno = () => {
        api.delete(`/alunos/${userInfo.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then(() => {
                navigate('/alunos', { state: { userDeleted: true } });
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg('error', 'Erro ao deletar aluno, por favor contacte os admnistradores.');
                } else {
                    toasterMsg('error', error.response.data);
                }
            });
    };

    const listarDadosAluno = async (id) => {
        const response = await api.get(`/alunos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => { return response.data; })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg('error', 'Erro ao listar alunos, por favor contacte os admnistradores.');
                } else {
                    toasterMsg('error', error.response);
                }
            });

        const formattedResponse = formatResponse(response);

        setUserInfo(formattedResponse);
        setMaiorIdade(dayjs().diff(dayjs(response.dataNascimento), 'year') >= 18);
    };

    useEffect(() => {
        if (operacao !== 'cadastro') listarDadosAluno(location.state?.idAluno);
    }, []);

    return (
        <React.Fragment>
            <Box sx={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                height: '90.9vh'
            }}>
                <DefaultBreadcrumb rotas={rotas} />
                <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
                    <MenuCadastro
                        operacao={operacao}
                        tabAtiva={tabAtiva}
                        setTabAtiva={setTabAtiva}
                        etapas={etapasMenu}
                    />
                    {tabAtiva === 'info' &&
                        <FormInfo />
                    }
                    {tabAtiva === 'ende' &&
                        <FormEndereco
                            handleSalvar={editarAluno}
                            handleConfirmar={cadastrarAluno}
                        />
                    }
                    {tabAtiva === 'resp' &&
                        <FormResponsavel
                            handleConfirmar={cadastrarAluno}
                            handleSalvar={editarAluno}
                        />
                    }
                    {tabAtiva === 'paga' &&
                        <HistoricoPagamento
                            userInfo={userInfo}
                        />
                    }
                </Box>
            </Box >
            <ToastContainer />
            <ModalDelete
                textoModal={'a Ficha de Inscrição do Aluno'}
                isModalOpen={isModalDeleteOpen}
                setIsModalOpen={setIsModalDeleteOpen}
                handleDelete={deletarAluno}
            />
        </React.Fragment>
    );
};