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
                alignItems: "flex-start",
                fontFamily: "Poppins, sans-serif"
            }}
        >

            <Box
                sx={{
                    textTransform: "uppercase",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                }}
            >
                <span
                    style={{
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        textAlign: "center",
                        textTransform: "capitalize"
                    }}
                >
                    {title}
                </span>
                <span
                    style={{
                        fontWeight: 700,
                        fontSize: "2rem",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    <Box
                        display={startIcon ? "flex" : "none"}
                        sx={{

                            height: "40px"
                        }}
                    >
                        {startIcon}
                    </Box>
                    {content}
                </span>
            </Box>
            <Box display={endIcon ? "flex" : "none"}>
                {endIcon}
            </Box>
        </Box>
    )
}