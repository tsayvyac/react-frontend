import * as React from 'react';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useMemo, useState} from "react";
import Box from "@mui/material/Box";
import {Tab, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";


const dummyData = [
    {title: 'Issue 1', category: 'Reserved', address: '123 Street', status: 'Resolved', date: '2023-01-01' },
    {title: 'Issue 2', category: 'Resolved', address: '123 Street', status: 'Solving', date: '2023-01-01'},
    {title: 'Issue 3', category: 'Solving', address: '123 Street', status: 'Solving', date: '2023-01-01'},
    {title: 'Issue 4', category: 'Published', address: '123 Street', status: 'Published', date: '2023-01-01'},
    {title: 'Issue 5', category: 'Reserved', address: '456 Avenue', status: 'Resolved', date: '2023-02-15' },
    {title: 'Issue 6', category: 'Resolved', address: '789 Boulevard', status: 'Reserved', date: '2023-02-16'},
    {title: 'Issue 7', category: 'Solving', address: '101 Main Street', status: 'Resolved', date: '2023-02-17'},
    {title: 'Issue 8', category: 'Published', address: '222 Park Lane', status: 'Published', date: '2023-02-18'},
    {title: 'Issue 9', category: 'Reserved', address: '333 Central Avenue', status: 'Solving', date: '2023-02-19'},
    {title: 'Issue 10', category: 'Resolved', address: '444 Elm Street', status: 'Resolved', date: '2023-02-20'},
    {title: 'Issue 11', category: 'Solving', address: '123 Street', status: 'Resolved', date: '2023-01-01' },
    {title: 'Issue 12', category: 'Published', address: '123 Street', status: 'Reserved', date: '2023-01-01'},
    {title: 'Issue 13', category: 'Reserved', address: '123 Street', status: 'Solving', date: '2023-01-01'},
    {title: 'Issue 14', category: 'Published', address: '123 Street', status: 'Published', date: '2023-01-01'},
    {title: 'Issue 15', category: 'Resolved', address: '456 Avenue', status: 'Resolved', date: '2023-02-15' },
    {title: 'Issue 16', category: 'Solving', address: '789 Boulevard', status: 'Published', date: '2023-02-16'},
    {title: 'Issue 17', category: 'Published', address: '101 Main Street', status: 'Reserved', date: '2023-02-17'},
    {title: 'Issue 18', category: 'Solving', address: '222 Park Lane', status: 'Solving', date: '2023-02-18'},
    {title: 'Issue 19', category: 'Resolved', address: '333 Central Avenue', status: 'Published', date: '2023-02-19'},
    {title: 'Issue 20', category: 'Reserved', address: '444 Elm Street', status: 'Reserved', date: '2023-02-20'}
    // Add more dummy data
];

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Issues(defaultTheme) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // Запросить новые отфильтрованные данные ибо залупа полная я не ебу как написать функцию для фильтра без ебаного апи сука
    };

    const [filter, setFilter] = useState({
            title: "",
            fromDate: "",
            toDate: "",
            category: "All",
        }
    );

    const getStatusBarStyle = (status) =>{
        let backgroundColor;

        switch (status) {
            case 'Resolved':
                backgroundColor = '#7bcf7d'; // Цвет для Resolved
                break;
            case 'Solving':
                backgroundColor = '#ffcc00'; // Цвет для Solving
                break;
            case 'Reserved':
                backgroundColor = '#ff6600'; // Цвет для Reserved
                break;
            case 'Published':
                backgroundColor = '#3399ff'; // Цвет для Published
                break;
            default:
                backgroundColor = '#7bcf7d'; // Цвет по умолчанию
                break;
        }

        return {
            borderRadius: '19px',
            backgroundColor: backgroundColor,
            padding: '5px 20px',
            display: 'inline-block',
        };
    }
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = useMemo(() =>
            dummyData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [page, rowsPerPage],
    );

    const populateTable = (rows) => {
        return <>
            {visibleRows.map((row) => (
                <TableRow
                    key={row.name}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {row.title}
                    </TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">
                        <div style={getStatusBarStyle(row.status)}>
                        {row.status}
                        </div>
                    </TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                </TableRow>))}
        </>
    }

    return (
        <React.Fragment>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold'}}>
                Issues
            </Typography>
            <Divider />
            <Container disableGutters sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3} sx={{flexDirection: 'column', marginLeft: '5px', }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', flexDirection: 'column' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="All" />
                            <Tab label="Published"/>
                            <Tab label="Reserved"/>
                            <Tab label="Solving"/>
                            <Tab label="Resolved"/>
                        </Tabs>
                    </Box>
                    <Box
                        component="form"
                        sx={{ display: 'flex',
                            marginTop: '15px',
                            marginLeft: '5px',
                            flexDirection: 'row',
                            alignItems: 'center',
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            label="Search"
                            placeholder="Title of issue"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Date from"
                            // placeholder="dd/mm/yyyy"
                            type={"date"}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Date to"
                            // placeholder="dd/mm/yyyy"
                            type={"date"}
                            InputLabelProps={{ shrink: true }}
                        />

                        <Button variant="contained" sx={{height:'80%', width:'90px', ml:'7px', pl:'9px', pr:'9px'}}>
                            Filter
                        </Button>
                    </Box>
                    <Box>
                        <Table sx={{ minWidth: 650 }} aria-label="Data table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography fontWeight="bold">Title</Typography></TableCell>
                                    <TableCell align="left"><Typography fontWeight="bold">Category</Typography></TableCell>
                                    <TableCell align="left"><Typography fontWeight="bold">Address</Typography></TableCell>
                                    <TableCell align="left"><Typography fontWeight="bold">Status</Typography></TableCell>
                                    <TableCell align="left"><Typography fontWeight="bold">Date of creation</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {populateTable(dummyData)}
                            </TableBody>
                        </Table>
                        <TablePagination
                            count={dummyData.length}
                            component="div"
                            page={page}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[10, 20, 50]}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                </Grid>
            </Container>
        </React.Fragment>
    );
}