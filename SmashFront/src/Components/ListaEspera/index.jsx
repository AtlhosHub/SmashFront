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

import { toasterMsg } from '../../utils/toasterService';
import { formatListResponse } from './utils/formatResponse';
import { deleteInteressado, getListaEspera } from './utils/apiRequest';
import { renderAcoes } from './utils/renderColumns';
import { getHeadCells } from './utils/headerCells';

export const ListaEspera = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchValueRef = useRef('');
    const [rowData, setRowData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const idToDelete = useRef(undefined);

    const timeoutRef = useRef(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const [pageableData, setPageableData] = useState({
        offset: 0,
        limit: 5,
        totalItems: 0
    });

    const rotas = [
        { route: '/listaEspera', description: 'Lista de Espera', cellWidth: '100%' },
    ];

    const handleInputChange = e => {
        const v = e.target.value;
        setSearchValue(v);
        searchValueRef.current = v;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(fetchListaEspera, 800);
    };

    const fetchListaEspera = async (novoOfsset = pageableData.offset) => {
        const paylaod = {
            nome: searchValueRef.current || null,
            offset: novoOfsset,
            limit: pageableData.limit
        };

        try {
            const { total, content } = await getListaEspera(paylaod);
            if (!content) return;

            const formattedData = formatListResponse(content);
            setRowData(formattedData);
            setPageableData({
                ...pageableData,
                totalItems: total,
                offset: novoOfsset
            });
        } catch (error) {
            if (error.message.status === 500) {
                toasterMsg('error', 'Erro ao listar interessados, por favor contacte os admnistradores.');
            } else {
                toasterMsg('error', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteInteressado(id);

            fetchListaEspera();
            idToDelete.current = undefined;
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

    const formatRowData = (rows) => {
        return rows.map(row => ({
            ...row,
            acoes: renderAcoes({
                row,
                navigate,
                idToDelete,
                setIsModalDeleteOpen,
            })
        }));
    };

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
                        onClick={() => navigate('/cadastroInteressado', { state: { operacao: 'cadastro' } })}
                    />
                </Box>
                <Box>
                    <DefaultTable
                        headCells={getHeadCells()}
                        rowData={formatRowData(rowData)}
                        totalItems={pageableData.totalItems}
                        fetchMoreData={fetchListaEspera}
                    />
                </Box>
            </Box> 
            <ToastContainer />
            <ModalDelete
                textoModal={'o Perfil de Pessoa Interessada'}
                isModalOpen={isModalDeleteOpen}
                setIsModalOpen={setIsModalDeleteOpen}
                handleDelete={() => handleDelete(idToDelete.current)}
            />
        </React.Fragment>
    );
};