import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CompareIcon from '@mui/icons-material/Compare';
import {
   Card,
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
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { api } from '../api/apiService';

export default function Services() {
   const [rows, setRows] = useState([]);
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      setLoading(true);
      const fetch = async () => {
         try {
            const response = await api.getServices();
            setRows(response.data.services);
         } catch (e) {
            console.error(`Error occurred: ${e}`);
            setError('Error fetching data. Please, try again later!');
         } finally {
            setLoading(false);
         }
      };
      document.title = 'Public Services';
      fetch();
   }, []);

   if (error) {
      return <Typography>{error}</Typography>;
   }

   return (
      <>
         <Typography component='h1' variant='h4' sx={{ fontWeight: 'bold' }}>
            Public services ({rows.length})
         </Typography>
         <Divider />
         <Container disableGutters sx={{ mt: 4, mb: 4 }}>
            {isLoading ? <LinearProgress /> : <ServicesTable rows={rows} />}
         </Container>
      </>
   );
}

const ServicesTable = (props) => {
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const cellAlign = 'left';
   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;
   const [checked, setChecked] = useState(new Array(props.rows.length).fill(false));
   const navigate = useNavigate();

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

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const visibleRows = useMemo(() => props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [page, rowsPerPage]);

   return (
      <>
         <Card>
            <TableContainer component={Paper}>
               <Table>
                  <ServicesTableHead />
                  <TableBody>
                     {visibleRows.map((row, index) => (
                        <TableRow key={row.uid}>
                           <TableCell align={cellAlign}>
                              <StyledLink to={'../services/' + row.uid}>{row.name ?? 'null'}</StyledLink>
                           </TableCell>
                           <TableCell align={cellAlign}>{row.phoneNumber ?? 'null'}</TableCell>
                           <TableCell align={cellAlign}>{row.address ?? 'null'}</TableCell>
                           <TableCell align={cellAlign}>{row.rr ?? 'null / null'}</TableCell>
                           <TableCell align='right' padding='checkbox'>
                              <Checkbox
                                 disabled={handleDisabled(index)}
                                 checked={checked[index]}
                                 onChange={(e) => handleCheckbox(index, e)}
                              />
                           </TableCell>
                        </TableRow>
                     ))}
                     {emptyRows > 0 && (
                        <TableRow
                           style={{
                              height: 53 * emptyRows
                           }}
                        >
                           <TableCell colSpan={6} />
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
               <TablePagination
                  count={props.rows.length}
                  component='div'
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[10, 20, 50]}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
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
               <Typography fontWeight='bold'>Location</Typography>
            </TableCell>
            <TableCell align='left'>
               <Typography fontWeight='bold'>Reserved/Resolved</Typography>
            </TableCell>
            <TableCell align='left'>
               <Typography fontWeight='bold'>Compare</Typography>
            </TableCell>
         </TableRow>
      </TableHead>
   );
};
