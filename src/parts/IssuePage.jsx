import { Paper, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api/apiIssues';
import Button from '@mui/material/Button';

export default function IssuePage() {
   const theme = useTheme();
   const { index } = useParams();
   const [issueDetails, setIssueDetails] = useState({});

   useEffect(() => {
      const fetchIssueDetails = async () => {
         try {
            const response = await api.getIssuesByUid(index);
            response.data.photo = URL.createObjectURL((await api.getPhoto(response.data.photo)).data);
            setIssueDetails(response.data);
         } catch (error) {
            if (error.response) {
               console.error('Response data:', error.response.data);
            }
         }
      };
      fetchIssueDetails();
   }, [index]);

   const { address, title, status, date, photo, authorId, reservationDate, resolutionDate, description } = issueDetails;

   return (
      <>
         <Stack sx={{ width: '100%' }} direction='column' spacing={2}>
            <Box>
               <Typography component='h1' variant='h4'>
                  {title} - {status}
               </Typography>
               <Divider />
            </Box>
            <Grid container spacing={3}>
               <Grid item xs={12} md={6}>
                  <img src={photo} alt='Issue Photo' style={{ width: '100%', height: 'auto' }} />
                  <Typography variant='subtitle2' color={theme.palette.text.secondary}></Typography>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Container component={Paper} sx={{ p: 2 }}>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'space-between'
                        }}
                     >
                        <Box>
                           <Typography fontWeight='bold' fontSize='35px' marginBottom={'20px'}>
                              Information
                           </Typography>
                           <Typography fontSize='20px' marginBottom={'10px'} color={theme.palette.text.secondary}>
                              Resolved within 3d 14h by {authorId}.
                           </Typography>
                           <Typography variant='subtitle1' color={theme.palette.text.secondary} fontSize='17px'>
                              Address: {address}
                           </Typography>
                           <Typography variant='subtitle2' color={theme.palette.text.secondary} fontSize='17px'>
                              Published on: {date}
                           </Typography>
                           {reservationDate && (
                              <Typography variant='subtitle2' color={theme.palette.text.secondary} fontSize='17px'>
                                 Reserved: {reservationDate}
                              </Typography>
                           )}
                        </Box>
                     </Box>
                     <Typography variant='subtitle2' color={theme.palette.text.secondary}></Typography>
                  </Container>
               </Grid>
            </Grid>
            <Grid>
               <Container component={Paper} sx={{ p: 2 }}>
                  <Box>
                     {resolutionDate && (
                        <Typography variant='subtitle2' color={theme.palette.primary.main} fontSize='17px'>
                           Resolved: {resolutionDate}
                        </Typography>
                     )}
                     <Typography variant='subtitle1' fontWeight='bold' fontSize='25px'>
                        Description:
                     </Typography>
                     <Typography variant='subtitle1' color={theme.palette.text.secondary} fontSize='18px'>
                        {description}
                     </Typography>
                  </Box>
               </Container>
            </Grid>
         </Stack>
      </>
   );
}
