import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { width } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#156FA6',
        color: theme.palette.common.white,
        fontSize: 18
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string
) {
    return { name };
}

const rows = [
    createData('General Plan'),
    createData('Zoning'),
    createData('Height'),
];

export default function CodeRegulations() {
    return (
        <TableContainer component={Paper} style={{marginTop: '30px', width: '90%', margin: 'auto', borderStyle: "none"}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead >
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="center">Code Regulations</StyledTableCell>
                        <StyledTableCell align="center">Code Compliance (Y / N / Remarks)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center"><TextField id="outlined-basic" variant="outlined" />
                            </StyledTableCell>
                            <StyledTableCell align="center"><TextField id="outlined-basic" variant="outlined" /></StyledTableCell>
                        </StyledTableRow>

                    ))}
                    <StyledTableRow key={"setbacks"}>
                        <StyledTableCell component="th" scope="row">
                            Setback
                        </StyledTableCell>
                        <StyledTableCell>
                            <StyledTableRow key={"front"}>
                                <StyledTableCell><TextField
                                    id="standard-multiline-flexible"
                                    label="Front"
                                    multiline
                                    maxRows={4}
                                    variant="standard"
                                />
                                </StyledTableCell>

                            </StyledTableRow>
                            <StyledTableRow key={"garage"}>
                                <StyledTableCell><TextField
                                    id="standard-multiline-flexible"
                                    label="Garage Face"
                                    multiline
                                    maxRows={4}
                                    variant="standard"
                                />
                                </StyledTableCell>

                            </StyledTableRow>
                            <StyledTableRow key={"cvt"}>
                                <StyledTableCell><TextField
                                    id="standard-multiline-flexible"
                                    label="Corner Vision Triangle"
                                    multiline
                                    maxRows={4}
                                    variant="standard"
                                />
                                </StyledTableCell>

                            </StyledTableRow>
                            <StyledTableRow key={"side"}>
                                <StyledTableCell><TextField
                                    id="standard-multiline-flexible"
                                    label="Side"
                                    multiline
                                    maxRows={4}
                                    variant="standard"
                                />
                                </StyledTableCell>

                            </StyledTableRow>
                            <StyledTableRow key={"rear"}>
                                <StyledTableCell><TextField
                                    id="standard-multiline-flexible"
                                    label="Rear"
                                    multiline
                                    maxRows={4}
                                    variant="standard"
                                />
                                </StyledTableCell>

                            </StyledTableRow>
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
