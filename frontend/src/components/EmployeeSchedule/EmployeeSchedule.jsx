// import React, { useEffect, useState } from 'react';
// import { AxiosRequest } from '../../AxiosRequest/AxiosRequest';
// import { useSelector } from 'react-redux';
// import { selectToken } from '../../redux/tokenSlice';
// import {
//     Container,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     CircularProgress,
//     Box,
// } from '@mui/material';

// const EmployeeSchedule = ({ employeeId }) => {
//     const [schedule, setSchedule] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const storedToken = localStorage.getItem('token');
//     const token = useSelector(selectToken) || storedToken;

//     useEffect(() => {
//         const fetchSchedule = async () => {
//             try {
//                 const response = await AxiosRequest.get(`/api/schedule/employee-specific-schedule`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setSchedule(response.data);
//             } catch (err) {
//                 setError(err.response ? err.response.data.message : 'Failed to fetch schedule.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSchedule();
//     }, [employeeId]);

//     if (loading) return <CircularProgress />;
//     if (error) return <Typography color="error">{error}</Typography>;

//     return (
//         <Container>
//             <div className='flex  flex-col mt-4'>
//             <Typography variant="h4" gutterBottom className='text-center'>
//                 Schedule for {schedule.employee.firstName} {schedule.employee.lastName}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom className='text-center'>
//                 Created by: {schedule.createdBy.email}
//             </Typography>
//             </div>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Date</TableCell>
//                             <TableCell>Shift Start</TableCell>
//                             <TableCell>Shift End</TableCell>
//                             <TableCell>Tasks</TableCell>
//                             <TableCell>Status</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {schedule.weekRecords.map((record, index) => (
//                             <TableRow key={index}>
//                                 <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
//                                 <TableCell>
//                                     {new Date(record.shiftStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                 </TableCell>
//                                 <TableCell>
//                                     {new Date(record.shiftEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                 </TableCell>
//                                 <TableCell>
//                                     {record.tasks.map((task, idx) => {
//                                         const hours = Math.floor(task.duration / 60);
//                                         const minutes = task.duration % 60;
//                                         return (
//                                             <Box key={idx}>
//                                                 {task.description} (Duration: {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''} {minutes > 0 ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : ''})
//                                             </Box>
//                                         );
//                                     })}
//                                 </TableCell>
//                                 <TableCell>{record.status}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Container>
//     );
// };

// export default EmployeeSchedule;


import React, { useEffect, useState } from 'react';
import { AxiosRequest } from '../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/tokenSlice';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Box,
} from '@mui/material';

const EmployeeSchedule = ({ employeeId }) => {
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const storedToken = localStorage.getItem('token');
    const token = useSelector(selectToken) || storedToken;

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await AxiosRequest.get(`/api/schedule/employee-specific-schedule`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSchedule(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch schedule.');
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [employeeId]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container>
            <div className='flex flex-col mt-4'>
                <Typography variant="h4" gutterBottom className='text-center'>
                    Schedule for {schedule.employee.firstName} {schedule.employee.lastName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom className='text-center'>
                    Created by: {`${schedule.createdBy.firstName} ${schedule.createdBy.lastName} (${schedule.createdBy.email})`}
                </Typography>
            </div>
            {/* Box around the schedule */}
            <Box
                sx={{
                    border: '1px solid #ccc', // Light grey border
                    borderRadius: '8px', // Rounded corners
                    padding: '16px', // Inner padding
                    boxShadow: 2, // Subtle shadow effect
                    marginTop: '16px', // Margin above the box
                }}
            >
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Shift Start</TableCell>
                                <TableCell>Shift End</TableCell>
                                <TableCell>Tasks</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schedule.weekRecords.map((record, index) => (
                                <TableRow key={index}>
                                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        {new Date(record.shiftStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(record.shiftEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </TableCell>
                                    <TableCell>
                                        {record.tasks.map((task, idx) => {
                                            const hours = Math.floor(task.duration / 60);
                                            const minutes = task.duration % 60;
                                            return (
                                                <Box key={idx}>
                                                    {task.description} (Duration: {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''} {minutes > 0 ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : ''})
                                                </Box>
                                            );
                                        })}
                                    </TableCell>
                                    <TableCell>{record.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default EmployeeSchedule;
