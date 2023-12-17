import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function NotMatch() {
    useEffect(() => {
        document.title = 'Not Found';
    }, []);

    return (
        <>
            <Grid container spacing={0} alignItems='center' style={{ minHeight: '100vh' }} direction='column' justify='center'>
                <Typography variant='h3' component='h2'>
                    Page Not Found
                </Typography>
            </Grid>
        </>
    );
}
