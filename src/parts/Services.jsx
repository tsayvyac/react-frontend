import * as React from 'react';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";

export default function Services(defaultTheme) {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Typography
                component="h1"
                variant="h4"
                sx={{fontWeight: 'bold'}}
            >
                Public services
            </Typography>
            <Divider />
            <Container disableGutters sx={{mt: 4, mb: 4}}>
                Content Not Found
            </Container>
        </ThemeProvider>
    );
}