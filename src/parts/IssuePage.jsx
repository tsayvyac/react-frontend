import { Paper, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';

export default function IssuePage() {
   const theme = useTheme();

   const issue_obj = useLocation();
   // if (!issue) {
   //     return <div>Content not found</div>;
   // }
   const { address, title, status, date } = issue_obj.state;

   const imageUrl =
      'https://cdnn1.img.sputnik-ossetia.ru/img/945/93/9459311_0:160:3073:1888_1920x0_80_0_0_93dcc8a2c735006de92bc583cc06a0cc.jpg';
   const hoverImageUrl = 'https://cs13.pikabu.ru/post_img/big/2019/06/27/4/1561610943158893358.jpg';

   const reservationDate = '2023-12-11';
   const resolutionDate = '2023-12-19';
   const description =
      'The bim bim bam bam was broken, had to fix the bim bim bam bam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Quisque porta. Aenean fermentum risus id tortor. Sed convallis magna eu sem.';

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
                  <img
                     src={imageUrl}
                     alt='Issue Photo'
                     style={{ width: '100%', height: 'auto' }}
                     onMouseOver={(e) => (e.currentTarget.src = hoverImageUrl)}
                     onMouseOut={(e) => (e.currentTarget.src = imageUrl)}
                  />
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
                              Resolved within 3d 14h by Rechair.
                           </Typography>
                           <Typography variant='subtitle1' color={theme.palette.text.secondary} fontSize='17px'>
                              Address: {address}
                           </Typography>
                           <Typography
                              variant='subtitle2'
                              color={theme.palette.text.secondary}
                              fontSize='17px'
                              // sx={{
                              //     mb: 3
                              // }}
                           >
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
