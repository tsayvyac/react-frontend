import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { Tab, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { api } from '../api/apiIssues';
// import getAddressFromCoordinates from '../api/AddressBuilder';

function CustomTabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
         {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
   );
}

CustomTabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired
};

export default function Issues() {
   const [dummyData, setListIssues] = useState([]);
   const [categories, setCategories] = useState([]);
   // const [loading, setLoading] = useState(true); // Track loading state

   useEffect(() => {
      document.title = 'Issues';
      const fetch = async () => {
         try {
            const response = await api.getIssues();
            const responseCategories = await api.getCategories();
            setListIssues(response.data.issues);
            setCategories(responseCategories.data);
            const modifiedIssues = response.data.issues.map((issue) => {
               // const address = getAddressFromCoordinates(issue.coordinates.latitude, issue.coordinates.longitude);
               const creationDate = new Date(issue.creationDate).toLocaleDateString();
               return {
                  ...issue,
                  creationDate
               };
            });
            setListIssues(modifiedIssues);
         } catch (e) {
            console.error(`Error occurred: ${e}`);
         }
      };
      fetch();
   }, []);

   const theme = useTheme();
   const [value, setValue] = useState(0);
   const [filter, setFilter] = useState({
      title: '',
      fromDate: '',
      toDate: '',
      status: 'ALL'
   });

   const handleFilterChange = (event) => {
      setFilter({ ...filter, [event.target.name]: event.target.value });
   };

   return (
      <>
         <Button
            onClick={() => {
               console.log(api.getCategories());
            }}
         >
            Test Api
         </Button>
         <Typography component='h1' variant='h4' sx={{ fontWeight: 'bold' }}>
            Issues
         </Typography>
         <Divider />
         <Container disableGutters sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} sx={{ flexDirection: 'column', marginLeft: '5px' }}>
               <IssuesCategories value={value} setFilter={setFilter} setValue={setValue} filter={filter} />
               <IssuesFilter handleFilterChange={handleFilterChange} />
               <IssuesTable
                  filter={filter}
                  issueStatusColors={theme.palette.issuesCategories}
                  dummyData={dummyData}
                  categories={categories}
               />
            </Grid>
         </Container>
      </>
   );
}

const IssuesCategories = (props) => {
   const handleCategoryChange = (event, newValue) => {
      const statusTypes = ['ALL', 'PUBLISHED', 'RESERVED', 'SOLVING', 'RESOLVED'];
      props.setFilter({ ...props.filter, status: statusTypes[newValue] });
      props.setValue(newValue);
   };

   return (
      <Box sx={{ borderBottom: 1, borderColor: 'divider', flexDirection: 'column' }}>
         <Tabs value={props.value} onChange={handleCategoryChange} aria-label='basic tabs example'>
            <Tab label='ALL' />
            <Tab label='Published' />
            <Tab label='Reserved' />
            <Tab label='SOLVING' />
            <Tab label='Resolved' />
         </Tabs>
      </Box>
   );
};
const IssuesFilter = (props) => (
   <Box
      component='form'
      sx={{
         display: 'flex',
         marginTop: '15px',
         marginLeft: '5px',
         flexDirection: 'row',
         alignItems: 'center',
         '& .MuiTextField-root': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete='off'
   >
      <TextField
         name='title'
         label='Search'
         placeholder='Title of issue'
         onChange={props.handleFilterChange}
         InputLabelProps={{ shrink: true }}
      />
      <TextField
         name='dateFrom'
         label='Date from'
         // placeholder="dd/mm/yyyy"
         type={'date'}
         onChange={props.handleFilterChange}
         InputLabelProps={{ shrink: true }}
      />
      <TextField
         name='dateTo'
         label='Date to'
         // placeholder="dd/mm/yyyy"
         type={'date'}
         onChange={props.handleFilterChange}
         InputLabelProps={{ shrink: true }}
      />
   </Box>
);

const filterData = (data, filter) => {
   return data.filter((item) => {
      if (filter.title && !item.title.toLowerCase().includes(filter.title.toLowerCase())) {
         return false;
      }

      // Filter by date range
      const itemDate = new Date(item.date);
      const fromDate = filter.fromDate ? new Date(filter.fromDate) : null;
      const toDate = filter.toDate ? new Date(filter.toDate) : null;

      if (fromDate && itemDate < fromDate) {
         return false;
      }
      if (toDate && itemDate > toDate) {
         return false;
      }

      return !(filter.status !== 'ALL' && item.status !== filter.status);
   });
};
const IssuesTable = (props) => {
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);

   const visibleRows = useMemo(
      () => filterData(props.dummyData, props.filter).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
      [page, rowsPerPage, props.filter, props.dummyData]
   );

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const getStatusBarStyle = (status) => {
      let backgroundColor;

      switch (status) {
         case 'Resolved':
            backgroundColor = props.issueStatusColors.resolved;
            break;
         case 'Solving':
            backgroundColor = props.issueStatusColors.solving;
            break;
         case 'Reserved':
            backgroundColor = props.issueStatusColors.reserved;
            break;
         case 'Published':
            backgroundColor = props.issueStatusColors.published;
            break;
         default:
            backgroundColor = props.issueStatusColors.default;
            break;
      }

      return {
         borderRadius: '19px',
         backgroundColor: backgroundColor,
         padding: '5px 20px',
         display: 'inline-block'
      };
   };

   const getCategoryName = (categoryId) => {
      // Найти категорию по айди в массиве категорий
      const category = props.categories.find((cat) => cat.id === categoryId);

      // Вернуть название категории, если найдено, иначе вернуть пустую строку
      return category ? category.name : '';
   };

   const populateTable = () => {
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

      return (
         <>
            {visibleRows.map((row, index) => (
               <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                     <StyledLink to={`../issues/${row.id}`} state={{ ...row }}>
                        {row.title}
                     </StyledLink>
                  </TableCell>
                  {/* Используем getCategoryName для получения названия категории */}
                  <TableCell align='left'>{getCategoryName(row.categoryId)}</TableCell>
                  <TableCell align='left'>{row.address}</TableCell>
                  <TableCell align='left'>
                     <div style={getStatusBarStyle(row.status)}>{row.status}</div>
                  </TableCell>
                  <TableCell align='left'>{row.creationDate}</TableCell>
               </TableRow>
            ))}
         </>
      );
   };

   return (
      <Box>
         <Table sx={{ minWidth: 650 }} aria-label='Data table'>
            <TableHead>
               <TableRow>
                  <TableCell>
                     <Typography fontWeight='bold'>Title</Typography>
                  </TableCell>
                  <TableCell align='left'>
                     <Typography fontWeight='bold'>Category</Typography>
                  </TableCell>
                  <TableCell align='left'>
                     <Typography fontWeight='bold'>Address</Typography>
                  </TableCell>
                  <TableCell align='left'>
                     <Typography fontWeight='bold'>Status</Typography>
                  </TableCell>
                  <TableCell align='left'>
                     <Typography fontWeight='bold'>Date of creation</Typography>
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>{populateTable()}</TableBody>
         </Table>
         <TablePagination
            count={filterData(props.dummyData, props.filter).length}
            component='div'
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 20, 50]}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />
      </Box>
   );
};
