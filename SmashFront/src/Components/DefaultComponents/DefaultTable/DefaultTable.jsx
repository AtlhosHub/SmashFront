import { Table, TableBody, TableCell, TableContainer, TableHead } from "@mui/material"

export const DefaultTable = ({
    headCells,
    rowData,
    withStatus = false
}) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {withStatus &&
                            <TableCell>Status de Presença</TableCell>
                        }
                        {headCells.map((cell, index) => (
                            <TableCell key={`header-cell-${index}`}>{cell.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {withStatus &&
                        <TableCell>
                            {row.status === true ?
                                "🔵" : "🔘"
                            }
                        </TableCell>
                    }
                    {rowData.map((row, index) => (
                        <TableRow
                            key={`row-index-${index}`}
                            sx={{ backgroundColor: index % 2 === 0 ? "#F8F8F8" : "white", }}
                        >
                            {headCells.map((header) => (
                                <TableCell>{row[header]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}