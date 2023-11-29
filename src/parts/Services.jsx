import * as React from 'react';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CompareIcon from '@mui/icons-material/Compare';
import {
    Card, Fab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {useMemo, useState} from "react";

const createServiceData = (name, phone, location, rr) => {
    return {name, phone, location, rr};
}

const rows = [
    createServiceData('Branchack', '+420665854741', 'Praha 6', '10/3'),
    createServiceData('Streerable', '+420852493671', 'Praha 8', '22/13'),
    createServiceData('Urban service', '+420753214896', 'Praha 14', '5/2'),
    createServiceData('Rechair', '+420951256846', 'Praha 5', '23/12'),
    createServiceData('Unitown', '+420845638541', 'Praha 2', '6/0'),
    createServiceData('Omwcjx', '+420865003959', 'Praha 7', '21/24'),
    createServiceData('Lvxingml', '+420448808698', 'Praha 8', '7/6'),
    createServiceData('Hfdeui', '+420795527581', 'Praha 1', '21/24'),
    createServiceData('Wogre', '+420067496667', 'Praha 5', '22/15'),
    createServiceData('Qhegj', '+420109139754', 'Praha 4', '4/10'),
    createServiceData('Whzgyaues', '+420708790159', 'Praha 6', '24/20'),
    createServiceData('Xrkpsd', '+420591620086', 'Praha 5', '1/20'),
    createServiceData('Zuerrilfu', '+420284941205', 'Praha 2', '20/19'),
    createServiceData('Abtbvup', '+420162554815', 'Praha 6', '4/4'),
    createServiceData('Mfwmhqr', '+420639812605', 'Praha 1', '10/9'),
    createServiceData('Pouhkv', '+420620361068', 'Praha 8', '6/19'),
    createServiceData('Idodet', '+420756433339', 'Praha 3', '20/5'),
    createServiceData('Reznwanmd', '+420934887913', 'Praha 4', '21/23'),
    createServiceData('Wlwpyqzb', '+420410401982', 'Praha 5', '20/2'),
    createServiceData('Lezav', '+420161964417', 'Praha 7', '21/23'),
    createServiceData('Utxovmmbr', '+420793301517', 'Praha 2', '17/3'),
    createServiceData('Fhussbi', '+420939106895', 'Praha 6', '24/18'),
    createServiceData('Wochcarn', '+420307065419', 'Praha 4', '16/19'),
    createServiceData('Flhft', '+420660403444', 'Praha 6', '4/1'),
    createServiceData('Canhldoi', '+420403336567', 'Praha 4', '5/14'),
    createServiceData('Gbjmfapos', '+420781795822', 'Praha 1', '14/4'),
    createServiceData('Obgvrmj', '+420575754073', 'Praha 5', '25/7'),
    createServiceData('Fimqgg', '+420178378574', 'Praha 2', '24/16'),
    createServiceData('Odrhvda', '+420032355351', 'Praha 3', '11/1'),
    createServiceData('Fqqmdj', '+420852747860', 'Praha 3', '6/3'),
    createServiceData('Ukoubgxm', '+420015445466', 'Praha 6', '15/4'),
    createServiceData('Mutts', '+420847688287', 'Praha 7', '16/8'),
    createServiceData('Vpikcp', '+420550790451', 'Praha 9', '5/13'),
    createServiceData('Eprolvhtf', '+420112279652', 'Praha 6', '7/11'),
    createServiceData('Aztok', '+420327751249', 'Praha 1', '18/18')
]

export default function Services(defaultTheme) {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Typography
                component="h1"
                variant="h4"
                sx={{fontWeight: 'bold'}}
            >
                Public services ({rows.length})
            </Typography>
            <Divider />
            <Container disableGutters sx={{mt: 4, mb: 4}}>
                <ServicesTable/>
            </Container>
        </ThemeProvider>
    );
}

const ServicesTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const cellAlign = 'left';
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const [checked, setChecked] = useState(new Array(rows.length).fill(false));
    const [clicked, setClicked] = useState();

    const handleCheckbox = (position, e) => {
        if (checked.filter((i) => i).length >= 3 && e.target.checked) return;
        const updated = checked.map((item, index) => index === position ? !item : item);
        setChecked(updated);
    };

    const handleDisabled = (index) => {
        return checked.filter((p) => p === true).length >= 3 &&
            !checked[index];
    };

    const handleFab = () => {
        return checked.filter((i) => i).length < 2;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = useMemo(() =>
        rows.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        ),
        [page, rowsPerPage],
    );

    return (
        <React.Fragment>
            <Card>
                <TableContainer component={Paper}>
                    <Table>
                        <ServicesTableHead/>
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                return (
                                    <TableRow
                                        onClick={() => setClicked(row.name)}
                                        key={row.name}
                                        hover
                                        sx={{cursor: 'pointer'}}
                                    >
                                        <TableCell align={cellAlign}>{row.name}</TableCell>
                                        <TableCell align={cellAlign}>{row.phone}</TableCell>
                                        <TableCell align={cellAlign}>{row.location}</TableCell>
                                        <TableCell align={cellAlign}>{row.rr}</TableCell>
                                        <TableCell align='right' padding="checkbox">
                                            <Checkbox
                                                disabled={handleDisabled(index)}
                                                checked={checked[index]}
                                                onChange={(e) => handleCheckbox(index, e)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        count={rows.length}
                        component="div"
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[10, 20, 50]}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Card>
            <Fab disabled={handleFab()}
                 variant="extended"
                 color="primary"
                 style={{
                     position: 'fixed',
                     top: 'auto',
                     left: 'auto',
                     margin: 0,
                     right: 40,
                     bottom: 20}}
            >
                <CompareIcon/>
                Compare
            </Fab>
        </React.Fragment>
    );
}

const ServicesTableHead = () => {

    return (
        <TableHead>
            <TableRow>
                <TableCell align="left"><Typography fontWeight="bold" >Public service name</Typography></TableCell>
                <TableCell align="left"><Typography fontWeight="bold" >Phone</Typography></TableCell>
                <TableCell align="left"><Typography fontWeight="bold" >Location</Typography></TableCell>
                <TableCell align="left"><Typography fontWeight="bold" >Reserved/Resolved</Typography></TableCell>
                <TableCell align="left"><Typography fontWeight="bold" >Compare</Typography></TableCell>
            </TableRow>
        </TableHead>
    );
}