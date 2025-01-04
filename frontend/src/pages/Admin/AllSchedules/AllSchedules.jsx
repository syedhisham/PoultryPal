import React, { useEffect, useState } from 'react';
import { AxiosRequest } from '../../../AxiosRequest/AxiosRequest';
import {
    Button,
    Input,
    Textarea,
    Card,
    Typography,
    IconButton,
} from '@material-tailwind/react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../redux/tokenSlice';
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { selectRole } from '../../../redux/roleSlice';
import { useNavigate } from 'react-router-dom';

const AllSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [weekRecords, setWeekRecords] = useState([]);
    const storedToken = localStorage.getItem('token');
    const token = useSelector(selectToken) || storedToken;
    const role = useSelector(selectRole);
    const isAdmin= role === 'Admin';
    const navigate = useNavigate();
  
  
  const handleHome = () => {
      navigate('/home')
  };
  
  if (!isAdmin) {
      return (
          <div className="flex text-center items-center justify-center min-h-screen bg-[#f0ebe4] font-poppins">
              <Card className="p-8 items-center shadow-lg rounded-lg bg-white">
                  <Typography variant="h4" className="mb-6 text-black">Insufficient Privileges</Typography>
                  <Typography variant="body1" className="text-gray-600 mb-4">
                      You do not have the required permissions to access this page. Please contact the administrator if you believe this is an error.
                  </Typography>
                  <Button
                      variant="contained" // Consider using 'contained' instead of 'filled'
                      onClick={handleHome}
                      className="max-w-md bg-black shadow-none hover:shadow-black hover:shadow-md"
                  >
                      Go To Home
                  </Button>
              </Card>
          </div>
      );
  }

    // Fetch all schedules on component mount
        const fetchSchedules = async () => {
            try {
                const response = await AxiosRequest.get('/api/schedule/getEmployeeSchedules', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSchedules(response.data);
            } catch (error) {
                console.error('Error fetching schedules:', error);
                toast.error(error.response.data.message);
            }
        };
        useEffect(() => {
        fetchSchedules();
    }, [token]);

    // Open dialog to update selected schedule
    const handleUpdateClick = (schedule, record) => {
        setSelectedSchedule(schedule);
        setWeekRecords([record]); // Get only the selected record to edit
        setOpenDialog(true);
    };

    const handleDeleteDate = async (scheduleId, date) => {
        try {
            const response = await AxiosRequest.delete(`/api/schedule/deleteSchedule/${scheduleId}`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { date }
            });
            toast.success(response.data.message);
            fetchSchedules(); // Refresh schedules after deletion
        } catch (error) {
            console.error('Error deleting date:', error);
            toast.error(error.response.data.message);
        }
    };

    // Handle week record changes
    const handleWeekRecordChange = (index, field, value) => {
        setWeekRecords((prevRecords) => {
            const updatedRecords = prevRecords.map((record, i) => {
                if (i === index) {
                    if (field === 'date') {
                        return { ...record, date: value };
                    } else {
                        const currentDate = new Date(record.date);
                        const [hours, minutes] = value.split(':');
                        const timeValue = new Date(currentDate.setHours(hours, minutes, 0)).toISOString();

                        return {
                            ...record,
                            [field]: timeValue,
                        };
                    }
                }
                return record;
            });
            return updatedRecords;
        });
    };

    // Handle task changes
    const handleTaskChange = (recordIndex, taskIndex, field, value) => {
        setWeekRecords((prevRecords) => {
            const updatedRecords = prevRecords.map((record, i) => {
                if (i === recordIndex) {
                    const updatedTasks = record.tasks.map((task, j) => {
                        if (j === taskIndex) {
                            return { ...task, [field]: value };
                        }
                        return task;
                    });
                    return { ...record, tasks: updatedTasks };
                }
                return record;
            });
            return updatedRecords;
        });
    };

    // Submit updated schedule
    const handleSubmitUpdate = async () => {
        if (!selectedSchedule) return;

        try {
            const updatedData = { weekRecords };

            const response = await AxiosRequest.put(`/api/schedule/updateSchedule/${selectedSchedule._id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success(response.data.message);
            setOpenDialog(false); // Close dialog after update
            fetchSchedules();
        } catch (error) {
            console.error('Error updating schedule:', error);
            toast.error(error.response.data.message);
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0ebe4] font-poppins">
            <Typography variant="h4" className="mb-6 text-black">
                Employee Schedules
            </Typography>
            <div className="max-w-2xl w-full">
                {schedules.map((schedule) => (
                    <Card key={schedule._id} className="p-4 mb-4">
                        <Typography variant="h5" className="mb-2 text-center">
                            Schedule for {schedule.employee.firstName} {schedule.employee.lastName}
                        </Typography>
                        {schedule.weekRecords.map((record, index) => (
                            <div key={index} className="mb-2">
                                <Typography variant="body2">
                                    Date: {new Date(record.date).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2">
                                    Shift Start: {new Date(record.shiftStart).toLocaleString()}
                                </Typography>
                                <Typography variant="body2">
                                    Shift End: {new Date(record.shiftEnd).toLocaleString()}
                                </Typography>
                                <div className='flex items-center justify-between'>
                                <IconButton
                                color="white"
                                 size="md"
                                  onClick={() => handleUpdateClick(schedule, record)}
                                  className="hover:bg-black shadow-black rounded-full"
                                  >
                                    <FaEdit  color="blue">
                                        Update
                                    </FaEdit>
                                    </IconButton>
                                    <IconButton
                                color="white"
                                 size="md"
                                 onClick={() => handleDeleteDate(schedule._id, record.date)}
                                  className="hover:bg-black shadow-black rounded-full"
                                  >
                                    <FaTrash
                                        
                                        className="text-red-500 cursor-pointer"
                                        title="Delete Date"
                                    />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </Card>
                ))}
            </div>

            {/* Update Schedule Dialog */}
            <div
                className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${
                    openDialog ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
                    <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
                        <FaTimes className="text-black text-xl" />
                    </div>
                    <div className='flex flex-col items-center justify-center text-center'>
                        <Typography variant="h5" className="mb-4">
                            Update Schedule
                        </Typography>
                        <div className="overflow-y-auto max-h-[60vh] w-full">
                            {weekRecords.map((record, index) => (
                                <div key={index} className="flex flex-col mb-4 mt-2 gap-4">
                                    <Input
                                        type="date"
                                        label="Date"
                                        color='black'
                                        value={record.date ? record.date.slice(0, 10) : ''}
                                        onChange={(e) => handleWeekRecordChange(index, 'date', e.target.value)}
                                        className="focus:!ring-0"
                                    />
                                    <Input
                                        type="time"
                                        label="Shift Start"
                                        color='black'
                                        value={record.shiftStart ? new Date(record.shiftStart).toTimeString().slice(0, 5) : ''}
                                        onChange={(e) => handleWeekRecordChange(index, 'shiftStart', e.target.value)}
                                        className="focus:!ring-0"
                                    />
                                    <Input
                                        type="time"
                                        label="Shift End"
                                        color='black'
                                        value={record.shiftEnd ? new Date(record.shiftEnd).toTimeString().slice(0, 5) : ''}
                                        onChange={(e) => handleWeekRecordChange(index, 'shiftEnd', e.target.value)}
                                        className="focus:!ring-0"
                                    />
                                    {record.tasks.map((task, taskIndex) => (
                                        <div key={taskIndex} className="mb-2">
                                            <Textarea
                                                label="Task Description"
                                                value={task.description}
                                                onChange={(e) => handleTaskChange(index, taskIndex, 'description', e.target.value)}
                                                className="focus:!ring-0"
                                            />
                                            <Input
                                                type="number"
                                                label="Task Duration (minutes)"
                                                color='black'
                                                value={task.duration}
                                                onChange={(e) => handleTaskChange(index, taskIndex, 'duration', e.target.value)}
                                                className="focus:!ring-0"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between w-full mt-4">
                            <Button onClick={handleSubmitUpdate} color="green">
                                Update Schedule
                            </Button>
                            <Button onClick={handleDialogClose} color="red">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllSchedules;
