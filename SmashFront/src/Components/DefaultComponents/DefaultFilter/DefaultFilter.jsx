import { useEffect, useState } from "react";
import { DefaultButton } from "../DefaultButton/DefaultButton"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    Autocomplete,
    Box,
    Fade,
    Popover,
    TextField
} from "@mui/material";
import "./DefaultFilter.css"
import dayjs from "dayjs";


export const DefaultFilter = ({
    statusPagamento,
    statusPresenca,
    horarioPref,
    setStatusPagamento,
    setStatusPresenca,
    setSelectedMonthRange,
    setHorarioPref,
    selectedMonth,
    setSelectedMonth,
    handleApplyFilter,
    handleClearFilter
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const rect = anchorEl?.getBoundingClientRect();

    const statusPagArray = [
        { label: "PAGO" },
        { label: "PENDENTE" },
        { label: "ATRASADO" }
    ];
    const statusPresencaArray = [
        { label: "Presente", value: true, },
        { label: "Ausente", value: false, }
    ];
    const horarioPrefArray = [
        { id: 1820, label: "18h - 20h" },
        { id: 1214, label: "12h - 14h" }
    ]

    const handleOpenFilter = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleMonthChange = (date) => {
        if (date) {
            const start = dayjs(date).startOf('month').format('YYYY-MM-DD');
            const end = dayjs(date).endOf('month').format('YYYY-MM-DD');
            setSelectedMonth(date);
            setSelectedMonthRange({ start, end });
        } else {
            setSelectedMonth(null);
            setSelectedMonthRange({ start: null, end: null });
        }
    };

    return (
        <>
            <DefaultButton
                label="Filtro"
                endIcon={<FilterAltOutlinedIcon />}
                onClick={handleOpenFilter}
            />
            <Popover
                open={open}
                anchorReference="anchorPosition"
                anchorPosition={{ top: "0 !important", left: "0 !important" }}
                TransitionComponent={Fade}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    style: {
                        width: "100vw",
                        height: "97.5vh",
                        maxHeight: "none",
                        overflow: "hidden",
                        boxShadow: "none",
                        backgroundColor: "rgba(0,0,0,0)",
                        display: "flex",
                    },
                }}
            >
                {rect && (
                    <>
                        <Box
                            className="filter-box"
                            position="absolute"
                            top={(rect.top + rect.height) + 10}
                            left={rect.left + window.scrollX}
                        >
                            <Box className="filter-input-box">
                                <Autocomplete
                                    size="small"
                                    value={statusPagamento}
                                    options={statusPagArray}
                                    getOptionLabel={(option) => option?.label || ""}
                                    renderInput={(params) => <TextField {...params} label="Status de Pagamento" />}
                                    onChange={(e, newValue) => setStatusPagamento(newValue)}
                                />
                                <Autocomplete
                                    size="small"
                                    value={statusPresenca}
                                    options={statusPresencaArray}
                                    getOptionLabel={(option) => option?.label || ""}
                                    renderInput={(params) => <TextField {...params} label="Status de Presença" />}
                                    onChange={(e, newValue) => setStatusPresenca(newValue)}
                                />
                                {horarioPref && setHorarioPref &&
                                    <Autocomplete
                                        size="small"
                                        value={horarioPref}
                                        options={horarioPrefArray}
                                        getOptionLabel={(option) => option?.label || ""}
                                        renderInput={(params) => <TextField {...params} label="Horario de Preferência" />}
                                        onChange={(e, newValue) => setHorarioPref(newValue)}
                                    />
                                }
                                {setSelectedMonth &&
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Box components={['DatePicker']}>
                                            <DatePicker
                                                label={'Mês de Vencimento'}
                                                openTo="month"
                                                slotProps={{
                                                    textField:
                                                    {
                                                        size: 'small',
                                                        placeholder: 'MM/AAAA',

                                                    }
                                                }}
                                                sx={{
                                                    "& .MuiInputBase-root": {
                                                        borderRadius: "5px"
                                                    },
                                                    '& .MuiInputBase-input.Mui-disabled': {
                                                        "-webkit-text-fill-color": "rgba(0, 0, 0, 0.60)"
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        textTransform: "capitalize"
                                                    },
                                                    width: "100%",
                                                }}

                                                views={['year', 'month']}
                                                value={selectedMonth}
                                                onChange={handleMonthChange}
                                            />
                                        </Box>

                                    </LocalizationProvider>
                                }
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
                                <DefaultButton size="small" label="Limpar"
                                    onClick={() => {
                                        handleClearFilter()
                                        handleMonthChange(dayjs())
                                    }}

                                />
                                <DefaultButton size="small" variant="contained" label="Aplicar"
                                    onClick={() => {
                                        handleApplyFilter();
                                        setAnchorEl(null);
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            onClick={() => setAnchorEl(null)}
                            sx={{
                                height: "100vh",
                                width: "100vw"
                            }}
                        />
                    </>
                )}
            </Popover >
        </>
    )
}

export default DefaultFilter;