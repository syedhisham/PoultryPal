import React, { useState, useEffect, useCallback } from "react";
import { AxiosRequest } from "../../AxiosRequest/AxiosRequest";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, clearEmail } from "../../redux/emailSlice";
import { logoutRedux } from "../../redux/userSlice";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    Avatar,
    MenuItem,
} from "@material-tailwind/react";
import Swal from 'sweetalert2';
import {
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarDaysIcon,
    Cog6ToothIcon,
    PowerIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { removeTokenAction, selectToken } from "../../redux/tokenSlice";
import { clearRole } from "../../redux/roleSlice";
import toast from "react-hot-toast";
import socket from "../../utils/socket";

// Define menu items function
const profileMenuItems = (userRole) => {
    const items = [
        {
            label: "Edit Profile",
            icon: Cog6ToothIcon,
        },
    ];

    // Conditionally add "My Orders" based on user role
    if (userRole === "Customer") {
        items.push({
            label: "My Orders",
            icon: ShoppingBagIcon,
        });
    }else if (userRole === "Employee") {
      items.push({
        label: "My Schedule",
        icon: CalendarDaysIcon,
    });
    }

    // Add the Sign Out option
    items.push({
        label: "Sign Out",
        icon: PowerIcon,
    });

    return items;
};

const ProfileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [announcementCount, setAnnouncementCount] = useState(0); // State to hold the announcement count
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("token");
    const token = useSelector(selectToken) || storedToken;
    const email = useSelector(selectEmail);
    const closeMenu = () => setIsMenuOpen(false);

    // Fetch user information
    const fetchUser = useCallback(async () => {
        setLoading(true);
        try {
            const response = await AxiosRequest.get(`/api/user/users/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            if (data) {
                setUser(data);
                localStorage.setItem("name", `${data.firstName} ${data.lastName}`);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [email, token]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // Fetch announcement count for the user
    // const fetchAnnouncementCount = useCallback(() => {
    //     if (email) {
    //         socket.emit('COUNT_ANNOUNCEMENTS_FOR_RECIPIENT_EMAIL', { recipientEmail: email });
    //     }
    // }, [email]);

    // useEffect(() => {
    //     fetchAnnouncementCount();

    //     socket.on('ANNOUNCEMENT_COUNT_RESPONSE', (response) => {
    //         if (response.status === 200) {
    //             setAnnouncementCount(response.count); // Update the count from the response
    //         } else {
    //             console.error('Error fetching announcement count:', response.message);
    //         }
    //     });

    //     // Clean up the socket event listener
    //     return () => {
    //         socket.off('ANNOUNCEMENT_COUNT_RESPONSE');
    //     };
    // }, [fetchAnnouncementCount]);
  
      const fetchAnnouncementCount = useCallback(() => {
          if (email) {
              socket.emit('COUNT_ANNOUNCEMENTS_FOR_RECIPIENT_EMAIL', { recipientEmail: email });
          }
      }, [email]);
  
      useEffect(() => {
          // Fetch initial announcement count
          fetchAnnouncementCount();
  
          // Listen for the announcement count response
          const handleAnnouncementCountResponse = (response) => {
              if (response.status === 200) {
                  setAnnouncementCount(response.count); // Update the count from the response
              } else {
                  console.error('Error fetching announcement count:', response.message);
              }
          };
  
          socket.on('ANNOUNCEMENT_COUNT_RESPONSE', handleAnnouncementCountResponse);
  
          // Listen for announcements sent
          const handleAnnouncementSent = (announcement) => {
              // Fetch the announcement count again when a new announcement is sent
              fetchAnnouncementCount();
          };
  
          socket.on('ANNOUNCEMENT_SENT', handleAnnouncementSent);
  
          // Clean up the socket event listeners on component unmount
          return () => {
              socket.off('ANNOUNCEMENT_COUNT_RESPONSE', handleAnnouncementCountResponse);
              socket.off('ANNOUNCEMENT_SENT', handleAnnouncementSent);
          };
      }, [fetchAnnouncementCount]);

    // Handle sign out action
    const handleSignOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to log out.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out",
        }).then((result) => {
            if (result.isConfirmed) {
                setTimeout(async () => {
                    try {
                        dispatch(clearEmail());
                        dispatch(removeTokenAction());
                        dispatch(logoutRedux());
                        dispatch(clearRole());
                        setUser(null);
                        closeMenu();
                        toast.success('Logged out successfully', {
                            id: 'logout-success'
                        });
                        navigate("/login");
                    } catch (error) {
                        console.error("Failed to logout:", error);
                    }
                }, 1000);
            }
        });
    };

    // Handle "My Orders" navigation
    const handleMyOrders = () => {
        closeMenu();
        navigate("/my-orders"); // Ensure the route exists for "My Orders"
    };

    const handleEditProfile = () => {
        closeMenu();
        navigate("/profile-settings"); // Ensure the route exists for "Edit Profile"
    };

    const handleMySchedule = () => {
      closeMenu();
      navigate("/employee-schedule"); // Ensure the route exists for "Edit Profile"
  };

    const handleNotificationClick = () => {
      // Navigate to the announcements page (or whichever route you want)
      navigate('/notifications'); // Replace with your desired path
  };

    const menuItems = profileMenuItems(user?.role); // Pass user role to the menu items function

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
          {token &&(
            <div className="flex p-2">
                <div className="relative cursor-pointer" onClick={handleNotificationClick}>
                    <NotificationsActiveIcon sx={{ fontSize: '28px' }}  className="text-black" />
                    {announcementCount > 0 && ( // Show count if there are announcements
                        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
                            {announcementCount}
                        </span>
                    )}
                </div>
            </div>
    )}
            {/* Add a gap/divider */}
            <div className="my-2" /> {/* Adjust margin for gap */}
            <MenuHandler>
                {/* Notification icon positioned above the avatar */}
                <Button
                    variant="text"
                    color="black"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    {!loading && user ? (
                        <Avatar
                            src={user.image}
                            alt="User Profile"
                            className="h-10 w-10 rounded-full border-2 border-white object-cover mr-2 cursor-pointer"
                        />
                    ) : (
                        <div className="text-lg border-2 border-solid border-white p-1 rounded-full cursor-pointer mr-5 hover:text-red-700 transition-colors duration-200 ease-in-out">
                            <FaUserAlt />
                        </div>
                    )}
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {menuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === menuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={
                                label === "Sign Out"
                                    ? handleSignOut
                                    : label === "My Orders"
                                        ? handleMyOrders
                                        : label === "Edit Profile"
                                            ? handleEditProfile
                                            : label === "My Schedule"
                                              ? handleMySchedule
                                            : closeMenu
                            }
                            className={`flex items-center gap-2 rounded ${isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""
                                }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
};

export default ProfileMenu;
