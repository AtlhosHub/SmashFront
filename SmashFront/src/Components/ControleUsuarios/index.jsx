import React, { useEffect, useState } from 'react';
import { DefaultBreadcrumb } from '../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb';
import { DefaultButton } from '../DefaultComponents/DefaultButton';
import { DefaultTable } from '../DefaultComponents/DefaultTable';
import { ToastContainer } from 'react-toastify';
import {
    Box,
    InputAdornment,
    TextField
} from '@mui/material';
import {
    Add,
    Search
} from '@mui/icons-material';
import { api } from '../../provider/apiProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { toasterMsg } from '../../utils/toasterService';
import ActionMenu from '../DefaultComponents/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalDelete } from '../DefaultComponents/Modals/ModalDelete';
import { getAllUsuarios } from './utils/apiRequest';

export const ControleUsuarios = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [pageableData, setPageableData] = useState({
        offset: 0,
        limit: 5,
        totalItems: 0
    });

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(undefined);
    const [searchValue, setSearchValue] = useState('');
    const [rowData, setRowData] = useState([]);

    const rotas = [
        {
            route: '/controleUsuarios',
            description: 'Controle de Usuários'
        }
    ];

    const headCells = [
        {
            name: 'nome',
            description: 'Nome do Usuário Administrador',
            cellWidth: '100%'
        }
    ];

    const listarUsuarios = async (novoOfsset = pageableData.offset) => {
        const payload = {
            offset: novoOfsset,
            limit: pageableData.limit,
            nome: searchValue
        };

        try {
            const { total, content } = await getAllUsuarios(payload);

            if (content.length === 0) {
                setRowData([]);
                setPageableData({
                    ...pageableData,
                    totalItems: 0,
                    offset: 0,
                });
                return;
            };

            setRowData(content);
            setPageableData({
                ...pageableData,
                totalItems: total,
                offset: novoOfsset,
            });
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg('error', 'Erro ao listar usuários, por favor contacte os admnistradores.');
            } else {
                toasterMsg('error', error.message.data);
            }
        }
    };

    const handleDelete = (id) => {
        api.delete(`usuarios/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then(() => {
                toasterMsg('success', 'Usuário deletado com sucesso!');
                setIsModalDeleteOpen(false);
                setRowToDelete(undefined);
                listarUsuarios();
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg('error', 'Erro ao deletar usuário, por favor contacte os admnistradores.');
                } else {
                    toasterMsg('error', error.message.data);
                }
            });
    };

    useEffect(() => {
        listarUsuarios();
    }, []);

    useEffect(() => {
        const flags = [
            { key: 'userCreated', type: 'success', msg: 'Usuário cadastrado com sucesso!' },
            { key: 'userDeleted', type: 'success', msg: 'Usuário deletado com sucesso!' },
        ];

        const newState = { ...location.state };

        flags.forEach(({ key, type, msg }) => {
            if (location.state?.[key]) {
                toasterMsg(type, msg);
                delete newState[key];
            }
        });

        if (JSON.stringify(newState) !== JSON.stringify(location.state)) {
            globalThis.history.replaceState(newState, document.title);
        }
    }, [location]);

    return (
        <React.Fragment>
            <Box>
                <DefaultBreadcrumb rotas={rotas} />
            </Box>

            <Box className="main-content">
                <Box className="action-area">
                    <TextField
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        label="Nome do Usuário"
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: '8px',
                                width: '400px',
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
                                    <Search sx={{ color: 'black' }} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <DefaultButton
                        variant="contained"
                        label="Novo Cadastro"
                        onClick={() => navigate('/cadastroUsuarios', {
                            state: {
                                operacao: 'cadastro'
                            }
                        })}
                        endIcon={<Add />}
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
                                        navigate('/cadastroUsuarios', {
                                            state: {
                                                idUsuario: row.id,
                                                operacao: 'visualizacao'
                                            }
                                        });
                                    }
                                },
                                {
                                    label: 'Editar',
                                    icon: <EditIcon fontSize="small" />,
                                    onClickFunc: () => {
                                        navigate('/cadastroUsuarios', {
                                            state: {
                                                idUsuario: row.id,
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
                                    },
                                    disabled: String(row.id) === String(sessionStorage.getItem('idUsuario'))
                                }
                            ]}
                            />
                        }))}
                        totalItems={pageableData.totalItems}
                        fetchMoreData={listarUsuarios}
                    />
                </Box>
            </Box>
            <ToastContainer />
            <ModalDelete
                isModalOpen={isModalDeleteOpen}
                setIsModalOpen={setIsModalDeleteOpen}
                handleDelete={() => handleDelete(rowToDelete)}
            />
        </React.Fragment>
    );
};
