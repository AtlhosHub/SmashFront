import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { Box } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';

import { meses } from './enum';
import './Aniversariantes.css';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const Aniversariantes = ({ alunos }) => {
    const [respostaFormatada, setRespostaFormatada] = useState([]);
    const dataAtual = dayjs().startOf('day');

    const formatarResposta = () => {
        if (!Array.isArray(alunos) || alunos.length === 0) {
            setRespostaFormatada([]);
            return;
        }

        const respostaObj = {};

        alunos.forEach(({ nome, dataNascimento }) => {
            if (!dataNascimento) return;
            const d = dayjs(dataNascimento);
            if (!d.isValid()) return;

            const dia = String(d.date()).padStart(2, '0');
            const mes = d.month();
            const nomeMes = meses[mes] ?? `MÊS ${mes + 1}`;
            const mesStr = String(mes + 1).padStart(2, '0');

            if (!respostaObj[nomeMes]) respostaObj[nomeMes] = [];

            respostaObj[nomeMes].push({
                nome,
                data: `${dia}/${mesStr}`
            });
        });

        Object.keys(respostaObj).forEach(m => {
            respostaObj[m].sort((a, b) => {
                const diaA = parseInt(a.data.split('/')[0], 10);
                const diaB = parseInt(b.data.split('/')[0], 10);
                return diaA - diaB;
            });
        });

        const resultado = Object.entries(respostaObj)
            .map(([mes, aniversariantes]) => ({ mes, aniversariantes }))
            .sort((a, b) => meses.indexOf(a.mes) - meses.indexOf(b.mes));

        setRespostaFormatada(resultado);
    };

    const verificarAniversario = (data) => {
        const [dia, mes] = data.split('/');
        const anoAtual = dayjs().year();

        const dataFormatada = dayjs(`${anoAtual}-${mes}-${dia}`).startOf('day');
        if (dataFormatada.isBefore(dataAtual)) return 'niver-passado'
        else if (dataFormatada.isAfter(dataAtual)) return 'niver-futuro';
        else return 'niver-atual';
    };

    useEffect(() => {
        if (alunos.length > 0) formatarResposta();
    }, [alunos]);

    return (
        <Box sx={{ border: '1px solid black', borderRadius: '10px', overflow: 'hidden' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'white',
                    height: '506px',
                    overflowY: 'scroll',
                    p: '30px 40px',
                    boxSizing: 'border-box',
                }}
                className='datas-box'
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.8 }}>
                    <Box
                        sx={{
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                        }}
                    >
                        <CakeIcon sx={{ fontSize: 30 }} />Aniversariantes
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <span style={{ fontWeight: 300 }}>Hoje:</span>
                        <span style={{ fontWeight: 700 }}>{dataAtual.format('DD/MM/YYYY')}</span>
                    </Box>
                </Box>
                <Box>
                    {respostaFormatada.map(({ mes, aniversariantes }) => {
                        const inicio = dataAtual.subtract(7, 'day');
                        const fim = dataAtual.add(2, 'month');
                        const proximos = aniversariantes.filter(({ data }) => {
                            const [dia, mesStr] = data.split('/');
                            const aniversario = dayjs(`${dayjs().year()}-${mesStr}-${dia}`);
                            return aniversario.isSameOrAfter(inicio) && aniversario.isSameOrBefore(fim);
                        });

                        if (!proximos.length) return null;
                        return (
                            <Box className='niver-wrap' key={mes}>
                                <Box className='mes-niver-box atual'>
                                    <span>{mes.toUpperCase()}</span>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {proximos.map(({ nome, data }) => {
                                        const classe = verificarAniversario(data);
                                        const aniversario = classe === 'niver-atual';
                                        return (
                                            <Box className='niver-box' key={nome + data}>
                                                <span className={classe}>{data} - {nome}{aniversario && ' 🎉'}</span>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};