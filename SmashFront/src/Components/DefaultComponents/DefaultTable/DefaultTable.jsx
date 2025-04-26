import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import "./DefaultTable.css"

export const DefaultTable = ({
    headCells,
    rowData,
    withStatus = false
}) => {
    return (
        <TableContainer sx={{ marginTop: "3rem", width: "100%" }}>
            <Table>
                <TableHead sx={{ backgroundColor: "white" }}>
                    <TableRow className="header-table-row">
                        {withStatus &&
                            <TableCell sx={{ textAlign: "center" }}>Status de Presença</TableCell>
                        }
                        {headCells.map((cell, index) => (
                            <TableCell key={`header-cell-${index}`}>{cell.description}</TableCell>
                        ))}
                        {withStatus &&
                            <TableCell sx={{ textAlign: "center" }}>Status de Comprovante</TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowData?.map((row, index) => (
                        <TableRow
                            key={`row-index-${index}`}
                            className="body-table-row"
                            sx={{ backgroundColor: index % 2 !== 0 ? "#d5dae0" : "white", }}
                        >
                            {withStatus &&
                                <TableCell sx={{ textAlign: "center" }}>
                                    {row?.ativo === true ?
                                        <CircleIcon sx={{ color: "#286DA8" }} /> :
                                        <CircleIcon sx={{ color: "#989898" }} />
                                    }
                                </TableCell>
                            }
                            {headCells.map((header) => (
                                <TableCell sx={{
                                    ...(withStatus && header.name === "nomeAluno" && {'&:hover': {
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                    }})
                                }}>
                                    {row[header.name]}
                                </TableCell>
                            ))}
                            {withStatus &&
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Box
                                        className="status-comprovante"
                                        sx={{
                                            backgroundColor: row?.status === "Enviado" ?
                                                "#2E7D32" :
                                                row?.status === "Pendente" ?
                                                    "#989898" :
                                                    "#FF0000",
                                            color: row?.status === "Pendente" ? "black" : "white",
                                        }}>
                                        {row?.status}
                                    </Box>
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}