import { Box, TextField, Typography } from "@mui/material"

const FBDatePicker = () => {

}

const FBTextField = ({ inputData }) => {
    return (
        <Box>
            <Typography>
                {inputData?.label} {inputData?.required && <span style={{ color: "red" }}>*</span>}
            </Typography>
            <TextField
                key={inputData.key}
                disabled={!inputData?.enableCondition}
                value={inputData?.value || undefined}
                onChange={inputData?.onChange}
                size="small"
                variant={inputData?.variant || "outlined"}
                placeholder={inputData?.placeholder}
                sx={{
                    "& .MuiInputBase-root": { borderRadius: "8px" },
                    '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: "rgba(0, 0, 0, 0.60)"
                    },
                    width: "100%",
                }}
            />
        </Box>
    )
}

const inputComponenteMap = {
    date: FBDatePicker,
    text: FBTextField
}

export const FormBuilderInput = ({ inputData, type }) => {
    const InputComponent = inputComponenteMap[type];

    return <InputComponent inputData={inputData} />
}