import Divider from '@mui/material/Divider';
import { Chip, lighten, LinearProgress, Stack } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/apiService';
import { Box, Grid, Paper, Typography, Skeleton } from '@mui/material';

export default function Dashboard() {
   const [categories, setCategories] = useState([]);
   const [selectedCategories, setSelectedCategories] = useState([]);

   useEffect(() => {
      document.title = 'Dashboard';
      fetchCategories();
   }, []);

   const fetchCategories = async () => {
      try {
         const response = await api.getCategories();
         setCategories(response.data.map((category) => category));
      } catch (error) {
         console.error('Error fetching categories:', error);
      }
   };

   return (
      <>
         <Typography component='h1' variant='h4' sx={{ fontWeight: 'bold' }}>
            Dashboard
         </Typography>
         <Divider />
         <FilterBar categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
         <DashboardCards selectedCategories={selectedCategories} />
         <Divider />
         <PublicServicesCard />
      </>
   );
}

const FilterBar = ({ categories, selectedCategories, setSelectedCategories }) => {
   const handleSelectCategory = useCallback((category) => {
      setSelectedCategories((prevCategories) =>
         prevCategories.includes(category) ? prevCategories.filter((c) => c !== category) : [...prevCategories, category]
      );
   }, []);

   const handleDeselectCategory = useCallback((category) => {
      setSelectedCategories((prevCategories) => prevCategories.filter((c) => c !== category));
   }, []);

   const isSelected = useCallback(
      (category) => {
         return selectedCategories.includes(category);
      },
      [selectedCategories]
   );

   return (
      <Stack
         sx={{
            pt: 2,
            pr: 2,
            pb: 2,
            pl: 0,
            mb: 2,
            flexWrap: 'wrap'
         }}
         direction='row'
         spacing={1.5}
         useFlexGap
      >
         <Chip
            label='All categories'
            onClick={() => setSelectedCategories([])}
            color={selectedCategories.length === 0 ? 'primary' : 'default'}
            variant={selectedCategories.length === 0 ? 'filled' : 'outlined'}
         />
         {categories.map((category) => (
            <Category
               key={category.id}
               category={category}
               handleSelectCategory={handleSelectCategory}
               isSelected={isSelected}
               handleDeselectCategory={handleDeselectCategory}
            />
         ))}
      </Stack>
   );
};

const Category = ({ category, handleSelectCategory, handleDeselectCategory, isSelected }) => {
   const selected = isSelected(category);

   return (
      <Chip
         label={category.name}
         onClick={() => handleSelectCategory(category)}
         onDelete={selected ? () => handleDeselectCategory(category) : undefined}
         deleteIcon={selected ? <CancelIcon /> : undefined}
         color={selected ? 'primary' : 'default'}
         variant='outlined'
      />
   );
};

const DashboardCard = ({ bgColor, title, subtitle }) => (
   <Grid item xs={12} sm={6} md={3}>
      <Paper
         sx={{
            padding: 2,
            backgroundColor: bgColor,
            minHeight: '100px',
            minWidth: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
         }}
      >
         <Typography variant='h5' component='div' sx={{ fontWeight: 'bold' }}>
            {title}
         </Typography>
         <Typography variant='body2' color='textSecondary' sx={{ fontWeight: 'bold', fontSize: 16 }}>
            {subtitle}
         </Typography>
      </Paper>
   </Grid>
);

const DashboardCardSkeleton = ({ bgColor }) => {
   const lighterBgColor = lighten(bgColor, 0.15);

   return (
      <Grid item xs={12} sm={6} md={3}>
         <Paper
            sx={{
               padding: 2,
               minHeight: '100px',
               minWidth: '150px',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'space-between',
               backgroundColor: lighterBgColor
            }}
         >
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='40%' />
            <Skeleton variant='text' sx={{ fontSize: '0.875rem' }} width='60%' />
         </Paper>
      </Grid>
   );
};

