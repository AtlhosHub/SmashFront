import React, { useEffect, useState } from 'react';
import { DefaultButton } from '../../DefaultButton';
import { DefaultModal } from '../../DefaultModal';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { api } from '../../../../provider/apiProvider';
import { toasterMsg } from '../../../../utils/toasterService';

export const ModalStatus = ({
    isModalOpen,
    setIsModalOpen,
    statusInfoModal,
    handleApplyFilter
}) => {

    const [statusPagamento, setStatusPagamento] = useState(null);
    const [formaPagamento, setFormaPagamento] = useState(null);
    const [dataPagamento, setDataPagamento] = useState(null);
    const [valorPago, setValorPago] = useState('');

    const statusPagArray = [
        { label: 'PAGO' },
        { label: 'PENDENTE' },
        { label: 'ATRASADO' }
    ];

    const formaPagArray = [
        { label: 'DINHEIRO' },
        { label: 'PIX' }
    ];

    const [statusInfo, setStatusInfo] = useState({
        alunoId: statusInfoModal.idAluno,
        status: null,
        dataPagamento: null,
        valorPago: null,
        formaPagamento: null,
    });


    const isSalvarHabilitado =
        !!statusPagamento &&
        (
            statusPagamento.label !== 'PAGO' ||
            (
                statusPagamento.label === 'PAGO' &&
                formaPagamento &&
                valorPago &&
                dataPagamento
            )
        );

    const handleValorPago = (e) => {
        const valor = e.target.value.replace(/\D/g, '');
        const valorDecimal = (Number(valor) / 100).toFixed(2);
        const valorFormatado = Number(valorDecimal).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        setValorPago(valorFormatado);
        setStatusInfo({ ...statusInfo, valorPago: valorDecimal });
    };

    useEffect(() => {
        if (isModalOpen) {
            const statusSelecionado = statusPagArray.find(
                s => s.label === statusInfoModal.status?.toUpperCase()
            );
            setStatusPagamento(statusSelecionado || null);
            const formaSelecionada = formaPagArray.find(
                f => f.label === statusInfoModal.formaPagamento?.toUpperCase()
            );
            setFormaPagamento(formaSelecionada || null);
            setDataPagamento(statusInfoModal.dataPagamento ? dayjs(statusInfoModal.dataPagamento) : null);
            if (statusInfoModal.valor) {
                const valorFormatado = (statusInfoModal.valor).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });
                setValorPago(valorFormatado);
            } else {
                setValorPago('');
            }
        }
        setStatusInfo({
            alunoId: statusInfoModal.idAluno,
            status: statusInfoModal.status || null,
            dataPagamento: statusInfoModal.dataPagamento
                ? dayjs(statusInfoModal.dataPagamento).format('YYYY-MM-DDTHH:mm:ss')
                : null,
            valorPago: statusInfoModal.valor
                ? Number(
                    String(statusInfoModal.valor)
                        .replace(/[^\d,]/g, '')
                        .replace(',', '.')
                )
                : null,
            formaPagamento: statusInfoModal.formaPagamento || null,
        });
    }, [isModalOpen, statusInfoModal]);

    useEffect(() => {
        if (statusPagamento?.label !== 'PAGO') {
            setFormaPagamento(null);
            setDataPagamento(null);
            setValorPago('');
            setStatusInfo((prev) => ({
                ...prev,
                formaPagamento: null,
                dataPagamento: null,
                valorPago: 0,
            }));
        }
    }, [statusPagamento]);


    const alterarStatusMensalidade = () => {
        api.put(`/mensalidades/${statusInfoModal.idMensalidade}/pagar`, statusInfo, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    handleApplyFilter();
                    toasterMsg('success', 'Status da mensalidade alterado com sucesso!');
                }
            })
            .catch((error) => {
                if (error.message.status === 500) {
                    toasterMsg('error', 'Erro ao alterar status da mensalidade, por favor contacte os admnistradores.');
                } else {
                    toasterMsg('error', error.response.data);
                }
            });
    };

    return (
        <DefaultModal modalTitle={'Alterar Status do Comprovante'} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
            <Box
                sx={{
                    border: '1px solid #286DA8',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '20px',
                    borderRadius: '8px',
                    mb: '20px',
                }}
            >
                <Typography >
                    <strong>Nome do Atleta</strong><br />
                    <Box
                        component="span"
                        sx={{
                            display: 'block',
                            width: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            verticalAlign: 'bottom'
                        }}
                        title={statusInfoModal.nome}
                    >
                        {statusInfoModal.nome ? statusInfoModal.nome.toUpperCase() : null}
                    </Box>
                </Typography>
                <Typography >
                    <strong>Mês de Vencimento</strong><br />
                    {statusInfoModal.dataVencimento
                        ? dayjs(statusInfoModal.dataVencimento).format('MMMM').toUpperCase()
                        : null}
                </Typography>
                <Box>
                    <Typography >
                        <strong>Status</strong><br />
                    </Typography>
                    <Autocomplete
                        size="small"
                        value={statusPagamento}
                        options={statusPagArray}
                        renderInput={(params) => <TextField {...params} placeholder="Selecione o Status" />}
                        onChange={(_, newValue) => {
                            setStatusPagamento(newValue);
                            setStatusInfo({ ...statusInfo, status: newValue ? newValue.label : null });
                        }}
                    />
                </Box>
                <Box>
                    <Typography >
                        <strong>Forma de Pagamento</strong><br />
                    </Typography>
                    <Autocomplete
                        size="small"
                        value={formaPagamento}
                        options={formaPagArray}
                        renderInput={(params) => <TextField {...params} placeholder={statusPagamento?.label === 'PAGO' ? 'Selecione a Forma de Pagamento' : ''} />}
                        onChange={(_, newValue) => {
                            setFormaPagamento(newValue),
                                setStatusInfo({ ...statusInfo, formaPagamento: newValue ? newValue.label : null });
                        }}
                        disabled={statusPagamento?.label !== 'PAGO'}
                        sx={{
                            '& .MuiInputBase-root.Mui-disabled': {
                                backgroundColor: '#00000015',
                            },
                            '& .MuiInputBase-input.Mui-disabled': {
                                '-webkit-text-fill-color': 'rgba(0, 0, 0, 0.60)'
                            },
                        }}
                    />
                </Box>
                <Box>
                    <Typography >
                        <strong>Valor Pago</strong><br />
                    </Typography>
                    <TextField
                        size="small"
                        variant="outlined"
                        sx={{
                            '& .MuiInputBase-root.Mui-disabled': {
                                backgroundColor: '#00000015',
                            },
                            '& .MuiInputBase-input.Mui-disabled': {
                                '-webkit-text-fill-color': 'rgba(0, 0, 0, 0.60)'
                            },
                            width: '100%',
                        }}
                        value={valorPago}
                        onChange={handleValorPago}
                        onInput={e => {
                            e.target.value = e.target.value.replace(/\D/g, '');
                        }}
                        placeholder={statusPagamento?.label === 'PAGO' ? 'R$ 200,00' : ''}
                        inputProps={{ inputMode: 'numeric' }}
                        disabled={statusPagamento?.label !== 'PAGO'}
                    />
                </Box>
                <Box>
                    <Typography >
                        <strong>Data do Pagamento</strong><br />
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            value={dataPagamento ? dayjs(dataPagamento) : null}
                            onChange={(newValue) => {
                                setDataPagamento(newValue);
                                setStatusInfo({
                                    ...statusInfo,
                                    dataPagamento: newValue
                                        ? dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss')
                                        : null,
                                });
                            }}
                            ampm={false}
                            format="DD/MM/YYYY HH:mm"
                            maxDateTime={dayjs()}
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true,
                                    placeholder: statusPagamento?.label === 'PAGO' ? 'DD/MM/AAAA HH:mm' : null,
                                },
                                layout: {
                                    sx: {
                                        '& .MuiClock-root': {
                                            marginBottom: 0,
                                        },
                                        '& .MuiClock': {
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: 'auto',
                                        },
                                        '& .MuiPickersLayout-contentWrapper': {
                                            alignItems: 'center',
                                        },
                                    },
                                },
                            }}
                            disabled={statusPagamento?.label !== 'PAGO'}
                            sx={{
                                '& .MuiInputBase-root.Mui-disabled': {
                                    backgroundColor: '#00000015',
                                },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    '-webkit-text-fill-color': 'rgba(0, 0, 0, 0.60)',
                                },
                            }}


                        />
                    </LocalizationProvider>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'end' }}>
                <DefaultButton label="Cancelar" onClick={() => setIsModalOpen(false)} />
                <DefaultButton
                    variant="contained"
                    label="Salvar"
                    onClick={() => {
                        alterarStatusMensalidade();
                        setIsModalOpen(false);
                    }}
                    disabled={!isSalvarHabilitado}
                />
            </Box>
        </DefaultModal>
    );
};