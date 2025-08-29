import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import "./DefaultTable.css"
import { useState } from "react";

export const DefaultTable = ({
    headCells,
    rowData,
    withStatus = false,
    withPagStatus = false,
    onRowClick,
    rowsPerPage = 5
}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(rowData.length / rowsPerPage);

    const displayRows = rowData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <>
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
                            <TableCell
                                sx={{
                                    display: !!rowData[0]?.acoes ? "table-cell" : "none",
                                }}
                            >
                                &nbsp;
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayRows?.map((row, index) => (
                            <TableRow
                                key={`row-index-${index}`}
                                className="body-table-row"
                                sx={{
                                    backgroundColor: index % 2 !== 0
                                        ? "#ebeff5"
                                        : "white"
                                }}
                                onClick={() => { onRowClick && onRowClick(row) }}
                            >
                                {withStatus &&
                                    <TableCell
                                        sx={{
                                            textAlign: "center",
                                            '&:hover': {
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
                                                }
                                            }),
                                            width: header?.cellWidth ?? "auto"
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
                                <TableCell
                                    sx={{
                                        display: !!row.acoes ? "table-cell" : "none",
                                        justifyContent: "center"
                                    }}
                                >
                                    {row.acoes}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {rowData.length > rowsPerPage &&
                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(_, value) => setCurrentPage(value)}
                        color="primary"
                    />
                </Box>
            }
        </>
    )
}