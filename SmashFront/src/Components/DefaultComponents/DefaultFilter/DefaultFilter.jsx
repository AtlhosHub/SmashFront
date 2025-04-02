import { useEffect, useRef, useState } from "react";
import { DefaultButton } from "../DefaultButton/DefaultButton"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {
    Autocomplete,
    Box,
    Fade,
    Grow,
    Popover,
    TextField
} from "@mui/material";
import "./DefaultFilter.css"

const DefaultFilter = ({
    statusPagamento,
    statusPresenca,
    horarioPref,
    setStatusPagamento,
    setStatusPresenca,
    setHorarioPref,
    setData
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const rect = anchorEl?.getBoundingClientRect();

    const statusPagArray = ["Enviado", "Pendente", "Atrasado"];
    const statusPresencaArray = ["Presente", "Ausente"];
    const horarioPrefArray = ["18-20", "12-14"]

    const handleOpenFilter = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    return (
        <>
            <DefaultButton
                label="Filter"
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
                    // onClick: () => setAnchorEl(null),
                    style: {
                        width: "100vw",
                        height: "100vh",
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
                        <Box className="filter-box"
                            position="absolute"
                            top={(rect.top + rect.height)+10}
                            left={rect.left + window.scrollX}
                        >
                            <Box className="filter-input-box">
                                <Autocomplete
                                    size="small"
                                    value={statusPagamento}
                                    options={statusPagArray}
                                    renderInput={(params) => <TextField {...params} label="Status de Pagamento" />}
                                    onChange={(e) => {
                                        setStatusPagamento(e)
                                    }}
                                />
                                <Autocomplete
                                    size="small"
                                    value={statusPresenca}
                                    options={statusPresencaArray}
                                    renderInput={(params) => <TextField {...params} label="Status de Presença" />}
                                    onChange={(e) => {
                                        setStatusPresenca(e)
                                    }}
                                />
                                <Autocomplete
                                    size="small"
                                    value={horarioPref}
                                    options={horarioPrefArray}
                                    renderInput={(params) => <TextField {...params} label="Horario de Preferência" />}
                                    onChange={(e) => {
                                        setHorarioPref(e)
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
                                <DefaultButton size="small" label="Limpar" />
                                <DefaultButton size="small" variant="contained" label="Aplicar" />
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