import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

export const DefaultCardMenu = ({
    label = "",
    icon = <img width={100} height={100} />,
    sidebarcolor = "black",
    rota,
    ...props
}) => {
    const navigate = useNavigate();

    return (
        <Card sx={{
            width: 300,
            height: 120,
            backgroundColor: '#d6e9e9',
            borderRadius: "10px",
            borderLeft: `16px solid ${sidebarcolor}`,
            display: "flex",
            alignItems: "center",
            transition: "0.3s",
            cursor: "pointer",
            '&:hover': { boxShadow: 6 }
        }} {...props}>
            <CardActionArea
                onClick={() => navigate(rota)}
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 24px",

                }}
            >
                <Box>
                    <Typography sx={{
                        whiteSpace: "pre-line",
                        fontFamily: "Mohave, sans-serif",
                        fontWeight: 600,
                        fontSize: 25,
                        color: "#0d3c53",
                        lineHeight: 1.2,
                    }}>
                        {label}
                    </Typography>
                </Box>
                <Box>
                    {icon}
                </Box>
            </CardActionArea>

        </Card>
    )
}

