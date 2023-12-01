import * as React from 'react';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function MapPage() {
    return (
        <React.Fragment>
            <Typography
                component="h1"
                variant="h4"
                sx={{fontWeight: 'bold'}}
            >
                Map
            </Typography>
            <Divider />
            <Container disableGutters sx={{mt: 4, mb: 4}}>
                Content Not Found
            </Container>
        </React.Fragment>
    );
}