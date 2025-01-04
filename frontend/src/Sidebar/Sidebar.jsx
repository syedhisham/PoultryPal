import React, { useState } from 'react';
import { FaHome, FaUser, FaUsers, FaArrowLeft, FaArrowRight, FaTimes, FaEgg, FaDatabase, FaReceipt } from 'react-icons/fa';
import { RiRefund2Line } from "react-icons/ri";
import { IoCalendarOutline ,IoCalendarClearOutline} from "react-icons/io5";
import { GrAnnounce } from "react-icons/gr";
import { GiChicken,GiHighGrass } from "react-icons/gi";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';

const Sidebar = ({ isMobile, closeSidebar, userRole }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log('User Role in Sidebar', userRole);
  const sidebarItems = [
    { name: 'Home', path: '/home', icon: <FaHome /> },
    userRole === 'Admin' ? { name: 'Customers', path: '/customers', icon: <FaUsers /> }:null,
    userRole === 'Admin' ?{ name: 'Employees', path: '/employees', icon: <FaUsers /> }:null,
    userRole === 'Admin' ? { name: 'Add Employee', path: '/add-employee', icon: <FaUser /> } : null,
    { name: 'Add Feed', path: '/add-feed', icon: <GiHighGrass /> },
    { name: 'Add Flock', path: '/add-flock', icon: <GiChicken /> },
    { name: 'Add Eggs', path: '/add-eggs', icon: <FaEgg /> },
    { name: 'Flock Data', path: '/flocks', icon: <FaDatabase /> },
    { name: 'Eggs Data', path: '/eggs', icon: <FaDatabase /> },
    { name: 'Feed Data', path: '/feeds', icon: <FaDatabase /> },
    userRole === 'Admin' ? { name: 'All Orders', path: '/all-orders', icon: <FaReceipt /> }:null,
    userRole === 'Admin' ? { name: 'All Refunds', path: '/all-refunds', icon: <RiRefund2Line /> }:null,
    userRole === 'Admin' ? { name: 'Create Schedule', path: '/create-schedule', icon: <IoCalendarClearOutline /> }:null,
    userRole === 'Admin' ? { name: 'All Schedules', path: '/all-schedules', icon: <IoCalendarOutline /> }:null,
    userRole === 'Admin' ? { name: 'Announcement', path: '/create-announcement', icon: <GrAnnounce /> }:null,
    userRole === 'Admin' ? { name: 'Add Supplier', path: '/add-supplier', icon: <FaReceipt /> }:null,
    userRole === 'Admin' ? { name: 'All Suppliers', path: '/all-suppliers', icon: <FaReceipt /> }:null,
  ].filter(Boolean);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="flex mulish">
        <div className={`bg-red-500 text-white ${isMobile ? 'fixed inset-0 z-50  w-full' : 'h-full'} ${isSidebarVisible && !isMobile ? 'w-64' : 'w-20'} p-4 overflow-y-auto dashboard-1-scrollbar transition-all duration-300`}>
          {isMobile && (
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl">Menu</h1>
              <button onClick={closeSidebar}>
                <FaTimes className="text-2xl " />
              </button>
            </div>
          )}
          <ul className="space-y-4">
            {sidebarItems.map((item, i) => (
              <NavLink
                to={item.path}
                key={i}
                className={({ isActive }) =>
                  `flex items-center ${isSidebarVisible ? 'space-x-3' : 'justify-center'} p-2 rounded-lg transition-colors duration-200 ${
                    isActive ? 'bg-gray-200 text-black font-semibold' : 'hover:bg-gray-200 hover:text-black'
                  }`
                }
                onClick={isMobile ? closeSidebar : null}
              >
                <span className="text-xl">{item.icon}</span>
                {isSidebarVisible && <span className="text-lg">{item.name}</span>}
              </NavLink>
            ))}
          </ul>
        </div>
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={`bg-white text-white p-2 rounded-full shadow-md shadow-black fixed top-4 ${isSidebarVisible ? 'left-60' : 'left-16'} transition-all duration-300 z-50`}
          >
            {isSidebarVisible ? <FaArrowLeft className="text-2xl" color='black' /> : <FaArrowRight className="text-2xl" color='black'/>}
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;



