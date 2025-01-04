// import React, { useEffect, useState } from 'react';
// import { Avatar, Typography } from '@material-tailwind/react';
// import { Box, IconButton, Tooltip } from '@mui/material';
// import dayjs from 'dayjs';
// import { motion } from 'framer-motion';
// import WbSunnyIcon from '@mui/icons-material/WbSunny';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import NightsStayIcon from '@mui/icons-material/NightsStay';
// import BedtimeIcon from '@mui/icons-material/Bedtime';
// import ProfileMenu from '../ProfileMenu/ProfileMenu';

// const AdminHeader = () => {
//   const [currentTime, setCurrentTime] = useState(dayjs());
//   const [greeting, setGreeting] = useState('');
//   const [greetingIcon, setGreetingIcon] = useState(<WbSunnyIcon />);
//   const name = localStorage.getItem('name');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(dayjs());
//     }, 1000);

//     const hour = currentTime.hour();
//     if (hour >= 5 && hour < 12) {
//       setGreeting('Good Morning');
//       setGreetingIcon(<WbSunnyIcon className="text-yellow-400" />);
//     } else if (hour >= 12 && hour < 17) {
//       setGreeting('Good Afternoon');
//       setGreetingIcon(<AccessTimeIcon className="text-orange-500" />);
//     } else if (hour >= 17 && hour < 22) {
//       setGreeting('Good Evening');
//       setGreetingIcon(<NightsStayIcon className="text-indigo-500" />);
//     } else {
//       setGreeting('Good Night');
//       setGreetingIcon(<BedtimeIcon className="text-blue-700" />);
//     }

//     return () => clearInterval(interval);
//   }, [currentTime]);

//   return (
//     <header className="flex justify-between items-center p-0 md:p-4 text-white ">
//       <motion.div
//         className="flex items-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <Tooltip title={greeting} arrow>
//           {/* <IconButton className="text-white">
//             {greetingIcon}
//           </IconButton> */}
//           <div className="text-white ml-2">
//   {greetingIcon}
// </div>

//         </Tooltip>
//         <Box className="ml-4">
//           <Typography variant="body2" className="font-semibold animate__animated animate__fadeInLeft">
//             {greeting}, {name}
//           </Typography>
//           <Typography variant="small" className="animate__animated animate__fadeInLeft">
//             {currentTime.format('MMMM DD, YYYY')} {currentTime.format('h:mm:ss A')}
//           </Typography>
//         </Box>
//       </motion.div>

//       <motion.div
//         className="flex items-center"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8, delay: 0.3 }}
//       >
//        <ProfileMenu />
//       </motion.div>
//     </header>
//   );
// };

// export default AdminHeader;


import React, { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { Box, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const AdminHeader = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [greeting, setGreeting] = useState('');
  const [greetingIcon, setGreetingIcon] = useState(<WbSunnyIcon />);
  const name = localStorage.getItem('name') || 'User';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    const hour = currentTime.hour();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
      setGreetingIcon(<WbSunnyIcon className="text-yellow-400" />);
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good Afternoon');
      setGreetingIcon(<AccessTimeIcon className="text-orange-500" />);
    } else if (hour >= 17 && hour < 22) {
      setGreeting('Good Evening');
      setGreetingIcon(<NightsStayIcon className="text-indigo-500" />);
    } else {
      setGreeting('Good Night');
      setGreetingIcon(<BedtimeIcon className="text-blue-700" />);
    }

    return () => clearInterval(interval);
  }, [currentTime]);

  return (
    <header className="flex justify-between items-center p-4 text-white shadow-md">
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Tooltip title={greeting} arrow>
          <div className="text-white ml-2">
            {greetingIcon}
          </div>
        </Tooltip>
        <Box className="ml-4">
          <Typography variant="h6" className="font-bold text-white animate__animated animate__fadeInLeft">
            {greeting}, {name}
          </Typography>
          <Typography variant="body2" className="text-gray-300 animate__animated animate__fadeInLeft">
            {currentTime.format('MMMM DD, YYYY')} - {currentTime.format('h:mm:ss A')}
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <ProfileMenu />
      </motion.div>
    </header>
  );
};

export default AdminHeader;
