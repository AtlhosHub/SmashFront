import { Box } from "@mui/material"
import { DefaultButton } from "../DefaultButton/DefaultButton"

export const DefaultLoginCard = ({children, typeButton, withButton, onClickButton, buttonLabel}) => {
    return (
        <Box
            sx={{
                padding: "3rem 2rem",
                display: "flex",
                flexDirection: "column",
                width: "50%",
                gap: "4rem",
                color: "black",
                borderRadius: "20px",
                border: "2px solid #00000050",
                backgroundColor: "white",
            }}>
            {children}
            {withButton && (
                <DefaultButton
                    label={buttonLabel}
                    variant={typeButton}
                    onClick={onClickButton}
                />
            )}
        </Box>
    )
}