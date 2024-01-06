import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CompareIcon from '@mui/icons-material/Compare';
import {
   Card,
   CircularProgress,
   Fab,
   LinearProgress,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TablePagination,
   TableRow
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { api } from '../api/apiService';
import Box from '@mui/material/Box';

export default function Services() {
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [count, setCount] = useState(0);

   useEffect(() => {
      document.title = 'Public Services';
      setLoading(true);
      const fetchCount = async () => {
         try {
            const res = await api.getServicesCount();
            setCount(res.data);
         } catch (e) {
            console.error(`Error occurred: ${e}`);
            setError('Error fetching data. Please, try again later!');
         } finally {
            setLoading(false);
         }
      };
      fetchCount();
   }, []);

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
         <Typography component='h1' variant='h4' sx={{ fontWeight: 'bold' }}>
            Public services ({count['count']})
         </Typography>
         <Divider />
         <Container disableGutters sx={{ mt: 4, mb: 4 }}>
            <ServicesTable />
         </Container>
      </>
   );
}

const ServicesTable = () => {
   const [rows, setRows] = useState([]);
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [page, setPage] = useState(0);
   const rowsPerPage = 10;
   const cellAlign = 'left';
   const [checked, setChecked] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      setLoading(true);
      const fetch = async () => {
         try {
            const response = await api.getServices(page);
            if (response.data.services.length > 0) {
               setRows(response.data.services);
               setChecked(new Array(response.data.services.length).fill(false));
            }
         } catch (e) {
            console.error(`Error occurred: ${e}`);
            setError('Error fetching data. Please, try again later!');
         } finally {
            setLoading(false);
         }
      };
      fetch();
   }, [page]);

   const StyledLink = styled(Link)`
      text-decoration: none;
      color: #3f51b5;
      &:visited {
         color: #3f51b5;
      }
      &:hover {
         text-decoration: underline;
      }
   `;

   const handleCheckbox = (position, e) => {
      if (checked.filter((i) => i).length >= 3 && e.target.checked) return;
      const updated = checked.map((item, index) => (index === position ? !item : item));
      setChecked(updated);
   };

   const handleDisabled = (index) => {
      return checked.filter((p) => p === true).length >= 3 && !checked[index];
   };

   const handleFab = () => {
      return checked.filter((i) => i).length < 2;
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
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
               <Table>
                  <ServicesTableHead />
                  <TableBody>
                     {rows.map((row, index) => {
                        return (
                           <TableRow key={row.uid}>
                              <TableCell align={cellAlign}>
                                 <StyledLink to={'../services/' + row.uid}>{row.name ?? 'null'}</StyledLink>
                              </TableCell>
                              <TableCell align={cellAlign}>{row.phoneNumber ?? 'null'}</TableCell>
                              <TableCell align={cellAlign}>{row.address ?? 'null'}</TableCell>
                              {/*<TableCell align={cellAlign}>{row.rr ?? 'null / null'}</TableCell>*/}
                              <TableCell align='right' padding='checkbox'>
                                 <Checkbox
                                    disabled={handleDisabled(index)}
                                    checked={checked[index]}
                                    onChange={(e) => handleCheckbox(index, e)}
                                 />
                              </TableCell>
                           </TableRow>
                        );
                     })}
                  </TableBody>
               </Table>
               <TablePagination
                  count={rows.length}
                  component='div'
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[]}
                  onPageChange={handleChangePage}
               />
            </TableContainer>
         </Card>
         <Fab
            disabled={handleFab()}
            variant='extended'
            color='primary'
            style={{
               position: 'fixed',
               top: 'auto',
               left: 'auto',
               margin: 0,
               right: 40,
               bottom: 20
            }}
            onClick={() => navigate('../../compare')}
         >
            <CompareIcon />
            Compare
         </Fab>
      </>
   );
};

const ServicesTableHead = () => {
   return (
      <TableHead>
         <TableRow>
            <TableCell align='left'>
               <Typography fontWeight='bold'>Public service name</Typography>
            </TableCell>
            <TableCell align='left'>
               <Typography fontWeight='bold'>Phone</Typography>
            </TableCell>
            <TableCell align='left'>
               <Typography fontWeight='bold'>Address</Typography>
            </TableCell>
            <TableCell align='left'>
               <Typography fontWeight='bold'>Compare</Typography>
            </TableCell>
         </TableRow>
      </TableHead>
   );
};
