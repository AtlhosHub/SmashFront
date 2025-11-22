import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import dayjs from 'dayjs';

import { Box } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { toasterMsg } from '../../../../utils/toasterService';
import { DefaultBreadcrumb } from '../../../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb';
import { MenuCadastro } from '../../../DefaultComponents/MenuCadastro/MenuCadastro';
import { ModalDelete } from '../../../DefaultComponents/Modals/ModalDelete';
import { deleteInteressado, editInteressado, getDadosInteressado, savePessoaInteressada } from '../../utils/apiRequest';
import { getBreadcrumbRoutes } from '../../utils/breadCrumbRoutes';
import { FormBuilder } from '../../../DefaultComponents/FormBuilder';
import useFormInfoConfig from '../../hooks/useFormInfoConfig';
import { useCadastroInteressado } from '../CadastroInteressadoContext';
import { formatFormResponse } from '../../utils/formatResponse';

export const CadastrarInteressado = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const errorDate = useRef(false);

    const {
        userInfo,
        operacao,
        infoConcluido,
        tabAtiva,
        setTabAtiva,
        isModalDeleteOpen,
        setIsModalDeleteOpen,
        setOperacao,
        setUserInfo,
    } = useCadastroInteressado();

    const labels = {
        visualizacao: 'Editar',
    };

    const labelBotao = labels[operacao] ?? 'Salvar';

    const handleCadastrar = async () => {
        try {
            const payload = {
                nome: userInfo.nome,
                email: userInfo.email,
                dataInteresse: userInfo.dataInteresse
                    ? dayjs(userInfo.dataInteresse).format('YYYY-MM-DDTHH:mm')
                    : null,
                celular: userInfo.celular,
                nomeSocial: userInfo.nomeSocial,
                genero: userInfo.genero,
                dataNascimento: userInfo.dataNascimento
                    ? dayjs(userInfo.dataNascimento).format('YYYY-MM-DD')
                    : null,
                telefone: userInfo.telefone,
                horarioPrefId: userInfo.horarioPref.id,
            };

            await savePessoaInteressada(payload);

            navigate('/listaEspera', { state: { saved: true } });
        } catch (error) {
            if (error.response?.status === 409) {
                alert('Este nome e e-mail já estão cadastrados na lista de espera.');
            } else {
                console.error(error);
                alert('Erro ao cadastrar interessado.');
            }
        }
    };

    const handleFetchData = async () => {
        try {
            const response = await getDadosInteressado(location.state?.idPessoa);

            const formattedResponse = formatFormResponse(response);

            setUserInfo(formattedResponse);
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg('error', 'Erro ao cadastrar interessado, por favor contacte os admnistradores.');
            } else {
                toasterMsg('error', error.response.data);
            }
        }
    };

    const handleEdit = async () => {
        console.log('ba');

        try {
            const payload = {
                nome: userInfo.nome,
                nomeSocial: userInfo.nomeSocial,
                genero: userInfo.genero,
                email: userInfo.email,
                dataInteresse: userInfo.dataInteresse
                    ? dayjs(userInfo.dataInteresse).format('YYYY-MM-DDTHH:mm')
                    : null,
                dataNascimento: userInfo.dataNascimento
                    ? dayjs(userInfo.dataNascimento).format('YYYY-MM-DD')
                    : null,
                celular: userInfo.celular,
                telefone: userInfo.telefone,
                horarioPrefId: userInfo.horarioPref.id,
            };

            await editInteressado(location.state?.idPessoa, payload);

            toasterMsg('success', 'Perfil de Pessoa Interessada editado com sucesso!');
            setOperacao('visualizacao');
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg('error', 'Erro ao editar interessado, por favor contacte os admnistradores.');
            } else {
                toasterMsg('error', error.response.data);
            }
        };
    };

    const handleDelete = async () => {
        try {
            await deleteInteressado(location.state?.idPessoa);

            toasterMsg('success', 'Perfil de Pessoa Interessada deletado com sucesso!');
            navigate('/listaEspera', { state: { userDeleted: true } });
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg('error', 'Erro ao deletar interessado, por favor contacte os admnistradores.');
            } else {
                toasterMsg('error', error.response.data);
            }
        }
    };

    const handleClick = () => {
        if (operacao === 'visualizacao') {
            setOperacao('edicao');
        } else if (operacao === 'cadastro') {
            handleCadastrar();
        } else {
            handleEdit();
        }
    };

    const formConfig = useFormInfoConfig({
        userInfo,
        setUserInfo,
        operacao,
        errorDate
    });

    useEffect(() => {
        if (operacao !== 'cadastro') {
            handleFetchData();
        }
    }, []);

    useEffect(() => {
        const camposPreenchidos = userInfo.nome && userInfo.email && userInfo.horarioPref && userInfo.dataNascimento && userInfo.dataInteresse;

        setSaveButtonDisabled(!camposPreenchidos);
    }, [userInfo.nome, userInfo.email, userInfo.horarioPref, userInfo.dataNascimento, userInfo.dataInteresse]);

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateRows: 'auto 1fr',
                    height: '90.9vh'
                }}>
                <DefaultBreadcrumb rotas={getBreadcrumbRoutes(operacao)} />
                <Box sx={{ display: 'flex', flex: 1 }}>
                    <MenuCadastro
                        operacao={operacao}
                        tabAtiva={tabAtiva}
                        setTabAtiva={setTabAtiva}
                        etapas={[
                            {
                                id: 'info',
                                nome: 'Informações',
                                Icone: AccountCircleOutlinedIcon,
                                visivel: true,
                                concluido: infoConcluido,
                                podeAtivar: () => true
                            }
                        ]}
                    />

                    <FormBuilder
                        campos={formConfig.campos}
                        radios={formConfig.radios}
                        cancelButton={{
                            label: operacao === 'visualizacao' ? 'Excluir' : 'Cancelar',
                            onClick: operacao === 'visualizacao'
                                ? () => setIsModalDeleteOpen(true)
                                : () => navigate('/listaEspera'),
                            color: operacao === 'visualizacao' ? 'red' : ''
                        }}
                        confirmButton={{
                            label: labelBotao,
                            onClick: handleClick,
                            disabled: saveButtonDisabled
                        }}
                        columnsWidth={[1, 1, 1]}
                        operacao={operacao}
                    />
                </Box>
            </Box>
            <ToastContainer />
            <ModalDelete
                textoModal={'o perfil de Pessoa Interessada'}
                isModalOpen={isModalDeleteOpen}
                setIsModalOpen={setIsModalDeleteOpen}
                handleDelete={handleDelete}
            />
        </React.Fragment>
    );
};