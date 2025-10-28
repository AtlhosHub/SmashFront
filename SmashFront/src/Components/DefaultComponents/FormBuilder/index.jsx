import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

import {
    Box,
    Tooltip,
    Typography,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    InputAdornment,
    IconButton,
    Autocomplete,
} from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DefaultButton } from '../DefaultButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import HelpIcon from '@mui/icons-material/Help';

export const FormBuilder = ({
    campos,
    radios,
    columnsWidth,
    confirmButton,
    cancelButton
}) => {
    const [linhas, setLinhas] = useState([]);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    const [optionsCache, setOptionsCache] = useState({});

    const control = useRef(false);

    useEffect(() => {
        const linhasTemp = [];
        for (let i = 0; i < campos.length; i += columnsWidth.length) {
            linhasTemp.push(campos.slice(i, i + columnsWidth.length));
        }
        setLinhas(linhasTemp);
    }, [campos, radios, columnsWidth]);

    useEffect(() => {
        if (!control.current) {
            campos.forEach(async (campo) => {
                if (campo.type === 'autocomplete' && campo.fetchOptions) {
                    try {
                        const data = await campo.fetchOptions();

                        setOptionsCache((prev) => ({ ...prev, [campo.key]: data }));
                    } catch (e) {
                        console.error(`Erro ao carregar opções de ${campo.key}:`, e);
                    }
                }
            });

            control.current = true;
        }
    }), [];

    return (
        <FormControl
            sx={{
                paddingBlock: '30px',
                pr: '30px',
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    width: '100%',
                    color: 'black',
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                    {linhas.map((linha, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                flex: 1,
                                height: 'fit-content',
                            }}
                        >
                            {linha
                                .filter((campo) => campo.show !== false)
                                .map((campo, cidx) => (
                                    <Box key={cidx}>
                                        <label>
                                            {campo.label} {campo.required ? <span style={{ color: 'red' }}>*</span> : null}
                                            {campo.toolTip ? (
                                                <Tooltip
                                                    title={
                                                        <Typography sx={{ fontSize: '14px' }}>
                                                            {campo.toolTip}
                                                        </Typography>
                                                    }
                                                    placement="right"
                                                    arrow
                                                >
                                                    <HelpIcon
                                                        sx={{
                                                            marginTop: '1px',
                                                            color: '#286DA8',
                                                            fontSize: '18px',
                                                        }}
                                                    />
                                                </Tooltip>
                                            ) : null}
                                        </label>
                                        {campo?.type === 'date' && (
                                            <DatePicker
                                                size="small"
                                                disabled={campo.disabled}
                                                value={campo.value}
                                                format="DD/MM/YYYY"
                                                maxDate={dayjs().subtract(1, 'day')}
                                                minDate={dayjs('1940-01-01')}
                                                onChange={campo.onChange}
                                                onError={campo.onError}
                                                slotProps={{
                                                    textField: { size: 'small', placeholder: 'DD/MM/AAAA' },
                                                }}
                                                sx={{
                                                    '& .MuiInputBase-root': {
                                                        borderRadius: '8px'
                                                    },
                                                    '& .MuiOutlinedInput-root.Mui-disabled': {
                                                        backgroundColor: '#00000015',
                                                    },
                                                    '& .MuiInputBase-input.Mui-disabled': {
                                                        WebkitTextFillColor: 'rgba(0, 0, 0, 0.60)',
                                                    },
                                                    width: '100%',
                                                }}
                                            />
                                        )}
                                        {campo?.type === 'datetime' && (
                                            <DateTimePicker
                                                key={campo.nome}
                                                value={campo.value}
                                                onChange={campo.onChange}
                                                ampm={false}
                                                format="DD/MM/YYYY HH:mm"
                                                maxDateTime={campo.maxDateTime}
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                    seconds: renderTimeViewClock,
                                                }}
                                                disabled={campo.disabled}
                                                slotProps={{
                                                    textField: {
                                                        size: 'small',
                                                        fullWidth: true,
                                                        placeholder: 'DD/MM/AAAA HH:mm',
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
                                                            }
                                                        },
                                                    },
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                    },
                                                    '& .MuiOutlinedInput-root.Mui-disabled': {
                                                        backgroundColor: '#00000015',
                                                    },
                                                    '& .MuiInputBase-input.Mui-disabled': {
                                                        WebkitTextFillColor: 'rgba(0, 0, 0, 0.6)',
                                                    }
                                                }}
                                            />
                                        )}
                                        {campo?.type === 'text' && (
                                            <TextField
                                                disabled={campo.disabled}
                                                value={campo.value}
                                                onChange={campo.onChange}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiInputBase-root': {
                                                        borderRadius: '8px'
                                                    },
                                                    '& .MuiInputBase-input.Mui-disabled': {
                                                        WebkitTextFillColor: 'rgba(0, 0, 0, 0.60)',
                                                        backgroundColor: '#00000015',
                                                    },
                                                    width: '100%',
                                                }}
                                            />
                                        )}
                                        {campo?.type === 'password' && (
                                            <TextField
                                                key={campo.key}
                                                type={campo.type === 'password' ? (campo.key === 'senha' ? (mostrarSenha ? 'text' : 'password') : (mostrarConfirmarSenha ? 'text' : 'password')) : campo.type}
                                                value={campo.value}
                                                onChange={campo.onChange}
                                                error={campo.error}
                                                helperText={campo.helperText}
                                                variant="outlined"
                                                size="small"
                                                sx={{ width: '100%', '& .MuiInputBase-root': { borderRadius: '8px' } }}
                                                InputProps={{
                                                    endAdornment: campo.showToggle && (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={() =>
                                                                    campo.key === 'senha'
                                                                        ? setMostrarSenha(!mostrarSenha)
                                                                        : setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                                                                }
                                                                edge="end"
                                                                sx={{ color: '#093962', '&:hover': { color: '#093962' } }}
                                                            >
                                                                {campo.key === 'senha'
                                                                    ? (mostrarSenha ? <VisibilityOff /> : <Visibility />)
                                                                    : (mostrarConfirmarSenha ? <VisibilityOff /> : <Visibility />)}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        )}
                                        {campo?.type === 'autocomplete' && (
                                            (() => {
                                                const opcoes = campo.opcoes || optionsCache[campo.key] || [];
                                                const loading = campo.fetchOptions && !optionsCache[campo.key];

                                                return (
                                                    <Autocomplete
                                                        key={campo.key}
                                                        options={opcoes}
                                                        value={campo.value}
                                                        onChange={campo.onChange}
                                                        getOptionLabel={(opt) =>
                                                            typeof opt === 'string' ? opt : opt?.label || ''
                                                        }
                                                        disabled={campo.disabled}
                                                        loading={loading}
                                                        noOptionsText={
                                                            loading
                                                                ? 'Carregando...'
                                                                : opcoes.length === 0
                                                                    ? 'Nenhum item encontrado'
                                                                    : 'Nenhum resultado'
                                                        }
                                                        loadingText="Buscando itens..."
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                size="small"
                                                                fullWidth
                                                            />
                                                        )}
                                                        sx={{
                                                            '& .MuiInputBase-root': {
                                                                borderRadius: '8px'
                                                            },
                                                            '& .MuiOutlinedInput-root.Mui-disabled': {
                                                                backgroundColor: '#00000015',
                                                            },
                                                            '& .MuiInputBase-input.Mui-disabled': {
                                                                WebkitTextFillColor: 'rgba(0, 0, 0, 0.6)',
                                                            },
                                                            mb: 2
                                                        }}
                                                    />
                                                );
                                            })()
                                        )}
                                    </Box>
                                ))
                            }
                        </Box>
                    ))}
                </LocalizationProvider>
            </Box>

            <Box sx={{ marginTop: '10px', display: 'flex', gap: '50px' }}>
                {radios?.map((radio, ridx) => (
                    <Box key={ridx} sx={{ color: 'black' }}>
                        <label
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                            }}
                        >
                            <span>
                                {radio.radioTitle} {radio.required ? <span style={{ color: 'red' }}>*</span> : null}
                            </span>
                            <Tooltip
                                title={
                                    <Typography sx={{ fontSize: '14px' }}>
                                        {radio.toolTip}
                                    </Typography>
                                }
                                placement="right"
                                arrow
                            >
                                <HelpIcon
                                    sx={{
                                        marginTop: '1px',
                                        color: '#286DA8',
                                        fontSize: '18px',
                                    }}
                                />
                            </Tooltip>
                        </label>
                        <RadioGroup
                            row
                            defaultValue={radio.defaultValue}
                            value={radio.value}
                            onChange={radio.onChange}
                        >
                            {radio.options && radio.options.map((option, oidx) => (
                                <FormControlLabel
                                    key={`${radio.key}-${option.label}-${oidx}`}
                                    value={option.value}
                                    control={
                                        <Radio
                                            disabled={option.disabled}
                                            sx={{
                                                '&.Mui-disabled.Mui-checked': {
                                                    color: '#00000080',
                                                    backgroundColor: '#00000015',
                                                },
                                            }}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                            {radio?.textField?.show && (
                                <TextField
                                    disabled={radio?.textField?.disabled}
                                    size="small"
                                    placeholder={radio?.textField?.label || 'Especifique'}
                                    sx={{
                                        '&.MuiInputBase-input.Mui-disabled': {
                                            color: '#00000080',
                                            backgroundColor: '#00000015',
                                        },
                                    }}
                                    value={radio?.textField?.value}
                                    onChange={radio?.textField?.onChange}
                                />
                            )}
                        </RadioGroup>
                    </Box>
                ))}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    justifyContent: 'end',
                    alignItems: 'end',
                    flex: 1,
                }}
            >
                <DefaultButton
                    variant="outlined"
                    label={cancelButton?.label}
                    onClick={cancelButton?.onClick}
                    color={cancelButton?.color}
                />
                <DefaultButton
                    variant="contained"
                    label={confirmButton?.label}
                    disabled={confirmButton?.disabled}
                    onClick={confirmButton?.onClick}
                />
            </Box>
        </FormControl >
    );
};