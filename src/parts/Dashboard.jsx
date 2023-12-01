import * as React from 'react';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Chip, Paper, Stack} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import {useCallback, useState} from "react";

export default function Dashboard(props) {
    return (
        <React.Fragment>
            <Typography
                component="h1"
                variant="h4"
                sx={{fontWeight: 'bold'}}
            >
                Dashboard
            </Typography>
            <Divider/>
            <FilterBar/>
            <DashboardCards/>
            <Divider/>
            <PublicServicesCard count={33} setContent={props.setContent}/>
        </React.Fragment>
    );
}

const categories = [
    'All categories', 'Road Traffic', 'Beautification and sanitation',
    'Buildings and structures', 'Public safety', 'Communication',
    'Ecological', 'Housing', 'Public places'
];

const FilterBar = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSelectCategory = useCallback((category) => {
        setSelectedCategories(prevCategories => (
            prevCategories.includes(category)
                ? prevCategories.filter(c => c !== category)
                : [...prevCategories, category]
        ));
    }, []);

    const handleDeselectCategory = useCallback((category) => {
        setSelectedCategories(prevCategories => prevCategories.filter(c => c !== category));
    }, []);

    const isSelected = useCallback((category) => {
        return selectedCategories.includes(category);
    }, [selectedCategories]);

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
            direction="row"
            spacing={1.5}
            useFlexGap
        >
            <Chip
                label="All categories"
                onClick={() => setSelectedCategories([])}
                color={selectedCategories.length === 0 ? 'primary' : 'default'}
                variant={selectedCategories.length === 0 ? 'filled' : 'outlined'}
            />
            {categories.map((category) => (
                <Category
                    key={category}
                    category={category}
                    handleSelectCategory={handleSelectCategory}
                    isSelected={isSelected}
                    handleDeselectCategory={handleDeselectCategory}
                />
            ))}
        </Stack>
    );
};

const Category = ({category, handleSelectCategory, handleDeselectCategory, isSelected}) => {
    const selected = isSelected(category);

    return (
        <Chip
            label={category}
            onClick={() => handleSelectCategory(category)}
            onDelete={selected ? () => handleDeselectCategory(category) : undefined}
            deleteIcon={selected ? <CancelIcon/> : undefined}
            color={selected ? 'primary' : 'default'}
            variant="outlined"
        />
    );
};


const DashboardCard = ({bgColor, title, subtitle}) => (
    <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{
            padding: 2,
            backgroundColor: bgColor,
            minHeight: '100px',
            minWidth: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <Typography variant="h5" component="div" sx={{fontWeight: 'bold'}}>
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{fontWeight: 'bold', fontSize: 16}}>
                {subtitle}
            </Typography>
        </Paper>
    </Grid>
)

const DashboardCards = () => (
    <Box sx={{
        pt: 0,
        pr: 2,
        pb: 2,
        pl: 0,
        mb: 2,
        flexWrap: 'wrap',
        flexGrow: 1
    }}>
        <Grid container spacing={3}>
            <DashboardCard bgColor="#fce571" title="654" subtitle="Published"/>
            <DashboardCard bgColor="#4caf50" title="123" subtitle="Resolved"/>
            <DashboardCard bgColor="#00bcd4" title="365" subtitle="Solving"/>
            <DashboardCard bgColor="#4caf50" title="5d 1h" subtitle="AVG time to resolve"/>
            <DashboardCard bgColor="#9575cd" title="5" subtitle="Published in the last week"/>
        </Grid>
    </Box>
)

const PublicServicesCard = ({count, setContent}) => (
    <Box sx={{
        pt: 4,
        pr: 2,
        pb: 2,
        pl: 0,
        mb: 2,
        flexWrap: 'wrap'
    }}>
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
            onClick={() => setContent('Services')}
        >
            <Typography variant="h5" component="div" sx={{fontWeight: 'bold'}}>
                {count}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Public Services
            </Typography>
        </Paper>
    </Box>
);