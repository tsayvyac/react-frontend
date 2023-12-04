import React, {useEffect, useMemo, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {ArrowBack, Build, Place} from "@mui/icons-material";
import Container from "@mui/material/Container";
import {
    Card, Chip,
    Fab, FormControl, InputLabel, MenuItem,
    Paper, Select, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const createIssuesData = (issueId, category, location, status, dateResTime) => {
    return {issueId, category, location, status, dateResTime};
}

const issues = [
    createIssuesData('is-00201241-pr6', 'Chair Fix', 'Cukrovarnická 27, Praha 6', 'Resolved', '22.05.2023/1d 22h'),
    createIssuesData('is-93597877-pr1', 'Nkjvbzow', 'Ndtyeax 49, Praha 6','Solving', '14.11.2023/2d 47h'),
    createIssuesData('is-45650532-pr5', 'Noztxowouha', 'Uxykqqo 49, Praha 3','Resolved', '12.11.2023/1d 50h'),
    createIssuesData('is-54455678-pr5', 'Bdpmrrjqcex', 'Fecdsqpdd 95, Praha 1','Resolved', '07.01.2023/4d 20h'),
    createIssuesData('is-26541015-pr6', 'Mcwbshvurf', 'Pyylcvx 21, Praha 7','Resolved', '19.11.2023/3d 63h'),
    createIssuesData('is-81214731-pr6', 'Recfcab', 'Fipscbvob 97, Praha 1','Resolved', '23.11.2023/1d 78h'),
    createIssuesData('is-63215000-pr6', 'Zlyvcqfto', 'Ivdrqr 88, Praha 3','Solving', '18.12.2023/3d 32h'),
    createIssuesData('is-51345164-pr5', 'Igqpzi', 'Xdjuqyji 40, Praha 2','Resolved', '13.01.2023/4d 78h'),
    createIssuesData('is-45573999-pr1', 'Ecnggqdeimp', 'Bwqcls 83, Praha 5','Resolved', '02.01.2023/1d 94h'),
    createIssuesData('is-38329205-pr4', 'Ndsvvfbtp', 'Wzpknn 80, Praha 6','Resolved', '12.12.2023/3d 98h'),
    createIssuesData('is-82374281-pr3', 'Zqbsiv', 'Pjrwpqxy 94, Praha 4','Solving', '03.12.2023/4d 15h'),
    createIssuesData('is-44540739-pr6', 'Uiccera', 'Pjdqajmfn 46, Praha 2','Resolved', '22.01.2023/4d 42h'),
    createIssuesData('is-51292268-pr8', 'Ntwzxa', 'Mfdbcgx 60, Praha 8','Resolved', '12.02.2023/2d 14h'),
    createIssuesData('is-82024045-pr2', 'Bmhaqxyzx', 'Atwgvcsup 62, Praha 9','Resolved', '15.01.2023/4d 43h'),
    createIssuesData('is-53632596-pr9', 'Gtowzrdnj', 'Fkqwszqts 17, Praha 8','Resolved', '14.01.2023/3d 30h'),
    createIssuesData('is-80124972-pr3', 'Isrcnld', 'Ajzjso 84, Praha 2','Resolved', '18.01.2023/2d 22h'),
    createIssuesData('is-93410446-pr1', 'Idbtkwj', 'Qpasqyq 79, Praha 6','Solving', '16.11.2023/3d 18h'),
    createIssuesData('is-94084244-pr9', 'Zqwwru', 'Spgolsoq 82, Praha 1','Resolved', '18.01.2023/4d 28h'),
    createIssuesData('is-19592153-pr6', 'Ruivdktkeno', 'Wbbtvqaah 58, Praha 4','Solving', '22.01.2023/4d 60h'),
    createIssuesData('is-53768904-pr6', 'Zgefngzyyz', 'Atrbtvv 96, Praha 8','Resolved', '14.01.2023/1d 66h'),
    createIssuesData('is-33538986-pr8', 'Xhfxtbymiw', 'Dgnzzu 66, Praha 2','Resolved', '14.12.2023/1d 22h'),
    createIssuesData('is-24748246-pr3', 'Hrjiskay', 'Nahiyjks 15, Praha 1','Resolved', '22.12.2023/1d 66h'),
    createIssuesData('is-70766851-pr4', 'Ocjvbopult', 'Omvpkryke 17, Praha 5','Resolved', '23.12.2023/3d 10h'),
    createIssuesData('is-56141668-pr2', 'Qgjagavjfdl', 'Kjdorxw 89, Praha 1','Resolved', '26.01.2023/2d 47h'),
    createIssuesData('is-38647101-pr3', 'Pjzilu', 'Ulryex 77, Praha 1','Resolved', '12.02.2023/3d 28h'),
    createIssuesData('is-63797530-pr1', 'Zysofowls', 'Ejcjfm 91, Praha 3','Solving', '01.11.2023/2d 56h'),
    createIssuesData('is-93546896-pr5', 'Pfpyaxsku', 'Nqjesnjrq 77, Praha 2','Solving', '12.11.2023/2d 75h'),
    createIssuesData('is-48323478-pr1', 'Gzynsnhcvv', 'Atmsbb 46, Praha 7','Solving', '25.01.2023/1d 15h'),
    createIssuesData('is-06447676-pr5', 'Ppzzafoksja', 'Vwzpbdl 17, Praha 6','Resolved', '04.12.2023/3d 90h'),
    createIssuesData('is-31248441-pr6', 'Dssvtyeg', 'Gvfbyetdz 93, Praha 3','Solving', '17.12.2023/1d 65h'),
    createIssuesData('is-07481851-pr5', 'Mgzssqchvur', 'Isbnnnx 71, Praha 7','Solving', '03.01.2023/2d 80h'),
];

export default function ServiceInfo() {
    const {serviceId} = useParams();
    useEffect(() => {
        document.title = 'Service ' + serviceId;
    });

    return (
        <Container>
            <Header/>
            <InformationPaper/>
            <Container disableGutters sx={{mt: 4, mb: 4}}>
                <IssuesTable/>
            </Container>
        </Container>
    );
}

const Header = () => {
    const {serviceId} = useParams();
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{fontWeight: 'bold'}}
                >
                    Public Service: {serviceId}
                </Typography>
                <Button
                    startIcon={<ArrowBack />}
                    size="medium"
                    variant="contained"
                    color="error"
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
            </Box>
            <Divider
                sx={{
                    mt: 0.5,
                    mb: 4,
                }}
            />
        </>
    );
}

