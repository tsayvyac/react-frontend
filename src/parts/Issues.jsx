import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import { Tab, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Tabs } from '@mui/material'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'

const dummyData = [
    { title: 'Issue 1', category: 'Reserved', address: '123 Street', status: 'Resolved', date: '2023-01-01' },
    { title: 'Issue 2', category: 'Resolved', address: '123 Street', status: 'Solving', date: '2023-01-01' },
    { title: 'Issue 3', category: 'Solving', address: '123 Street', status: 'Solving', date: '2023-01-01' },
    { title: 'Issue 4', category: 'Published', address: '123 Street', status: 'Published', date: '2023-01-01' },
    { title: 'Issue 5', category: 'Reserved', address: '456 Avenue', status: 'Resolved', date: '2023-02-15' },
    { title: 'Issue 6', category: 'Resolved', address: '789 Boulevard', status: 'Reserved', date: '2023-02-16' },
    { title: 'Issue 7', category: 'Solving', address: '101 Main Street', status: 'Resolved', date: '2023-02-17' },
    { title: 'Issue 8', category: 'Published', address: '222 Park Lane', status: 'Published', date: '2023-02-18' },
    { title: 'Issue 9', category: 'Reserved', address: '333 Central Avenue', status: 'Solving', date: '2023-02-19' },
    { title: 'Issue 10', category: 'Resolved', address: '444 Elm Street', status: 'Resolved', date: '2023-02-20' },
    { title: 'Issue 11', category: 'Solving', address: '123 Street', status: 'Resolved', date: '2023-01-01' },
    { title: 'Issue 12', category: 'Published', address: '123 Street', status: 'Reserved', date: '2023-01-01' },
    { title: 'Issue 13', category: 'Reserved', address: '123 Street', status: 'Solving', date: '2023-01-01' },
    { title: 'Issue 14', category: 'Published', address: '123 Street', status: 'Published', date: '2023-01-01' },
    { title: 'Issue 15', category: 'Resolved', address: '456 Avenue', status: 'Resolved', date: '2023-02-15' },
    { title: 'Issue 16', category: 'Solving', address: '789 Boulevard', status: 'Published', date: '2023-02-16' },
    { title: 'Issue 17', category: 'Published', address: '101 Main Street', status: 'Reserved', date: '2023-02-17' },
    { title: 'Issue 18', category: 'Solving', address: '222 Park Lane', status: 'Solving', date: '2023-02-18' },
    { title: 'Issue 19', category: 'Resolved', address: '333 Central Avenue', status: 'Published', date: '2023-02-19' },
    { title: 'Issue 20', category: 'Reserved', address: '444 Elm Street', status: 'Reserved', date: '2023-02-20' }
]

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
}

export default function Issues() {
    useEffect(() => {
        document.title = 'Issues'
    }, [])
    const theme = useTheme()
    const [value, setValue] = useState(0)
    const [filter, setFilter] = useState({
        title: '',
        fromDate: '',
        toDate: '',
        status: 'All'
    })

    const handleFilterChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.value })
    }

    return (
        <>
            <Typography component='h1' variant='h4' sx={{ fontWeight: 'bold' }}>
                Issues
            </Typography>
            <Divider />
            <Container disableGutters sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3} sx={{ flexDirection: 'column', marginLeft: '5px' }}>
                    <IssuesCategories value={value} setFilter={setFilter} setValue={setValue} filter={filter} />
                    <IssuesFilter handleFilterChange={handleFilterChange} />
                    <IssuesTable filter={filter} issueStatusColors={theme.palette.issuesCategories} dummyData={dummyData} />
                </Grid>
            </Container>
        </>
    )
}

const IssuesCategories = (props) => {
    const handleCategoryChange = (event, newValue) => {
        const statusTypes = ['All', 'Published', 'Reserved', 'Solving', 'Resolved']
        props.setFilter({ ...props.filter, status: statusTypes[newValue] })
        props.setValue(newValue)
    }

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flexDirection: 'column' }}>
            <Tabs value={props.value} onChange={handleCategoryChange} aria-label='basic tabs example'>
                <Tab label='All' />
                <Tab label='Published' />
                <Tab label='Reserved' />
                <Tab label='Solving' />
                <Tab label='Resolved' />
            </Tabs>
        </Box>
    )
}
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
)

const filterData = (data, filter) => {
    return data.filter((item) => {
        if (filter.title && !item.title.toLowerCase().includes(filter.title.toLowerCase())) {
            return false
        }

        // Filter by date range
        const itemDate = new Date(item.date)
        const fromDate = filter.fromDate ? new Date(filter.fromDate) : null
        const toDate = filter.toDate ? new Date(filter.toDate) : null

        if (fromDate && itemDate < fromDate) {
            return false
        }
        if (toDate && itemDate > toDate) {
            return false
        }

        return !(filter.status !== 'All' && item.status !== filter.status)
    })
}

const IssuesTable = (props) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    // If face performance issues we should move this function outside of this React component
    // This way, the function won't be redefined on every render of the component, which can be beneficial for performance.

    const visibleRows = useMemo(
        () => filterData(dummyData, props.filter).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [page, rowsPerPage, props.filter]
    )

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const getStatusBarStyle = (status) => {
        let backgroundColor

        switch (status) {
            case 'Resolved':
                backgroundColor = props.issueStatusColors.resolved
                break
            case 'Solving':
                backgroundColor = props.issueStatusColors.solving
                break
            case 'Reserved':
                backgroundColor = props.issueStatusColors.reserved
                break
            case 'Published':
                backgroundColor = props.issueStatusColors.published
                break
            default:
                backgroundColor = props.issueStatusColors.default
                break
        }

        return {
            borderRadius: '19px',
            backgroundColor: backgroundColor,
            padding: '5px 20px',
            display: 'inline-block'
        }
    }

    const populateTable = () => {
        return (
            <>
                {visibleRows.map((row, index) => (
                    <TableRow
                        key={index} // Using index as a key
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component='th' scope='row'>
                            {row?.title} {/* Safely accessing title */}
                        </TableCell>
                        <TableCell align='left'>{row.category}</TableCell>
                        <TableCell align='left'>{row.address}</TableCell>
                        <TableCell align='left'>
                            <div style={getStatusBarStyle(row.status)}>{row.status}</div>
                        </TableCell>
                        <TableCell align='left'>{row.date}</TableCell>
                    </TableRow>
                ))}
            </>
        )
    }
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
                count={filterData(dummyData, props.filter).length}
                component='div'
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 20, 50]}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}
