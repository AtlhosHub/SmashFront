import dayjs from 'dayjs';
import { dateFormater } from '../../../utils/dateFormaterService';
import { Box, Tooltip } from '@mui/material';

const formatHorarioPreferencia = (horarioPreferencia) => {
    if (horarioPreferencia && typeof horarioPreferencia === 'object') {
        const start = horarioPreferencia.horarioAulaInicio ? horarioPreferencia.horarioAulaInicio.slice(0, 5) : '';
        const end = horarioPreferencia.horarioAulaFim ? horarioPreferencia.horarioAulaFim.slice(0, 5) : '';
        return `${start} - ${end}`;
    }
    return horarioPreferencia || '';
};

export const formatListResponse = (response) => {
    return response.map((item, index) => ({
        ...item,
        nome: item.nome.value,
        dataInteresse: item.dataInteresse ? dateFormater(item.dataInteresse.value) : null,
        horarioPreferencia: item?.horarioPref ? formatHorarioPreferencia(item.horarioPref) :
            <Box >
                <Tooltip
                    key={`${item.nome.value}-${index}`}
                    title={'O horário de preferência desta pessoa foi excluído. Por favor, atualize as informações do mesmo para corrigir.'}
                    placement="bottom-start"
                    arrow
                >
                    <Box
                        sx={{
                            color: 'red',
                            fontWeight: 500,
                            width: 'fit-content'
                        }}
                    >
                        HORÁRIO EXCLUÍDO
                    </Box>
                </Tooltip>
            </Box>
    }));
};

export const formatFormResponse = (response) => {
    return {
        nome: response.nome.value,
        nomeSocial: response.nomeSocial?.value,
        genero: response?.genero,
        email: response.email?.value,
        celular: response.celular?.value,
        telefone: response.telefone?.value,
        dataNascimento: response.dataNascimento.value,
        dataInteresse: response.dataInteresse.value,
        horarioPref: response.horarioPref && {
            label: `${dayjs(`2000-05-10 ${response.horarioPref?.horarioAulaInicio}`).format('HH:mm')} - ${dayjs(`2000-05-10 ${response.horarioPref?.horarioAulaFim}`).format('HH:mm')}`,
            id: response.horarioPref?.id
        }
    };
};