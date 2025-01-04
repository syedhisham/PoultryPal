import React, { useState, useEffect, useCallback } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import {AxiosRequest} from '../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Button, Spinner, Avatar, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import logo from "../assets/logo3.png";
import { selectToken } from '../redux/tokenSlice';
import AdminHeader from '../components/AdminHeader/AdminHeader';

Modal.setAppElement('#root'); // This is important for accessibility

const ProtectedLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const fetchUser = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await AxiosRequest.get('/api/user/getUserById', config);
      const userData = response.data;

      setUser(userData);
      setUserRole(userData.role);
      console.log('User:', userData);
      console.log('User Role:', userData.role);
      console.log(userData.role === 'Admin');

      const rolesWithAccess = [
        'Admin', 
        'Employee'
      ];

      if (rolesWithAccess.includes(userData.role)) {
        setModalIsOpen(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching user data", {
        id: 'protected-route-error',
      });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-500 font-poppins">
        <Spinner color='white' className="h-12 w-12 text-black" />
      </div>
    );
  }

  if (userRole !== 'Admin' && userRole !== 'HR Manager' && userRole !== 'Sales Manager' && userRole !== 'Inventory Manager' && userRole !== 'Flock Manager' && userRole !== 'Employee') {
    return (
      <div className="flex flex-col items-center justify-center bg-red-500 font-poppins h-screen text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Insufficient Privileges</h1>
        <p className="mb-8">You do not have the necessary permissions to access this page.</p>
        <div className='flex flex-col gap-4'>
          <Button
            onClick={() => navigate('/login')}
            className="bg-black text-white font-bold py-2 px-4 hover:shadow-black shadow-md rounded-lg"
          >
            Login Again
          </Button>
          <Button
            onClick={() => navigate('/home')}
            className="bg-black text-white font-bold py-2 px-4 hover:shadow-black shadow-md rounded-lg"
          >
            Go To Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && isMobile && (
        <aside className="fixed inset-0 bg-gray-900 text-white z-50 transition-transform duration-200 ease-in-out">
          <Sidebar isMobile={isMobile} closeSidebar={toggleSidebar} userRole={userRole} />
        </aside>
      )}
      {!isMobile && (
        <aside className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={toggleSidebar} userRole={userRole} />
      </aside>
      )}
      <main className="flex flex-col w-full">
        {isMobile && (
          <header className="w-full bg-red-500 text-white flex items-center justify-between p-4">
            <button onClick={toggleSidebar}>
              <FaBars className="text-2xl" />
            </button>
            {/* <h1 className="text-xl">Admin Dashboard</h1> */}
            <AdminHeader/>
          </header>
        )}
         {!isMobile && (
    <header className="w-full bg-red-500">
      <AdminHeader />
    </header>
  )}
        <div className="md:flex-grow overflow-y-auto dashboard-1-scrollbar">
          {children}
        </div>
      </main>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4 md:p-8"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-red-500 relative p-6 md:p-8 rounded-lg shadow-lg max-w-md md:max-w-2xl w-full">
        <div className="absolute top-2 right-2 p-2 cursor-pointer" onClick={closeModal}>
                <FaTimes className="text-white text-xl" />
              </div>
          <h6 className="text-2xl md:text-3xl font-bold text-white mb-4 flex flex-col md:flex-row justify-center gap-4 items-center">
            <Avatar src={logo} alt="Website Logo" size="lg" className="bg-red-500" />
            Welcome To PoultryPal
          </h6>
          <div className="text-xl md:text-3xl text-black mb-4 flex flex-col md:flex-row justify-center gap-4 items-center">
            <Typography variant="h4" className="flex items-center text-white">
              <span className="animate-wave text-4xl mr-2">👋</span>Hey
            </Typography>
            <Typography variant="h4" className="flex items-center text-white">
              <Avatar src={user?.image || 'https://via.placeholder.com/150'} alt="User Avatar" size="md" className="mr-2" /> {`${user?.firstName} ${user?.lastName}`} {/* Display user name here */}
            </Typography>
          </div>
          <p className="text-justify text-sm md:text-lg text-white max-w-xs md:max-w-2xl">
            {isMobile
              ? `Welcome to the admin dashboard of PoultryPal. Here, you can manage all the aspects of the website including user management, content creation, and more. Use the hamburger menu to access different sections of the admin panel.`
              : `Welcome to the admin dashboard of PoultryPal. Here, you can manage all the aspects of the website including user management, content creation, and more. Use the sidebar menu to access different sections of the admin panel.`
            }
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ProtectedLayout;