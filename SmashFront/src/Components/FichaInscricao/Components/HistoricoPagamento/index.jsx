import dayjs from 'dayjs';
import { Box, Tooltip } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';

import { DefaultButton } from '../../../DefaultComponents/DefaultButton';
import { DefaultTable } from '../../../DefaultComponents/DefaultTable';
import { dateFormater } from '../../../../utils/dateFormaterService';
import { toasterMsg } from '../../../../utils/toasterService';
import { api } from '../../../../provider/apiProvider';

export const HistoricoPagamento = ({ userInfo }) => {
    const [selectedMonth, setSelectedMonth] = useState(null);

    const headCells = [
        {
            name: 'dataVencimento',
            description: 'Data de Vencimento',
            align: 'center'
        },
        {
            name: 'dataEnvio',
            description: 'Data de Pagamento',
            align: 'center'
        },
        {
            name: 'formaPagamento',
            description: 'Forma de Pagamento',
            align: 'center'
        },
        {
            name: 'valor',
            description: 'Valor Pago',
            align: 'center'
        }
    ];

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        listarHistoricoPagamento(userInfo.id);
    }, []);

    const handleBuscarClick = () => {
        if (selectedMonth) {
            const dateFrom = dayjs(selectedMonth).startOf('month').format('YYYY-MM-DD');
            const dateTo = dayjs(selectedMonth).endOf('month').format('YYYY-MM-DD');
            listarHistoricoPagamento(userInfo.id, dateFrom, dateTo);
        } else {
            listarHistoricoPagamento(userInfo.id, null, null);
        }
    };

    const listarHistoricoPagamento = (id, dateFrom, dateTo) => {
        api.post(
            `/alunos/${id}/historicoMensalidade`,
            {
                dateFrom: dateFrom || null,
                dateTo: dateTo || null
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                }
            }
        )
            .then((response) => {
                const formattedData = response.data.map((aluno) => ({
                    ...aluno,
                    dataEnvio: aluno.dataEnvio ? dateFormater(aluno.dataEnvio) : null,
                    valor: aluno.valor != null
                        ? aluno.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        : null,
                    valorColor: aluno.desconto ? '#286DA8' : 'inherit',
                    dataVencimento: aluno.dataVencimento ? dateFormater(aluno.dataVencimento) : null,
                }));

                setRowData(formattedData);
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg('error', 'Erro ao listar mensalidades, por favor contacte os admnistradores.');
                } else {
                    toasterMsg('error', error.response.data);
                }
            });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px', pt: '30px', pr: '30px', flex: 1 }}>
            <h2 style={{ textTransform: 'uppercase', color: 'black' }}>{userInfo.nome}</h2>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Data de Pagamento"
                        size="small"
                        value={selectedMonth}
                        format="MMMM/YYYY"
                        views={['year', 'month']}
                        maxDate={dayjs().endOf('year')}
                        onChange={(e) => setSelectedMonth(e)}
                        slotProps={{
                            textField: { size: 'small', placeholder: 'Mês/Ano' },
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: '8px',
                                height: '35px',
                            },
                            '& .MuiInputBase-input': {
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 400,
                                fontSize: '14px',
                                color: 'black',
                                padding: '8px 14px',
                                display: 'flex',
                                alignItems: 'center',
                            },
                            '& .MuiInputLabel-root': {
                                top: '-4px',
                                fontSize: '16px',
                            },
                            '& .MuiInputLabel-shrink': {
                                top: 0,
                                fontSize: '16px',
                            },
                        }}
                    />
                </LocalizationProvider>
                <DefaultButton
                    label="Buscar"
                    variant="contained"
                    onClick={handleBuscarClick}
                />
                <DefaultButton
                    label="Limpar"
                    variant="outlined"
                    onClick={() => {
                        setSelectedMonth(null),
                        listarHistoricoPagamento(userInfo.id);
                    }}
                />
            </Box>
            <DefaultTable
                headCells={headCells}
                rowData={rowData.map(row => ({
                    ...row,
                    valor: row.desconto ? (
                        <Tooltip title="Pago com desconto" arrow placement="top">
                            <span style={{ color: row.valorColor }}>
                                {row.valor}
                            </span>
                        </Tooltip>
                    ) : (
                        <span style={{ color: row.valorColor }}>
                            {row.valor}
                        </span>
                    )
                }))}
                withPagStatus={true}
            />
        </Box>
    );
};

export default HistoricoPagamento;