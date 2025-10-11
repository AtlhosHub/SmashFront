import { Box, Tooltip, Typography, TextField, RadioGroup, FormControlLabel, Radio, FormControl, InputAdornment, IconButton } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HelpIcon from "@mui/icons-material/Help";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { DefaultButton } from "../DefaultButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const FormBuilder = ({
    campos,
    radios,
    columnsWidth,
    confirmButton,
    cancelButton
}) => {
    const [linhas, setLinhas] = useState([]);
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
    const [erroConfirmarSenha, setErroConfirmarSenha] = useState(false);

    useEffect(() => {
        setErroConfirmarSenha(
            confirmarSenha.length > 0 && senha !== confirmarSenha
        );
    }, [senha, confirmarSenha]);

    useEffect(() => {
        const linhasTemp = [];
        for (let i = 0; i < campos.length; i += columnsWidth.length) {
            linhasTemp.push(campos.slice(i, i + columnsWidth.length));
        }
        setLinhas(linhasTemp);
    }, [campos, radios, columnsWidth]);

    return (
        <FormControl
            sx={{
                paddingBlock: "30px",
                pr: "30px",
                display: "flex",
                flex: 1,
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    width: "100%",
                    color: "black",
                }}
            >
                {linhas.map((linha, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            flex: 1,
                            height: "fit-content",
                        }}
                    >
                        {linha.map((campo, cidx) => (
                            <Box key={cidx}>
                                <label>
                                    {campo.label} {campo.required ? <span style={{ color: "red" }}>*</span> : null}
                                    {campo.toolTip ? (
                                        <Tooltip
                                            title={
                                                <Typography sx={{ fontSize: "14px" }}>
                                                    {campo.toolTip}
                                                </Typography>
                                            }
                                            placement="right"
                                            arrow
                                        >
                                            <HelpIcon
                                                sx={{
                                                    marginTop: "1px",
                                                    color: "#286DA8",
                                                    fontSize: "18px",
                                                }}
                                            />
                                        </Tooltip>
                                    ) : null}
                                </label>
                                {campo?.type === "date" && (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            size="small"
                                            disabled={campo.disabled}
                                            value={campo.value}
                                            format="DD/MM/YYYY"
                                            maxDate={dayjs().subtract(1, 'day')}
                                            minDate={dayjs("1940-01-01")}
                                            onChange={campo.onChange}
                                            onError={campo.onError}
                                            slotProps={{
                                                textField: { size: "small", placeholder: "DD/MM/AAAA" },
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    borderRadius: "8px"
                                                },
                                                '& .MuiInputBase-input.Mui-disabled': {
                                                    WebkitTextFillColor: "rgba(0, 0, 0, 0.60)",
                                                    backgroundColor: "#00000015",
                                                },
                                                width: "100%",
                                            }}
                                        />
                                    </LocalizationProvider>
                                )}
                                {campo?.type === "text" && (
                                    <TextField
                                        disabled={campo.disabled}
                                        value={campo.value}
                                        onChange={campo.onChange}
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            "& .MuiInputBase-root": {
                                                borderRadius: "8px"
                                            },
                                            '& .MuiInputBase-input.Mui-disabled': {
                                                WebkitTextFillColor: "rgba(0, 0, 0, 0.60)",
                                                backgroundColor: "#00000015",
                                            },
                                            width: "100%",
                                        }}
                                    />
                                )}
                                {campo?.type === "password" && (
                                    <TextField
                                        error={campo.name === "confirmarSenha" && erroConfirmarSenha}
                                        helperText={
                                            campo.name === "confirmarSenha" && erroConfirmarSenha
                                                ? "As senhas não conferem"
                                                : ""
                                        }
                                        value={campo.name === "senha" ? senha : confirmarSenha}
                                        onChange={(e) => {
                                            if (campo.name === "senha") {
                                                setSenha(e.target.value);
                                            } else {
                                                setConfirmarSenha(e.target.value);
                                            }
                                        }}
                                        variant="outlined"
                                        size="small"
                                        type={
                                            campo.name === "senha"
                                                ? mostrarSenha
                                                    ? "text"
                                                    : "password"
                                                : mostrarConfirmarSenha
                                                    ? "text"
                                                    : "password"
                                        }
                                        sx={{
                                            "& .MuiInputBase-root": { borderRadius: "8px" },
                                            "& .MuiInputBase-input.Mui-disabled": {
                                                WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                                            },
                                            width: "100%"
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            campo.name === "senha"
                                                                ? setMostrarSenha(!mostrarSenha)
                                                                : setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                                                        }
                                                        edge="end"
                                                        sx={{
                                                            color: "#093962",
                                                            "&:hover": { color: "#093962" }
                                                        }}
                                                    >
                                                        {campo.name === "senha"
                                                            ? (mostrarSenha ? <VisibilityOff /> : <Visibility />)
                                                            : (mostrarConfirmarSenha ? <VisibilityOff /> : <Visibility />)}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>

            <Box sx={{ marginTop: "10px", display: "flex", gap: "50px" }}>
                {radios?.map((radio, ridx) => (
                    <Box key={ridx} sx={{ color: "black" }}>
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            <span>
                                {radio.radioTitle} {radio.required ? <span style={{ color: "red" }}>*</span> : null}
                            </span>
                            <Tooltip
                                title={
                                    <Typography sx={{ fontSize: "14px" }}>
                                        {radio.toolTip}
                                    </Typography>
                                }
                                placement="right"
                                arrow
                            >
                                <HelpIcon
                                    sx={{
                                        marginTop: "1px",
                                        color: "#286DA8",
                                        fontSize: "18px",
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
                                                "&.Mui-disabled.Mui-checked": {
                                                    color: "#00000080",
                                                    backgroundColor: "#00000015",
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
                                    placeholder={radio?.textField?.label || "Especifique"}
                                    sx={{
                                        "&.MuiInputBase-input.Mui-disabled": {
                                            color: "#00000080",
                                            backgroundColor: "#00000015",
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
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "end",
                    alignItems: "end",
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