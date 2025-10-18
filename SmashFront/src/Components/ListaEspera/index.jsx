import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import {
    Box,
    InputAdornment,
    TextField
} from '@mui/material';
import {
    Add,
    Search
} from '@mui/icons-material';
import { DefaultBreadcrumb } from '../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb';
import { DefaultButton } from '../DefaultComponents/DefaultButton';
import { DefaultTable } from '../DefaultComponents/DefaultTable';
import { ModalDelete } from '../DefaultComponents/Modals/ModalDelete';
import ActionMenu from '../DefaultComponents/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { toasterMsg } from '../../utils/toasterService';
import { formatResponse } from './utils/formatResponse';
import { deleteInteressado, getListaEspera } from './utils/apiRequest';

export const ListaEspera = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchValueRef = useRef('');
    const [rowData, setRowData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [rowToDelete, setRowToDelete] = useState(undefined);

    const timeoutRef = useRef(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const [pageableDate, setPageableDate] = useState({
        offset: 0,
        limit: 5,
        totalItens: 0
    });

    const headCells = [
        { name: 'nome', description: 'Nome', cellWidth: '40%' },
        { name: 'dataInteresse', description: 'Data de Contato', cellWidth: '33%' },
        { name: 'horarioPreferencia', description: 'Horário de Preferência', cellWidth: '33%' },
    ];

    const rotas = [
        { route: '/listaEspera', description: 'Lista de Espera', cellWidth: '100%' },
    ];

    useEffect(() => {
        fetchListaEspera();

        const flags = [
            { key: 'userDeleted', type: 'success', msg: 'Perfil de Pessoa Interessada excluído com sucesso!' },
            { key: 'saved', type: 'success', msg: 'Perfil de Pessoa Interessada criado com sucesso!' },
        ];

        const newState = { ...location.state };

        flags.forEach(({ key, type, msg }) => {
            if (location.state?.[key]) {
                toasterMsg(type, msg);
                delete newState[key];
            }
        });

        if (JSON.stringify(newState) !== JSON.stringify(location.state)) {
            window.history.replaceState(newState, document.title);
        }
    }, []);

    const handleInputChange = e => {
        const v = e.target.value;
        setSearchValue(v);
        searchValueRef.current = v;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(fetchListaEspera, 800);
    };

    const fetchListaEspera = async () => {
        const paylaod = {
            nome: searchValueRef.current || null,
            offset: pageableDate.offset,
            limit: pageableDate.limit
        };

        try {
            const { total, content } = await getListaEspera(paylaod);
            if (!content) return;

            const formattedData = formatResponse(content);
            setRowData(formattedData);
            setPageableDate({
                ...pageableDate,
                totalItens: total
            });
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg('error', 'Erro ao listar interessados, por favor contacte os admnistradores.');
            } else {
                toasterMsg('error', error.response.data);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteInteressado(id);

            fetchListaEspera({});
            setRowToDelete(undefined);
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg('error', 'Erro ao deletar interessado, por favor contacte os admnistradores.');
            } else {
                toasterMsg('error', error.response.data);
            }
        } finally {
            setIsModalDeleteOpen(false);
            toasterMsg('success', 'Perfil de Pessoa Interessada excluído com sucesso!');
        }
    };

    return (
        <React.Fragment>
            <Box>
                <DefaultBreadcrumb rotas={rotas} />
            </Box>
            <Box className="main-content">
                <Box className="action-area">
                    <TextField
                        value={searchValue}
                        onChange={handleInputChange}
                        label="Nome"
                        variant="outlined"
                        size="small"
                        sx={{

                            '& .MuiInputBase-root': {
                                borderRadius: '8px',
                            },
                            '& .MuiInputBase-input': {
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 400,
                                fontSize: '14px',
                                color: 'black',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                    />
                    <DefaultButton
                        variant="contained"
                        label="Novo Cadastro"
                        endIcon={<Add />}
                        onClick={() => navigate('/cadastrarListaEspera', { state: { operacao: 'cadastro' } })}
                    />
                </Box>
                <Box>
                    <DefaultTable
                        headCells={headCells}
                        rowData={rowData.map(row => ({
                            ...row,
                            acoes: <ActionMenu menuOptions={[
                                {
                                    label: 'Visualizar',
                                    icon: <VisibilityIcon fontSize="small" />,
                                    onClickFunc: () => {
                                        navigate('/cadastrarListaEspera', {
                                            state: {
                                                idPessoa: row.id,
                                                operacao: 'visualizacao'
                                            }
                                        });
                                    }
                                },
                                {
                                    label: 'Editar',
                                    icon: <EditIcon fontSize="small" />,
                                    onClickFunc: () => {
                                        navigate('/cadastrarListaEspera', {
                                            state: {
                                                idPessoa: row.id,
                                                operacao: 'edicao'
                                            }
                                        });
                                    }
                                },
                                {
                                    label: 'Excluir',
                                    icon: <DeleteIcon fontSize="small" />,
                                    onClickFunc: () => {
                                        setRowToDelete(row.id);
                                        setIsModalDeleteOpen(true);
                                    }
                                },
                            ]} />
                        }))}
                        withActions={false}
                    />
                </Box>
            </Box>
            <ToastContainer />
            <ModalDelete
                textoModal={'o Perfil de Pessoa Interessada'}
                isModalOpen={isModalDeleteOpen}
                setIsModalOpen={setIsModalDeleteOpen}
                handleDelete={() => handleDelete(rowToDelete)}
            />
        </React.Fragment>
    );
};