import { Box } from "@mui/material"

export const Kpi = ({ startIcon, endIcon, title, content }) => {

    return (
        <Box
            sx={{
                display: "flex",
                p: 2,
                gap: "20px",
                color: "black",
                width: "100%",
                border: "1px solid black",
                borderRadius: "10px",
                backgroundColor: "white",
                // maxWidth: "20rem",
                alignItems: "flex-start",
                fontFamily: "Poppins, sans-serif"
            }}
        >
            <Box
                display={startIcon ? "flex" : "none"}
                sx={{
                    "& svg": {
                        fontSize: "4.8rem",
                        alignSelf: "flex-start"
                    },
                    height: "70px"
                }}
            >
                {startIcon}
            </Box>
            <Box
                sx={{
                    textTransform: "uppercase",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <span
                    style={{
                        fontWeight: 400,
                        fontSize: "1.2rem",
                        lineHeight: "1.2rem"
                    }}
                >
                    {title}
                </span>
                <span
                    style={{
                        fontWeight: 800,
                        fontSize: "2rem",
                        lineHeight: "1.8rem"
                    }}
                >
                    {content}
                </span>
            </Box>
            <Box display={endIcon ? "flex" : "none"}>
                {endIcon}
            </Box>
        </Box>
    )
}