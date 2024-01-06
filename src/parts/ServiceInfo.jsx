import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { ArrowBack, Build, Place } from '@mui/icons-material';
import Container from '@mui/material/Container';
import {
   Card,
   Chip,
   CircularProgress,
   Dialog,
   DialogActions,
   DialogTitle,
   FormControl,
   InputLabel,
   LinearProgress,
   MenuItem,
   Paper,
   Select,
   Slide,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TablePagination,
   TableRow
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { api } from '../api/apiService';
import { format } from 'date-fns';

const filterData = (issues, filter) => {
   return issues.filter((issue) => {
      if (filter.status === '') return true;
      return !(filter.status !== 'All' && issue.status !== filter.status);
   });
};

export default function ServiceInfo() {
   const { serviceId } = useParams();
   const [service, setService] = useState({});
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      setLoading(true);
      const fetch = async () => {
         try {
            const response = await api.getServicesByUid(serviceId);
            setService(response.data);
         } catch (e) {
            console.error(`Error occurred: ${e}`);
            setError('Error fetching data. Please, try again later!');
         } finally {
            setLoading(false);
         }
      };
      document.title = 'Service Info';
      fetch();
   }, [serviceId]);

   if (error) {
      return <Typography>{error}</Typography>;
   }

   return isLoading ? (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 25
         }}
      >
         <CircularProgress />
      </Box>
   ) : (
      <>
         <Header service={service} />
         <InformationPaper service={service} />
         <Container disableGutters sx={{ mt: 4, mb: 4 }}>
            <IssuesTable serviceId={serviceId} />
         </Container>
      </>
   );
}

const Header = (props) => {
   const navigate = useNavigate();

   return (
      <>
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between'
            }}
         >
            <Typography component='h1' variant='h4' sx={{ fontWeight: 'bold' }}>
               Public service: {props.service.name ?? 'null'}
            </Typography>
            <Button startIcon={<ArrowBack />} variant='contained' color='error' onClick={() => navigate(-1)}>
               Back
            </Button>
         </Box>
         <Divider
            sx={{
               mb: 4
            }}
         />
      </>
   );
};

const InformationPaper = (props) => {
   const theme = useTheme();

   return (
      <>
         <Container
            component={Paper}
            sx={{
               p: 2,
               mb: 2
            }}
         >
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
               }}
            >
               <Box>
                  <Typography fontWeight='bold'>Information</Typography>
                  <Typography
                     variant='subtitle2'
                     color={theme.palette.text.secondary}
                     sx={{
                        mb: 3
                     }}
                  >
                     {props.service.address ?? 'null'} | {props.service.phoneNumber ?? 'null'} | {props.service.email ?? 'null'}
                  </Typography>
               </Box>
               <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  <Build />
               </Avatar>
            </Box>
            <Typography variant='subtitle2' color={theme.palette.text.secondary}>
               {props.service.description}
            </Typography>
         </Container>
      </>
   );
};

const IssuesTableHead = () => {
   return (
      <TableHead>
         <TableRow>
            <TableCell align='left'>
               <Typography fontWeight='bold'>Issue ID</Typography>
            </TableCell>
            <TableCell align='left'>
               <Typography fontWeight='bold'>Category</Typography>
            </TableCell>
            <TableCell align='left'>
               <Typography fontWeight='bold'>Location</Typography>
            </TableCell>
            <TableCell align='left'>
               <Typography fontWeight='bold'>Status</Typography>
            </TableCell>
            <TableCell align='right'>
               <Typography fontWeight='bold'>Date/Resolution time</Typography>
            </TableCell>
         </TableRow>
      </TableHead>
   );
};

