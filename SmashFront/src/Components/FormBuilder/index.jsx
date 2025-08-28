// const campos = [
//     {
//         required: operacao === "visualizacao",
//         label: "Nome",
//         placeholder: "Digite seu nome",
//         disabled: operacao === "visualizacao",
//         value: userInfo.nome,
//         onChange: (e) => {
//             const regex = /^[A-Za-zÀ-ÿ\s]*$/;
//             if (regex.test(e.target.value)) {
//                 setUserInfo({ ...userInfo, nome: e.target.value });
//             }
//         },
//         toolTip: "Nome social é o nome em que o(a) aluno(a) prefere ser chamado, diferente do seu nome legal"
//     }
// ]

// const radios = [
//     {
//         radioTitle: "Possui Deficiência e/ou Neurodivergência?",
//         toolTip: "Deficiência é uma condição física, mental, intelectual ou sensorial de longo prazo que, em interação com diversas barreiras, pode dificultar a participação plena e efetiva na sociedade em igualdade de condições com as demais pessoas. Neurodivergência é um termo usado para descrever variações neurológicas naturais no cérebro humano, como o autismo, TDAH, dislexia, entre outras. Essas variações podem influenciar a forma como uma pessoa pensa, aprende e interage com o mundo ao seu redor.",
//         radioValue: isDeficiente,
//         defaultValue: false,
//         firstValue: {
//             value: "false",
//             label: "Não",
//             disabled: operacao === "visualizacao"
//         },
//         secondValue: {
//             value: "true",
//             label: "Sim",
//             disabled: operacao === "visualizacao"
//         },
//         onChange: (e) => {
//             setUserInfo({ ...userInfo, temAtestado: e.target.value })
//         },
//         textField: {
//             label: "Banana",
//             disabled: operacao === "visualizacao",
//             value: userInfo.deficiencia || undefined,
//             onChange: (e) => {
//                 const regex = /^[A-Za-zÀ-ÿ\s]*$/;
//                 if (regex.test(e.target.value)) {
//                     setUserInfo({ ...userInfo, deficiencia: e.target.value })
//                 }
//             }
//         }
//     }
// ]

import { Box, Tooltip, Typography, TextField, RadioGroup, FormControlLabel, Radio, FormControl } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { DefaultButton } from "../DefaultComponents/DefaultButton/DefaultButton";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const FormBuilder = ({
    campos,
    radios,
    columnsWidth,
    confirmButton,
    cancelButton
}) => {
    const [linhas, setLinhas] = useState([]);

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
                                {campo?.type && campo.type === "date" ? (
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
                                                    WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                                                },
                                                width: "100%",
                                            }}
                                        />
                                    </LocalizationProvider>
                                ) : (
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
                                                WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                                            },
                                            width: "100%",
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
                            value={radio.radioValue}
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
                                                },
                                            }}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                            {radio?.textField && radio?.textField?.show && (
                                <TextField
                                    disabled={radio?.textField?.disabled}
                                    size="small"
                                    placeholder={radio?.textField?.label || "Especifique"}
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