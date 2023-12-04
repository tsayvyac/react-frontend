import React, {useEffect} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {ArrowBack, ExitToApp} from "@mui/icons-material";
import {AppBar, Paper, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import Copyright from "../routes/copyright/Copyright";
import Divider from "@mui/material/Divider";

export default function ComparePage() {
    useEffect(() => {
        document.title = 'Compare';
    }, []);

    return (
        <>
            <AppBarHeader/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <Stack
                        spacing={2}
                        direction="row"
                        useFlexGap
                        justifyContent="space-evenly"
                    >
                        <ComparingCards/>
                        <ComparingCards/>
                        <ComparingCards/>
                    </Stack>
                    <Copyright sx={{pt: 4}}/>
                </Container>
            </Box>
        </>
    );
}

const AppBarHeader = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="absolute" sx={{background: '#FFF'}}>
                <Toolbar
                    sx={{
                        pr: '24px',
                    }}
                >
                    <IconButton
                        edge="start"
                        color="black"
                        aria-label="open drawer"
                        sx={{ mr: '36px', }}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBack/>
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="black"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        Compare:
                    </Typography>
                    <IconButton
                        color="black"
                        aria-label="quit"
                        href="/"
                    >
                        <ExitToApp/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const ComparingCards = () => {

    return (
        <>
            <Box>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{fontWeight: 'bold'}}
                >
                    Public service
                </Typography>
                <Divider
                    sx={{
                        mb: 4,
                    }}
                />
                <Container component={Paper}>
                    <h1>Hello</h1>
                </Container>
            </Box>
        </>
    );
}