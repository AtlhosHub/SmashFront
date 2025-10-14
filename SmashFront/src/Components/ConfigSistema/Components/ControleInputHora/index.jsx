import React from 'react';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function ControleInputHora({
    index,
    tipo,
    hora,
    setHora,
    maxValue,
    minValue,
    setErrosHorarios,
    erroAtual
}) {
    const validarHora = (novaHora) => {
        if (!novaHora || !novaHora.isValid?.()) return false;

        const horaAtual = dayjs(novaHora, 'HH:mm');
        const min = minValue ? dayjs(minValue, 'HH:mm') : null;
        const max = maxValue ? dayjs(maxValue, 'HH:mm') : null;

        if (min && horaAtual.isBefore(min)) return false;
        if (max && horaAtual.isAfter(max)) return false;

        return true;
    };

    return (
        <TimePicker
            label="Escolha a Hora"
            ampm={false}
            value={hora ? dayjs(hora, 'HH:mm') : null}
            maxTime={maxValue ? dayjs(maxValue, 'HH:mm') : undefined}
            minTime={minValue ? dayjs(minValue, 'HH:mm') : undefined}
            onChange={(novaHora) => {
                setHora(novaHora);

                const valido = validarHora(novaHora);

                setErrosHorarios((prev) => {
                    const novosErros = [...prev];
                    if (!novosErros[index]) novosErros[index] = { inicio: false, fim: false };
                    novosErros[index][tipo] = !valido;
                    return novosErros;
                });
            }}
            slotProps={{
                textField: {
                    InputProps: {
                        endAdornment: null,
                    },
                    error: erroAtual,
                    size: 'small',
                },
            }}
        />
    );
}
