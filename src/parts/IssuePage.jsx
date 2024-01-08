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
import axios from 'axios';

export default function IssuePage() {
   const theme = useTheme();
   const { index } = useParams();
   const [issueDetails, setIssueDetails] = useState({});
   const [authorName, setAuthorName] = useState('');

   useEffect(() => {
      const fetchIssueDetails = async () => {
         try {
            const response = await api.getIssuesByUid(index);
            response.data.photo = URL.createObjectURL((await api.getPhoto(response.data.photo)).data);
            const author = await api.getAuthorByID(response.data.authorUid);
            setAuthorName(author.data.firstName + ' ' + author.data.lastName);
            setIssueDetails(response.data);
         } catch (error) {
            if (error.response) {
               console.error('Response data:', error.response.data);
            }
         }
      };
      fetchIssueDetails();
   }, [index]);

   const { coordinates, title, status, creationDate, photo, authorId, reservationDate, resolutionDate, description } = issueDetails;
   const normalDate = new Date(creationDate);
   const formattedDate = normalDate.toDateString();
   const isResolved = status === 'RESOLVED';
   const getStatusDisplay = () => {
      if (isResolved) {
         return `Resolved: ${resolutionDate}`;
      } else {
         return status;
      }
   };

   const getResolutionDisplay = () => {
      if (isResolved) {
         return `Resolved by ${authorId}`;
      } else if (status === 'Solving') {
         return `Currently being solved by ${authorId}`;
      } else {
         return '';
      }
   };

   const [normalizedAddress, setNormalizedAddress] = useState('');

   useEffect(() => {
      const fetchNormalizedAddress = async () => {
         try {
            const response = await axios.get(
               `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&key=AIzaSyAYoqbho901MdEF6kk4rJJ8YxjVLzPR4Sw`
            );
            const address = response.data.results[0].formatted_address;
            setNormalizedAddress(address);
         } catch (error) {
            console.error('Error fetching normalized address:', error);
         }
      };

      if (coordinates && coordinates.latitude && coordinates.longitude) {
         fetchNormalizedAddress();
      }
   }, [coordinates]);

   return (
      <>
         <Stack sx={{ width: '100%' }} direction='column' spacing={2}>
            <Box>
               <Typography component='h1' variant='h4'>
                  {title} - {getStatusDisplay()}
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
                              Published by {authorName}
                              {/*{status === 'PUBLISHED' && `Published on ${formattedDate}`}*/}
                              {/*{status === 'SOLVING' && `Is now solving by ${authorId}`}*/}
                              {/*{status === 'RESERVED' && `Reserved by ${authorId}`}*/}
                              {/*{status === 'SOLVED' && `Solved by ${authorId}`}*/}
                           </Typography>
                           <Typography variant='subtitle1' color={theme.palette.text.secondary} fontSize='17px'>
                              Address: {normalizedAddress || 'Loading address...'}
                           </Typography>
                           <Typography variant='subtitle2' color={theme.palette.text.secondary} fontSize='17px'>
                              Published on: {formattedDate}
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
                     <Typography variant='subtitle2' color={theme.palette.primary.main} fontSize='17px'>
                        {getResolutionDisplay()}
                     </Typography>
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
