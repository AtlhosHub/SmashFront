import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { DefaultBreadcrumb } from '../DefaultComponents/DefaultBreadcrumb/DefaultBreadcrumb';
import { Aniversariantes } from './Components/Aniversariantes';
import { Kpi } from '../DefaultComponents/KPI';
import discount from '../../assets/Discount.png';
import people from '../../assets/Users.png';
import { Grafico } from './Components/Grafico';
import { Box } from '@mui/material';

import {
    getAlunosAniversariantes,
    getConteudoGrafico,
    getNumAlunos,
    getNumDesconto
} from './utils/apiRequest';
import { getBreadcrumbRoutes } from './utils/breadCrumbRoutes';
import './style.css';

export const Dashboard = () => {
    const navigate = useNavigate;

    const [qtdPagamentosComDesconto, setQtdPagamentosComDesconto] = useState('0');
    const [aniversariantes, setAniversariantes] = useState([]);
    const [qtdAlunosAtivos, setQtdAlunosAtivos] = useState('0');
    const [dadosDash, setDadosDash] = useState([]);

    const listarAniversariantes = async () => {
        try {
            const alunosAniversariantes = await getAlunosAniversariantes();
            setAniversariantes(alunosAniversariantes);
        } catch (error) {
            if (error.response.status === 401 || error.response.data.message === 'JWT strings must contain exactly 2 period characters. Found: 0') {
                sessionStorage.clear();
                navigate('/', { state: { tokenLogout: true } });
            }
        }
    };

    const listarQtdAlunosAtivos = async () => {
        try {
            const numAlunos = await getNumAlunos();
            setQtdAlunosAtivos(numAlunos);
        } catch (error) {
            if (error.response.status === 401 || error.response.data.message === 'JWT strings must contain exactly 2 period characters. Found: 0') {
                sessionStorage.clear();
                navigate('/', { state: { tokenLogout: true } });
            }
        }
    };

    const listarPagamentosComDesconto = async () => {
        try {
            const numDesconto = await getNumDesconto();
            setQtdPagamentosComDesconto(numDesconto);
        } catch (error) {
            if (error.response.status === 401 || error.response.data.message === 'JWT strings must contain exactly 2 period characters. Found: 0') {
                sessionStorage.clear();
                navigate('/', { state: { tokenLogout: true } });
            }
        }
    };

    const listarDadosDashboard = async () => {
        try {
            const dadosGrafico = await getConteudoGrafico();
            setDadosDash(dadosGrafico);
        } catch (error) {
            if (error.response.status === 401 || error.response.data.message === 'JWT strings must contain exactly 2 period characters. Found: 0') {
                sessionStorage.clear();
                navigate('/', { state: { tokenLogout: true } });
            }
        }
    };

    useEffect(() => {
        listarAniversariantes();
        listarQtdAlunosAtivos();
        listarPagamentosComDesconto();
        listarDadosDashboard();
    }, []);

    return (
        <Box fontFamily={'Poppins, sans-serif'}
            sx={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
            }}
        >
            <DefaultBreadcrumb rotas={getBreadcrumbRoutes()} altura={70} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: '30px',
                    gap: '30px',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        boxSizing: 'border-box',
                        gap: '30px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '30px'
                        }}
                    >
                        <Kpi
                            title="total de alunos ativos"
                            content={qtdAlunosAtivos ?? 0}
                            startIcon={
                                <img src={people} />
                            }
                        />
                        <Kpi
                            title="pagamentos com desconto (ano)"
                            content={qtdPagamentosComDesconto ?? 0}
                            startIcon={
                                <img
                                    src={discount}
                                />
                            }
                        />
                    </Box>
                    <Grafico
                        dadosDash={dadosDash}
                    />
                </Box>
                <Box
                    sx={{
                        width: '60%',
                    }}
                >
                    <Aniversariantes
                        alunos={aniversariantes}
                    />
                </Box>
            </Box>
        </Box>
    );
};