import * as React from 'react';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useState} from "react";
import Box from "@mui/material/Box";
import {Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";


const dummyData = [
    {title: 'Issue 1', category: 'Published', address: '123 Street', status: 'Resolved', date: '2023-01-01' },
    {title: 'Issue 2', category: 'Published', address: '123 Street', status: 'Reserved', date: '2023-01-01'},
    {title: 'Issue 3', category: 'Published', address: '123 Street', status: 'Solving', date: '2023-01-01'},
    {title: 'Issue 4', category: 'Published', address: '123 Street', status: 'Published', date: '2023-01-01'},


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

    const populateTable = (rows) => {
        return <>
            {dummyData.map((row) => (
                <TableRow
                    key={row.name}
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
        <ThemeProvider theme={defaultTheme}>
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
                                    <TableCell>Title</TableCell>
                                    <TableCell align="left">Category</TableCell>
                                    <TableCell align="left">Address</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Date of creation</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {populateTable(dummyData)}
                            </TableBody>
                        </Table>
                    </Box>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}