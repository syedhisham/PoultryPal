import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { AxiosRequest } from '../../../AxiosRequest/AxiosRequest';
import { motion } from 'framer-motion';
import '@fontsource/poppins'; 
import { useSelector } from 'react-redux';
import { selectToken } from '../../../redux/tokenSlice';
import { useNavigate } from 'react-router-dom';
import { selectRole } from '../../../redux/roleSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const CreateAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [targetAudience, setTargetAudience] = useState('');
  const [recipients, setRecipients] = useState([]); // Changed to array to support multiple recipients if needed
  const [scheduledFor, setScheduledFor] = useState('');
  const [employees, setEmployees] = useState([]); // State to store fetched employees
  const [selectedEmployee, setSelectedEmployee] = useState([]); // State to track selected employee
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const role = useSelector(selectRole);
  const isAdmin = role === 'Admin';
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/home');
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
            variant="contained"
            onClick={handleHome}
            className="max-w-md bg-black shadow-none hover:shadow-black hover:shadow-md"
          >
            Go To Home
          </Button>
        </Card>
      </div>
    );
  }

  useEffect(() => {
    // Fetch employees when target audience is 'individuals'
    const fetchEmployees = async () => {
      if (targetAudience === 'individuals') {
        try {
          const response = await AxiosRequest.get('/api/employee/getAllEmployees', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setEmployees(response.data); // Store fetched employees in state
          setSelectedEmployee([]); // Reset selected employee when fetching new data
        } catch (err) {
          toast.error(err.response.data.message || 'Failed to fetch employees.');
        }
      }
    };

    fetchEmployees();
  }, [targetAudience, token]); // Run when targetAudience changes

  const handleEmployeeChange = (event) => {
    const { value } = event.target; // Access selected values
    setSelectedEmployee(value); // Set selected employees
    setRecipients(value); // Set recipients to selected employees IDs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    attachments.forEach((file) => {
      formData.append('attachments', file); // Append each file
    });
    formData.append('targetAudience', targetAudience);
    formData.append('recipients', JSON.stringify(recipients));
    formData.append('scheduledFor', scheduledFor);

    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    } 

    try {
      const response = await AxiosRequest.post('/api/announcements/createAnnouncement', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set the content type for file uploads
        },
      });

      toast.success(response.data.message);
      setTitle('');
      setContent('');
      setAttachments([]);
      setTargetAudience('');
      setRecipients([]);
      setScheduledFor('');
      setSelectedEmployee([]);
    } catch (err) {
        console.error(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-[#f0ebe4] font-poppins">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="p-4 max-w-md w-screen"
      >
        <Card className="p-8 md:-ml-40 lg:-ml-40 max-w-3xl md:w-[70rem] lg:w-[70rem] xl:w-[70rem] shadow-lg shadow-black rounded-lg bg-white transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
          <Typography variant="h4" className="mb-6 text-black">Create Announcement</Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                label="Title"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <Input
                label="Content"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
  <Input
    label="Attachments"
    type="file"
    color="black"
    className="focus:!ring-0"
    inputProps={{ multiple: true }} // Allow multiple file selection
    onChange={(e) => {
      const files = Array.from(e.target.files);
      setAttachments(files);
      console.log('Files Selected',files); 
    }}
  />
</div>

            <div className="mb-6">
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="target-audience-label" sx={{ color: 'black' }}>Target Audience</InputLabel>
                <Select
                  labelId="target-audience-label"
                  value={targetAudience}
                  onChange={(event) => {
                    setTargetAudience(event.target.value);
                    setRecipients([]); // Reset recipients when target audience changes
                  }}
                  label="Target Audience"
                  required
                  sx={{
                    bgcolor: 'white',
                    borderRadius: '4px',
                    '& .MuiSelect-select': {
                      padding: '10px', // Adjust padding if needed
                    },
                    '&:focus': {
                      borderColor: 'teal', // Change focus border color
                      boxShadow: '0 0 0 2px rgba(0, 128, 128, 0.5)', // Adjust focus ring
                    },
                  }}
                >
                  <MenuItem className="text-black" value="individuals">Individuals</MenuItem>
                  <MenuItem className="text-black" value="all">All</MenuItem>
                </Select>
              </FormControl>
            </div>
            {targetAudience === 'individuals' && (
              <div className="mb-6">
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="employee-select-label" sx={{ color: 'black' }}>
                    Select Employees
                  </InputLabel>
                  <Select
                    labelId="employee-select-label"
                    multiple
                    value={selectedEmployee}
                    onChange={handleEmployeeChange}
                    label="Select Employees"
                    required
                    sx={{
                      bgcolor: 'white',
                      borderRadius: '4px',
                      '& .MuiSelect-select': {
                        padding: '10px',
                      },
                      '&:focus': {
                        borderColor: 'teal',
                        boxShadow: '0 0 0 2px rgba(0, 128, 128, 0.5)',
                      },
                    }}
                  >
                    {employees.map((emp) => (
                      <MenuItem key={emp._id} value={String(emp._id)}>
                        {`${emp.firstName} ${emp.lastName}`} - {emp.email}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
            <div className="mb-6">
  <Input
    label="Scheduled For"
    type="datetime-local" // Change the type to datetime-local
    color="black"
    className="focus:!ring-0"
    value={scheduledFor}
    onChange={(e) => setScheduledFor(e.target.value)}
  />

            </div>
            <Button 
              type="submit" 
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              Create Announcement
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateAnnouncement;
