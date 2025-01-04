// import React, { useEffect, useState } from 'react';
// import { AxiosRequest } from "../../AxiosRequest/AxiosRequest";
// import { Typography, Card, CardContent, Grid, Box, IconButton } from '@mui/material';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import { useSelector } from 'react-redux';
// import { selectToken } from '../../redux/tokenSlice';

// const Notifications = () => {
//     const storedToken = localStorage.getItem('token');
//     const token = useSelector(selectToken) || storedToken;
//     const [announcements, setAnnouncements] = useState([]);
//     const [isRotated, setIsRotated] = useState(false); // State to manage rotation


//     const fetchAnnouncements = async () => {
//         try {
//             const response = await AxiosRequest.get('/api/announcements/recipient-specific', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setAnnouncements(response.data);
//         } catch (error) {
//             console.error("Failed to fetch notifications:", error);
//         }
//     };

//     const handleIconClick = () => {
//         setIsRotated(true);
//         fetchAnnouncements();
//         setTimeout(() => setIsRotated(false), 300);
//     };

//     useEffect(() => {
//         fetchAnnouncements();
//     }, [token]);

//     return (
//         <Box sx={{ padding: '32px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
//             <Box display="flex" justifyContent="flex-end" mb={2}>
//             <IconButton
//                     onClick={handleIconClick}
//                     color="primary"
//                     sx={{
//                         backgroundColor: '#007bff',
//                         color: '#ffffff',
//                         padding: '10px',
//                         transition: 'transform 0.5s',
//                         transform: isRotated ? 'rotate(180deg)' : 'none',
//                         '&:hover': { backgroundColor: '#0056b3' },
//                     }}
//                 >
//                     <RefreshIcon fontSize="medium" />
//                 </IconButton>
//             </Box>
//             <Grid container spacing={3}>
//                 {announcements.length > 0 ? (
//                     announcements.map((announcement) => (
//                         <Grid item xs={12} sm={6} md={4} key={announcement._id}>
//                             <Card 
//                                 sx={{
//                                     borderRadius: '12px',
//                                     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//                                     transition: 'transform 0.3s',
//                                     '&:hover': { transform: 'translateY(-8px)' },
//                                     backgroundColor: '#ffffff',
//                                     color: '#333'
//                                 }}
//                             >
//                                 <CardContent sx={{ padding: '24px' }}>
//                                     <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#007bff', marginBottom: '8px' }}>
//                                         {announcement.title}
//                                     </Typography>
//                                     <Typography variant="body2" sx={{ color: '#555', marginBottom: '16px' }}>
//                                         {announcement.content}
//                                     </Typography>
//                                     <Typography variant="caption" sx={{ color: '#888' }}>
//                                         {`Created by: ${announcement.createdBy.firstName} ${announcement.createdBy.lastName}`}
//                                     </Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))
//                 ) : (
//                     <Typography variant="body1" sx={{ color: '#777', textAlign: 'center', width: '100%' }}>
//                         No notifications available.
//                     </Typography>
//                 )}
//             </Grid>
//         </Box>
//     );
// };

// export default Notifications;


import React, { useEffect, useState } from 'react';
import { AxiosRequest } from "../../AxiosRequest/AxiosRequest";
import { Typography, Card, CardContent, Grid, Box, IconButton, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/tokenSlice';

const Notifications = () => {
    const storedToken = localStorage.getItem('token');
    const token = useSelector(selectToken) || storedToken;
    const [announcements, setAnnouncements] = useState([]);
    const [isRotated, setIsRotated] = useState(false); // State to manage rotation

    const fetchAnnouncements = async () => {
        try {
            const response = await AxiosRequest.get('/api/announcements/recipient-specific', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAnnouncements(response.data);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    const handleIconClick = () => {
        setIsRotated(true);
        fetchAnnouncements();
        setTimeout(() => setIsRotated(false), 300);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, [token]);

    return (
        <Box sx={{ padding: '32px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <IconButton
                    onClick={handleIconClick}
                    color="primary"
                    sx={{
                        backgroundColor: '#007bff',
                        color: '#ffffff',
                        padding: '10px',
                        transition: 'transform 0.5s',
                        transform: isRotated ? 'rotate(180deg)' : 'none',
                        '&:hover': { backgroundColor: '#0056b3' },
                    }}
                >
                    <RefreshIcon fontSize="medium" />
                </IconButton>
            </Box>
            <Grid container spacing={3}>
                {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                        <Grid item xs={12} sm={6} md={4} key={announcement._id}>
                            <Card 
                                sx={{
                                    borderRadius: '12px',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' },
                                    backgroundColor: '#ffffff',
                                    color: '#333'
                                }}
                            >
                                <CardContent sx={{ padding: '24px' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#007bff', marginBottom: '8px' }}>
                                        {announcement.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#555', marginBottom: '16px' }}>
                                        {announcement.content}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#888' }}>
                                        {`Created by: ${announcement.createdBy.firstName} ${announcement.createdBy.lastName}`}
                                    </Typography>

                                    {/* Check if there are attachments */}
                                    {announcement.attachments && announcement.attachments.length > 0 && (
                                        <Box mt={2}>
                                            {announcement.attachments.map((attachment, index) => {
                                                // Extract filename from the path
                                                const filename = attachment.path.split('\\').pop(); // Gets '1730162623772.pdf'

                                                return (
                                                    <Button
                                                        key={index}
                                                        variant="outlined"
                                                        href={`http://localhost:5000/files/${filename}`} // Use the extracted filename here
                                                        target="_blank"
                                                        download // This attribute prompts the download dialog
                                                        sx={{ mr: 1 }} // Margin for spacing between buttons
                                                    >
                                                        Download {attachment.filename}
                                                    </Button>
                                                );
                                            })}
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" sx={{ color: '#777', textAlign: 'center', width: '100%' }}>
                        No notifications available.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default Notifications;
