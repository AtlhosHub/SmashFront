import { Box, Button } from "@mui/material"

export const DefaultButton = ({
    variant = "outlined",
    size = "medium",
    startIcon,
    endIcon,
    onClick,
    label,
    ...props
}) => {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            sx={{
                height: 35,
                paddingInline: "25px",
                backgroundColor: variant === "outlined" ? "transparent" : "#286DA8",
                border: variant === "outlined" ? "1px solid #286DA8" : 0,
                color: variant === "outlined" ? "#286DA8" : "white",
                fontWeight: 600,
                borderRadius: "8px"
            }}
            {...props}
        >
            {startIcon &&
                <Box sx={{ display: "flex", justifyContent: "center", marginRight: "5px" }}>
                    {startIcon}
                </Box>
            }
            {label}
            {endIcon &&
                <Box sx={{ display: "flex", justifyContent: "center", marginLeft: "5px" }}>
                    {endIcon}
                </Box>
            }
        </Button>
    )
}