const InformationPaper = () => {
    const theme = useTheme();

    return (
        <>
            <Container
                component={Paper}
                sx={{
                    p: 2,
                    mb: 2,
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
                >
                    <Box>
                        <Typography fontWeight="bold">
                            Information
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color={theme.palette.text.secondary}
                            sx={{
                                mb: 3,
                            }}
                        >
                            Praha 6, Czech Republic | +420 951 256 846
                        </Typography>
                    </Box>
                    <Avatar sx={{bgcolor: deepPurple[500]}}>
                        <Build/>
                    </Avatar>
                </Box>
                <Typography
                    variant="subtitle2"
                    color={theme.palette.text.secondary}
                >
                    Rechair is a public service initiative dedicated to repairing and revitalizing public furniture and fixtures within our communities. This project aims to enhance the quality of public spaces by ensuring that benches, tables, bus stops, and other amenities remain in excellent condition. By doing so, Rechair contributes to a more inviting, comfortable, and functional environment for everyone.
                </Typography>
            </Container>
        </>
    );
}

const IssuesTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const cellAlign = 'left';
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - issues.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleIssues = useMemo(() =>
            issues.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [page, rowsPerPage],
    );

    const colors = {
        'Resolved': 'success',
        'Solving': 'secondary'
    };

    const chipColor = (status) => {
        return colors[status];
    }

    return (
        <>
            <Card>
                <TableContainer component={Paper}>
                    <IssuesToolbar/>
                    <Table>
                        <IssuesTableHead/>
                        <TableBody>
                            {visibleIssues.map((row) => {
                                return (
                                    <TableRow key={row.issueId}>
                                        <TableCell align={cellAlign}>{row.issueId}</TableCell>
                                        <TableCell align={cellAlign}>{row.category}</TableCell>
                                        <TableCell align={cellAlign}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}>
                                                <Place color="action" /> {row.location}
                                            </Box>
                                        </TableCell>
                                        <TableCell align={cellAlign}>
                                            <Chip label={row.status} color={chipColor(row.status)}/>
                                        </TableCell>
                                        <TableCell align="right">{row.dateResTime}</TableCell>
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
                        count={issues.length}
                        component="div"
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[10, 20, 50]}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Card>
        </>
    );
}

const IssuesToolbar = () => {
    const [status, setStatus] = React.useState('');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <>
            <Stack sx={{
                ml: 2,
                mt: 2
            }}
                direction="row"
            >
                <Box sx={{
                    width: 120,
                    mr: 2,
                }}>
                    <FormControl fullWidth>
                        <Select
                            value={status}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value={20}>Resolved</MenuItem>
                            <MenuItem value={30}>Solving</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{
                    width: 170,
                    mr: 2,
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="From" />
                    </LocalizationProvider>
                </Box>
                <Box sx={{
                    width: 170,
                    mr: 2,
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="To" />
                    </LocalizationProvider>
                </Box>
            </Stack>
            <Stack sx={{
                mt: 2,
                ml: 2,
            }}
                   direction="row"
                   spacing={2}
            >
                <Chip label="Resolved: 23" size="small" sx={{ bgcolor: '#2E7D32', color: 'white' }}/>
                <Chip label="Solving: 12" size="small" sx={{ bgcolor: '#84D6D6', color: 'white' }} />
                <Chip label="Total: 35" size="small" sx={{ bgcolor: '#616161', color: 'white' }} />
                <Chip label="AVG: 2d 14h" size="small" sx={{ bgcolor: '#564A0B', color: 'white' }} />
            </Stack>
        </>
    );
}

const IssuesTableHead = () => {

    return (
        <TableHead>
            <TableRow>
                <TableCell align="left"><Typography fontWeight="bold" >Issue ID</Typography></TableCell>
                <TableCell align="left"><Typography fontWeight="bold" >Category</Typography></TableCell>
                <TableCell align="left"><Typography fontWeight="bold" >Location</Typography></TableCell>
                <TableCell align="left"><Typography fontWeight="bold" >Status</Typography></TableCell>
                <TableCell align="right"><Typography fontWeight="bold" >Date/Resolution time</Typography></TableCell>
            </TableRow>
        </TableHead>
    );
}
