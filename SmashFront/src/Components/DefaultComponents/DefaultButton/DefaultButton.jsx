import { Button } from "@mui/material"

export const DefaultButton = ({
    variant = "outlined",
    size = "medium",
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
                paddingInline: "13px",
                backgroundColor: variant === "outlined" ? "transparent" : "#286DA8",
                border: variant === "outlined" ? "1px solid #286DA8" : 0,
                color: variant === "outlined" ? "#286DA8" : "white",
                fontWeight: 600,
                borderRadius:"5px"
            }}
            {...props}
        >
            {label}
        </Button>
    )
}