const DashboardCards = ({ selectedCategories }) => {
   const theme = useTheme();
   const [publishedIssuesCount, setPublishedIssuesCount] = useState(0);
   const [resolvedIssuesCount, setResolvedIssuesCount] = useState(0);
   const [solvingIssuesCount, setSolvingIssuesCount] = useState(0);
   const [avgTimeToResolve, setAvgTimeToResolve] = useState(0);
   const [publishedInTheLastWeek, setPublishedInTheLastWeek] = useState(0);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      fetchDashboardData();
   }, [selectedCategories]);

   function formatTime(seconds) {
      const secondsPerMinute = 60;
      const secondsPerHour = 3600;
      const secondsPerDay = 86400;

      const days = Math.floor(seconds / secondsPerDay);
      const hours = Math.floor((seconds % secondsPerDay) / secondsPerHour);
      const minutes = Math.floor((seconds % secondsPerHour) / secondsPerMinute);
      const remainingSeconds = seconds % secondsPerMinute;

      let timeString = '';

      if (days > 0) {
         timeString += `${days} day${days > 1 ? 's' : ''} `;
      }

      if (hours > 0 || days > 0) {
         timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
      }

      if (minutes > 0 || hours > 0 || days > 0) {
         timeString += `${minutes} minute${minutes > 1 ? 's' : ''} `;
      }

      if (timeString === '') {
         // If less than a minute, display seconds
         timeString = `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`;
      }

      return timeString.trim();
   }

   const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
         const categoryIds = selectedCategories.map((cat) => cat.id);
         console.log(categoryIds.toString());
         const publishedIssuesCount = await api.getPublishedIssuesCount(categoryIds);
         setPublishedIssuesCount(publishedIssuesCount.data.count);

         const resolvedIssuesResponse = await api.getResolvedIssuesCount(categoryIds);
         setResolvedIssuesCount(resolvedIssuesResponse.data.count);

         const solvingIssuesResponse = await api.getSolvingIssuesCount(categoryIds);
         setSolvingIssuesCount(solvingIssuesResponse.data.count);

         const avgTimeToResolveResponse = await api.getAverageTimeToResolveIssues(categoryIds);
         setAvgTimeToResolve(avgTimeToResolveResponse.data.avgTime);

         const publishedInTheLastWeekResponse = await api.getPublishedIssuesInTheLastWeek(categoryIds);
         setPublishedInTheLastWeek(publishedInTheLastWeekResponse.data.count);
      } catch (error) {
         console.error('Error fetching dashboard data:', error);
      } finally {
         setIsLoading(false);
      }
   };

   if (isLoading) {
      return (
         <Box sx={{ pt: 0, pr: 2, pb: 2, pl: 0, mb: 2, flexWrap: 'wrap', flexGrow: 1 }}>
            <Grid container spacing={3}>
               <DashboardCardSkeleton bgColor={theme.palette.issuesCategories.published} />
               <DashboardCardSkeleton bgColor={theme.palette.issuesCategories.resolved} />
               <DashboardCardSkeleton bgColor={theme.palette.issuesCategories.solving} />
               <DashboardCardSkeleton bgColor={'#4caf50'} />
               <DashboardCardSkeleton bgColor={'#9575cd'} />
            </Grid>
         </Box>
      );
   }

   return (
      <Box
         sx={{
            pt: 0,
            pr: 2,
            pb: 2,
            pl: 0,
            mb: 2,
            flexWrap: 'wrap',
            flexGrow: 1
         }}
      >
         <Grid container spacing={3}>
            <DashboardCard bgColor={theme.palette.issuesCategories.published} title={publishedIssuesCount} subtitle='Published' />
            <DashboardCard bgColor={theme.palette.issuesCategories.resolved} title={resolvedIssuesCount} subtitle='Resolved' />
            <DashboardCard bgColor={theme.palette.issuesCategories.solving} title={solvingIssuesCount} subtitle='Solving' />
            <DashboardCard bgColor='#4caf50' title={formatTime(avgTimeToResolve)} subtitle='AVG time to resolve' />
            <DashboardCard bgColor='#9575cd' title={publishedInTheLastWeek} subtitle='Published in the last week' />
         </Grid>
      </Box>
   );
};

const PublicServicesCard = () => {
   const navigate = useNavigate();
   const [publicServicesCount, setPublicServicesCount] = useState(0);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      fetchPublicServicesCount();
   }, []);

   const fetchPublicServicesCount = async () => {
      try {
         const publicServicesCountResponse = await api.getServicesCount();
         setPublicServicesCount(publicServicesCountResponse.data.count);
      } catch (error) {
         console.error('Error fetching public services count: ' + error);
      } finally {
         setIsLoading(false);
      }
   };

   return isLoading ? (
      <LinearProgress />
   ) : (
      <Box
         sx={{
            pt: 4,
            pr: 2,
            pb: 2,
            pl: 0,
            mb: 2,
            flexWrap: 'wrap'
         }}
      >
         <Paper
            sx={{
               padding: 2,
               display: 'flex',
               flexDirection: 'column',
               height: '100px',
               width: '200px',
               cursor: 'pointer'
            }}
            elevation={2}
            onClick={() => navigate('../services')}
         >
            <Typography variant='h5' component='div' sx={{ fontWeight: 'bold' }}>
               {publicServicesCount}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
               Public Services
            </Typography>
         </Paper>
      </Box>
   );
};
