import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar, Spinner, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import { AxiosRequest } from '../../../../AxiosRequest/AxiosRequest';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { useSelector } from 'react-redux';
import { FaTimes} from 'react-icons/fa';
import { selectToken } from '../../../../redux/tokenSlice';
import { selectRole } from '../../../../redux/roleSlice';
import { useNavigate } from 'react-router-dom';

const AllCustomers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await AxiosRequest.get('/api/user/getAllCustomers', config);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.msg || err.response.data.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await AxiosRequest.delete(`/api/user/${userId}`, config);
      setUsers(users.filter(user => user._id !== userId));
      toast.success('Customer deleted successfully');
    } catch (err) {
      toast.error(err.response.data.msg || err.response.data.message);
    }
  };

  const handleUpdateUser = (userId) => {
    const user = users.find(user => user._id === userId);
    setSelectedUserId(userId);
    setNewFirstName(user.firstName);
    setNewLastName(user.lastName);
    setNewEmail(user.email);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedUserId(null);
    setNewFirstName('');
    setNewLastName('');
    setNewEmail('');
  };

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await AxiosRequest.put(`/api/user/update/${selectedUserId}`, {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
      }, config);

      // Update the user in the state
      setUsers(users.map(user => user._id === selectedUserId ? { ...user, firstName: newFirstName, lastName: newLastName, email: newEmail } : user));

      toast.success('Customer updated successfully');
      handleDialogClose();
    } catch (err) {
      toast.error(err.response.data.msg || err.response.data.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f0ebe4] font-poppins">
        <Spinner color='white' className="h-12 w-12 text-black" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0ebe4] py-10 font-poppins">
      <div className="container mx-auto px-4">
        <Typography variant="h3" className="text-black mb-8 text-center">
          All Customers
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map(user => (
            <motion.div 
              key={user._id} 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 flex flex-col gap-1 items-center text-center bg-white shadow-lg shadow-black rounded-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
                <Avatar src={user.image} alt={`${user.firstName} ${user.lastName}`} size="lg" />
                <Typography variant="h5" className="text-black">{`${user.firstName} ${user.lastName}`}</Typography>
                <Typography variant="subtitle1" className="text-gray-600">{user.email}</Typography>
                <Typography variant="subtitle2" className="text-gray-500">{user.role}</Typography>
                <Button className="w-full bg-red-500 mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleDelete(user._id)}>
                  Delete
                </Button>
                <Button className="w-full bg-black mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleUpdateUser(user._id)}>
                  Update
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${
          dialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
          <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
            <FaTimes className="text-black text-xl" />
          </div>
          <div className='flex flex-col items-center justify-center text-center'>
            <DialogHeader>Update User</DialogHeader>
            <DialogBody>
              <div className="mb-6">
                <Input
                  label="New First Name"
                  type='text'
                  color="black"
                  className="focus:!ring-0"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <Input
                  label="New Last Name"
                  type='text'
                  color="black"
                  className="focus:!ring-0"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <Input
                  label="New Email"
                  type='text'
                  color="black"
                  className="focus:!ring-0"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
            </DialogBody>
            <DialogFooter>
              <Button variant="filled" className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800" onClick={handleUpdateUserSubmit}>
                Update
              </Button>
            </DialogFooter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCustomers;
