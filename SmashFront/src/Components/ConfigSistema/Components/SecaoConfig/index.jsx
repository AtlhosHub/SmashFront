import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
	Box,
	Typography,
	IconButton,
	Collapse,
	Divider,
	TextField,
	Paper
} from '@mui/material';
import { Add, Delete, ExpandLess, ExpandMore } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ControleInputHora from '../ControleInputHora';

export const SecaoConfig = ({
	secao,
	config,
	aberta,
	toggleSecao,
	modoEdicao,
	dadosTemporarios,
	setDadosTemporarios,
	setError
}) => {
	const [errosHorarios, setErrosHorarios] = useState([]);

	const adicionarItem = () => {
		const novoArray = [...dadosTemporarios[secao].data, { horarioAulaInicio: null, horarioAulaFim: null }];
		setErrosHorarios((prev) => [
			...prev,
			{ inicio: true, fim: true }
		]);
		setError(true);
		atualizarSecao(novoArray);
	};

	const removerItem = (index) => {
		const novoArray = [...dadosTemporarios[secao].data];
		novoArray.splice(index, 1);
		atualizarSecao(novoArray);
		setErrosHorarios((prev) => {
			const novo = [...prev];
			novo.splice(index, 1);
			return novo;
		});
	};

	const atualizarSecao = (novoData) => {
		setDadosTemporarios((prev) => ({
			...prev,
			[secao]: { ...prev[secao], data: novoData }
		}));
	};

	const atualizarHora = (index, campo, valor) => {
		const novoArray = dadosTemporarios[secao].data.map((item, i) =>
			i === index ? { ...item, [campo]: dayjs(valor).format('HH:mm') } : item
		);
		atualizarSecao(novoArray);
	};

	const atualizarValor = (campo, valor) => {
		const valorNumerico = parseFloat(String(valor).replace(',', '.'));

		const novoArray = Array.isArray(dadosTemporarios[secao].data)
			? dadosTemporarios[secao].data.map((item, i) =>
				i === 0 ? { ...item, [campo]: isNaN(valorNumerico) ? '' : valorNumerico } : item
			)
			: [{ [campo]: isNaN(valorNumerico) ? '' : valorNumerico }];

		atualizarSecao(novoArray);
	};

	const handleHoraChange = (index, campo, novaHora) => {
		atualizarHora(index, campo, novaHora);
	};

	useEffect(() => {
		if (secao === 'horarioAulas') {
			setErrosHorarios((prev) =>
				dadosTemporarios[secao].data.map((item) => {
					const inicio = item.horarioAulaInicio;
					const fim = item.horarioAulaFim;
					let erroInicio = !inicio;
					let erroFim = !fim;

					if (inicio && fim) {
						const dInicio = dayjs(inicio, 'HH:mm');
						const dFim = dayjs(fim, 'HH:mm');
						if (!dInicio.isBefore(dFim)) {
							erroInicio = true;
							erroFim = true;
						}
					}

					return { inicio: erroInicio, fim: erroFim };
				})
			);
		}
	}, [dadosTemporarios, secao]);

	useEffect(() => {
		const temErroManual = errosHorarios.some((item) => (item?.inicio && item?.fim));

		let temCampoVazio = false;
		const dataArray = Array.isArray(dadosTemporarios[secao]?.data) ? dadosTemporarios[secao].data : [];

		if (secao === 'horarioAulas') {
			temCampoVazio = dataArray.some(
				(item) => !item.horarioAulaInicio || !item.horarioAulaFim
			);
		} else {
			temCampoVazio = dataArray.some(
				(item) => !item.data && item.data !== 0
			);
		}

		setError(temCampoVazio || temErroManual);
	}, [errosHorarios, dadosTemporarios, secao]);

	return (
		<Paper variant="outlined" sx={{ mb: 2 }}>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				px={2}
				py={1.5}
				onClick={toggleSecao}
				sx={{ cursor: 'pointer', backgroundColor: '#f9f9f9' }}
			>
				<Typography variant="subtitle1">{config.description.toUpperCase()}</Typography>
				<Box display="flex" alignItems="center" gap={1}>
					{modoEdicao && config.type === 'multiple' && (
						<IconButton onClick={(e) => { e.stopPropagation(); adicionarItem(); }}>
							<Add fontSize="small" />
						</IconButton>
					)}
					{aberta ? <ExpandLess /> : <ExpandMore />}
				</Box>
			</Box>

			<Collapse in={aberta}>
				<Divider />
				<Box p={2} display="flex" flexDirection="column" gap={2}>
					{config.type === 'multiple' ? (
						config.data.map((valor, index) => (
							<Box key={index} display="flex" alignItems="center" justifyContent="space-between" gap={2}>
								{modoEdicao ? (
									<Box display="flex" gap={2} alignItems="center">
										●
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<ControleInputHora
												index={index}
												tipo="inicio"
												maxValue={valor.horarioAulaFim}
												hora={valor.horarioAulaInicio}
												setHora={(novaHora) => handleHoraChange(index, 'horarioAulaInicio', novaHora)}
												setErrosHorarios={setErrosHorarios}
												erroAtual={errosHorarios[index]?.inicio}
											/>
											às
											<ControleInputHora
												index={index}
												tipo="fim"
												minValue={valor.horarioAulaInicio}
												hora={valor.horarioAulaFim}
												setHora={(novaHora) => handleHoraChange(index, 'horarioAulaFim', novaHora)}
												setErrosHorarios={setErrosHorarios}
												erroAtual={errosHorarios[index]?.fim}
											/>
										</LocalizationProvider>
									</Box>
								) : (
									<Typography>● {valor.horarioAulaInicio} às {valor.horarioAulaFim}</Typography>
								)}
								{modoEdicao && (
									<IconButton onClick={(e) => { e.stopPropagation(); removerItem(index); }}>
										<Delete fontSize="small" />
									</IconButton>
								)}
							</Box>
						))
					) : (
						modoEdicao ? (
							<TextField
								fullWidth
								type="number"
								value={config?.data?.[0]?.data ?? ''}
								disabled={!modoEdicao}
								inputProps={{ inputMode: 'decimal' }}
								sx={{
									'& input[type=number]::-webkit-inner-spin-button': {
										display: 'none',
									},
									'& input[type=number]::-webkit-outer-spin-button': {
										display: 'none',
									},
								}}
								onChange={(e) => atualizarValor('data', e.target.value)}
							/>
						) : (
							<Typography>{Number(config?.data[0]?.data).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
						))
					}
				</Box>
			</Collapse>
		</Paper>
	);
};