import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ArrowBack, Build, ExitToApp } from '@mui/icons-material';
import { AppBar, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Copyright from '../routes/copyright/Copyright';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

export default function ComparePage() {
    useEffect(() => {
        document.title = 'Compare';
    }, []);

    return (
        <>
            <AppBarHeader />
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto'
                }}
            >
                <Toolbar />
                <Container disableGutters maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                    <Stack spacing={5} direction='row' useFlexGap justifyContent='space-between'>
                        <ComparingCards />
                        <ComparingCards />
                        <ComparingCards />
                    </Stack>
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </>
    );
}

const AppBarHeader = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position='absolute' sx={{ background: '#FFF' }}>
                <Toolbar
                    sx={{
                        pr: '24px'
                    }}
                >
                    <IconButton edge='start' color='black' aria-label='open drawer' sx={{ mr: '36px' }} onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Typography component='h1' variant='h6' color='black' noWrap sx={{ flexGrow: 1 }}>
                        Compare:
                    </Typography>
                    <IconButton color='black' aria-label='quit' href='/'>
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

const ComparingCards = () => {
    const theme = useTheme();

    return (
        <>
            <Stack sx={{ width: '100%' }} direction='column' spacing={2}>
                <Box>
                    <Typography component='h1' variant='h4'>
                        Public service
                    </Typography>
                    <Divider />
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Total:</TableCell>
                                <TableCell>13</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Solving:</TableCell>
                                <TableCell>3</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Resolved:</TableCell>
                                <TableCell>6</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>AVG:</TableCell>
                                <TableCell>3d 6h</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Container component={Paper} sx={{ p: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box>
                            <Typography fontWeight='bold'>Information</Typography>
                            <Typography variant='subtitle2' color={theme.palette.text.secondary}>
                                Praha 6, Czech Republic |
                            </Typography>
                            <Typography
                                variant='subtitle2'
                                color={theme.palette.text.secondary}
                                sx={{
                                    mb: 3
                                }}
                            >
                                +420951256846
                            </Typography>
                        </Box>
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>
                            <Build />
                        </Avatar>
                    </Box>
                    <Typography variant='subtitle2' color={theme.palette.text.secondary}>
                        Rechair is a public service initiative dedicated to repairing and revitalizing public furniture and fixtures within
                        our communities. This project aims to enhance the quality of public spaces by ensuring that benches, tables, bus
                        stops, and other amenities remain in excellent condition. By doing so, Rechair contributes to a more inviting,
                        comfortable, and functional environment for everyone.
                    </Typography>
                </Container>
            </Stack>
        </>
    );
};