const IssuesToolbar = (props) => {
   const handleChange = (event) => {
      props.setFilter({ ...props.filter, status: event.target.value });
   };
   const handleOrderBy = (event) => {
      props.setFilter({ ...props.filter, order_by: event.target.value });
   };
   const [openDialog, setOpenDialog] = useState(false);
   const handleOpenDialog = () => {
      setOpenDialog(true);
   };
   const handleCloseDialog = () => {
      setOpenDialog(false);
   };

   return (
      <>
         <Stack
            sx={{
               ml: 2,
               mt: 2
            }}
            useFlexGap
            alignItems='center'
            justifyContent='space-between'
            direction='row'
         >
            <Stack direction='row'>
               <Box
                  sx={{
                     width: 150,
                     mr: 2
                  }}
               >
                  <FormControl fullWidth>
                     <InputLabel id='status'>Status</InputLabel>
                     <Select
                        value={props.filter.status}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        label='Status'
                        labelId='status'
                     >
                        <MenuItem value='All'>All</MenuItem>
                        <MenuItem value='SOLVED'>SOLVED</MenuItem>
                        <MenuItem value='SOLVING'>SOLVING</MenuItem>
                        <MenuItem value='DELETED'>DELETED</MenuItem>
                        <MenuItem value='PUBLISHED'>PUBLISHED</MenuItem>
                        <MenuItem value='MODERATION'>MODERATION</MenuItem>
                     </Select>
                  </FormControl>
               </Box>
               <Box
                  sx={{
                     width: 150,
                     mr: 2
                  }}
               >
                  <FormControl fullWidth>
                     <InputLabel id='order-by'>Order by</InputLabel>
                     <Select
                        value={props.filter.order_by}
                        onChange={handleOrderBy}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        label='Order by'
                        labelId='order-by'
                     >
                        <MenuItem value='STATUS'>STATUS</MenuItem>
                        <MenuItem value='CREATION_DATE'>CREATION DATE</MenuItem>
                        <MenuItem value='CATEGORY'>CATEGORY</MenuItem>
                        <MenuItem value='LIKES'>LIKES</MenuItem>
                     </Select>
                  </FormControl>
               </Box>
            </Stack>
            <Box>
               <Button variant='contained' sx={{ mr: 2 }} onClick={handleOpenDialog}>
                  Export to PDF
               </Button>
            </Box>
         </Stack>
         <Stack
            sx={{
               mt: 2,
               ml: 2
            }}
            direction='row'
            spacing={2}
         >
            <Chip label='Resolved: 23' size='small' sx={{ bgcolor: '#2E7D32', color: 'white' }} />
            <Chip label='Solving: 12' size='small' sx={{ bgcolor: '#84D6D6', color: 'white' }} />
            <Chip label='Total: 35' size='small' sx={{ bgcolor: '#616161', color: 'white' }} />
            <Chip label='AVG: 2d 14h' size='small' sx={{ bgcolor: '#564A0B', color: 'white' }} />
         </Stack>
         <ExportDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
      </>
   );
};

const IssuesTable = (props) => {
   const [isLoading, setLoading] = useState(false);
   const [categories, setCategories] = useState([]);
   const [issues, setIssues] = useState([]);
   const [error, setError] = useState(null);
   const [page, setPage] = useState(0);
   const rowsPerPage = 10;
   const cellAlign = 'left';
   const [filter, setFilter] = useState({
      status: 'All',
      order_by: 'CREATION_DATE'
   });

   useEffect(() => {
      setLoading(true);
      const fetch = async () => {
         try {
            let issuesRes;
            if (filter.status === 'All') {
               issuesRes = await api.getServiceAllIssues(props.serviceId, filter.order_by);
            } else {
               issuesRes = await api.getServiceIssues(props.serviceId, filter.status, filter.order_by);
            }
            const categoriesRes = await api.getCategories();
            setCategories(categoriesRes.data);
            setIssues(issuesRes.data.issues);
         } catch (e) {
            console.error(`Error occurred: ${e}`);
            setError('Error fetching data. Please, try again later!');
         } finally {
            setLoading(false);
         }
      };
      fetch();
   }, [page, filter]);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const colors = {
      SOLVED: 'success',
      SOLVING: 'secondary'
   };

   const chipColor = (status) => {
      return colors[status];
   };

   if (error) {
      return <Typography>{error}</Typography>;
   }

   return isLoading ? (
      <LinearProgress />
   ) : (
      <>
         <Card>
            <TableContainer component={Paper}>
               <IssuesToolbar setFilter={setFilter} filter={filter} categories={categories} />
               <Table>
                  <IssuesTableHead />
                  <TableBody>
                     {filterData(issues, filter)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                           return (
                              <TableRow key={row.id}>
                                 <TableCell align={cellAlign}>{row.id}</TableCell>
                                 <TableCell align={cellAlign}>{categories.find((c) => c.id === row.categoryId).name ?? 'null'}</TableCell>
                                 <TableCell align={cellAlign}>
                                    <Box
                                       sx={{
                                          display: 'flex',
                                          alignItems: 'center'
                                       }}
                                    >
                                       <Place color='action' /> Lat: {row.coordinates.latitude} Long: {row.coordinates.longitude}
                                    </Box>
                                 </TableCell>
                                 <TableCell align={cellAlign}>
                                    <Chip label={row.status} color={chipColor(row.status)} />
                                 </TableCell>
                                 <TableCell align='right'>{format(new Date(row.creationDate), 'dd.MM.yyyy')}</TableCell>
                              </TableRow>
                           );
                        })}
                  </TableBody>
               </Table>
               <TablePagination
                  count={filterData(issues, filter).length}
                  component='div'
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[]}
                  onPageChange={handleChangePage}
               />
            </TableContainer>
         </Card>
      </>
   );
};

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction='up' ref={ref} {...props} />;
});

const ExportDialog = (props) => {
   return (
      <Dialog open={props.openDialog} TransitionComponent={Transition} keepMounted onClose={props.handleCloseDialog}>
         <DialogTitle>{'Do you want to export statistics to PDF with used filters?'}</DialogTitle>
         <DialogActions>
            <Button onClick={props.handleCloseDialog}>Export</Button>
            <Button color='error' onClick={props.handleCloseDialog}>
               Cancel
            </Button>
         </DialogActions>
      </Dialog>
   );
};
