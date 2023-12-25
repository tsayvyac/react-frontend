import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './copyright/Copyright';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { tokenSetter } from '../api/apiService';

const defaultTheme = createTheme();

export default function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   const handleSubmit = (event) => {
      event.preventDefault();
      setLoading(true);
      setError('');

      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            return userCredential.user.getIdToken(true);
         })
         .then((token) => {
            tokenSetter.setToken(token);
            navigate('/main');
         })
         .catch((error) => {
            setError(error.message);
         })
         .finally(() => {
            setLoading(false);
         });
   };

   const navigate = useNavigate();

   return (
      <ThemeProvider theme={defaultTheme}>
         <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component='h1' variant='h5'>
                  Login
               </Typography>
               {error && <Alert severity='error'>{error}</Alert>}
               <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                     margin='normal'
                     required
                     fullWidth
                     id='email'
                     label='Email Address'
                     name='email'
                     autoComplete='email'
                     autoFocus
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                     margin='normal'
                     required
                     fullWidth
                     name='password'
                     label='Password'
                     type='password'
                     id='password'
                     autoComplete='current-password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
                  <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={loading}>
                     Login
                  </Button>
                  <Grid container>
                     <Grid item xs>
                        <Link href='#' variant='body2'>
                           Forgot password?
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
         </Container>
      </ThemeProvider>
   );
}
