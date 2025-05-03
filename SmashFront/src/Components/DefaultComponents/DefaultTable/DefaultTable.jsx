import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import "./DefaultTable.css"

export const DefaultTable = ({
    headCells,
    rowData,
    withStatus = false,
    withPagStatus = false,
    onRowClick,
}) => {
    return (
        <TableContainer sx={{ width: "100%" }}>
            <Table>
                <TableHead sx={{ backgroundColor: "white" }}>
                    <TableRow className="header-table-row">
                        {withStatus &&
                            <TableCell sx={{ textAlign: "center", width: "10%" }}>Status</TableCell>
                        }
                        {headCells.map((cell, index) => (
                            <TableCell key={`header-cell-${index}`} align={cell.align}>{cell.description}</TableCell>
                        ))}
                        {withPagStatus &&
                            <TableCell sx={{ textAlign: "center" }}>Status de Comprovante</TableCell>
                        }
                        <TableCell sx={{ width: "10%", textAlign: "center", }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowData?.map((row, index) => (
                        <TableRow
                            key={`row-index-${index}`}
                            className="body-table-row"
                            sx={{
                                backgroundColor: index % 2 !== 0
                                    ? "#ebeff5"
                                    : "white",
                                '&:hover': {
                                    textDecorationColor: "black",
                                    cursor: "pointer",
                                    backgroundColor: "#d5dae0"
                                }
                            }}
                            onClick={() => { onRowClick && onRowClick(row) }}
                        >
                            {withStatus &&
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        '&:hover': {
                                            textDecoration: "underline",
                                            textDecorationColor: "black"
                                        }
                                    }}
                                >
                                    {row?.ativo === true ?
                                        <CircleIcon sx={{ color: "#286DA8" }} /> :
                                        <CircleIcon sx={{ color: "#989898" }} />
                                    }
                                </TableCell>
                            }
                            {headCells.map((header) => (
                                <TableCell
                                    key={`row-cell-${header.name}-${index}`}
                                    sx={{
                                        ...(withStatus && header.name === "nomeAluno" && {
                                            '&:hover': {
                                                cursor: "pointer",
                                                textDecoration: "underline",
                                            }
                                        })
                                    }}
                                    align={header.align}
                                >
                                    {row[header.name]}
                                </TableCell>
                            ))}
                            {withPagStatus &&
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Box
                                        className="status-comprovante"
                                        sx={{
                                            backgroundColor: row?.status === "PAGO"
                                                ? "#2E7D32"
                                                : row?.status === "PENDENTE"
                                                    ? "#989898"
                                                    : "#FF0000",
                                            color: row?.status === "PENDENTE" ? "black" : "white",
                                        }}>
                                        {row?.status}
                                    </Box>
                                </TableCell>
                            }
                            <TableCell>
                                {row.acoes}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}