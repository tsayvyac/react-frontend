import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Construction, ErrorOutline, ExitToApp, Map } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import { List } from '@mui/material';
import Container from '@mui/material/Container';
import Copyright from './copyright/Copyright';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemText from '@mui/material/ListItemText';
import Dashboard from '../parts/Dashboard';
import Issues from '../parts/Issues';
import Services from '../parts/Services';
import MapPage from '../parts/MapPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ServiceInfo from '../parts/ServiceInfo';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import IssuePage from '../parts/IssuePage';

const defaultTheme = createTheme({
   palette: {
      issuesCategories: {
         resolved: '#4caf50',
         solving: '#00bcd4',
         reserved: '#ff6600',
         published: '#fce571',
         default: '#7bcf7d'
      }
   }
});

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
   }),
   ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen
      })
   })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
   '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
         overflowX: 'hidden',
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
         }),
         width: theme.spacing(7),
         [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7)
         }
      })
   }
}));

export default function DrawerAppBar() {
   const [open, setOpen] = useState(true);
   const toggleDrawer = () => setOpen(!open);
   const navigate = useNavigate();

   const handleLogout = () => {
      signOut(auth)
         .then(() => {
            console.log(auth.currentUser);
            navigate('/');
         })
         .catch((error) => {
            console.log('Logout failed: ', error);
         });
   };

   return (
      <ThemeProvider theme={defaultTheme}>
         <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position='absolute' open={open} sx={{ background: '#FFF' }}>
               <Toolbar
                  sx={{
                     pr: '24px'
                  }}
               >
                  <IconButton
                     edge='start'
                     color='black'
                     aria-label='open drawer'
                     onClick={toggleDrawer}
                     sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' })
                     }}
                  >
                     <MenuIcon />
                  </IconButton>
                  <Typography component='h1' variant='h6' color='black' noWrap sx={{ flexGrow: 1 }}>
                     Analyst: Name
                  </Typography>
                  <IconButton color='black' aria-label='quit' onClick={handleLogout}>
                     <ExitToApp />
                  </IconButton>
               </Toolbar>
            </AppBar>
            <Drawer variant='permanent' open={open}>
               <Toolbar
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'flex-end',
                     px: [1]
                  }}
               >
                  <IconButton onClick={toggleDrawer}>
                     <ChevronLeftIcon />
                  </IconButton>
               </Toolbar>
               <Divider />
               <List component='nav'>
                  <>
                     <ListItemButton onClick={() => navigate('dashboard')}>
                        <ListItemIcon>
                           <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary='Dashboard' />
                     </ListItemButton>
                     <ListItemButton onClick={() => navigate('issues')}>
                        <ListItemIcon>
                           <ErrorOutline />
                        </ListItemIcon>
                        <ListItemText primary='Issues' />
                     </ListItemButton>
                     <ListItemButton onClick={() => navigate('services')}>
                        <ListItemIcon>
                           <Construction />
                        </ListItemIcon>
                        <ListItemText primary='Public services' />
                     </ListItemButton>
                     <ListItemButton onClick={() => navigate('map')}>
                        <ListItemIcon>
                           <Map />
                        </ListItemIcon>
                        <ListItemText primary='Map' />
                     </ListItemButton>
                  </>
               </List>
            </Drawer>
            <Box
               component='main'
               sx={{
                  flexGrow: 1,
                  height: '100vh',
                  overflow: 'auto'
               }}
            >
               <Toolbar />
               <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                  <Routes>
                     <Route index path='dashboard' element={<Dashboard />}></Route>
                     <Route path='issues' element={<Issues />}></Route>
                     <Route path='issues/:index' element={<IssuePage />}></Route>
                     <Route path='services' element={<Services />}></Route>
                     <Route path='map' element={<MapPage />}></Route>
                     <Route path='services/:serviceId' element={<ServiceInfo />}></Route>
                  </Routes>
                  <Copyright sx={{ pt: 4 }} />
               </Container>
            </Box>
         </Box>
      </ThemeProvider>
   );
}
