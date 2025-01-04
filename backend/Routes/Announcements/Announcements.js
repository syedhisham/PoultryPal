const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const announcementController = require('../../Controllers/Announcement/AnnouncementController');
const authMiddleware = require('../../Middleware/AuthMiddleware/AuthMiddleware');
const adminMiddleware = require('../../Middleware/AuthMiddleware/AdminMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage });



// Route to create a new announcement
router.post('/createAnnouncement', adminMiddleware, upload.array('attachments'), announcementController.createAnnouncement);

// Route to get all announcements
router.get('/getAnnouncement', adminMiddleware, announcementController.getAnnouncements);

// Route to schedule an announcement
router.patch('/:id/scheduleAnnouncement', authMiddleware, announcementController.scheduleAnnouncement);

router.get('/recipient-specific', authMiddleware, announcementController.getRecipientAnnouncement); // Updated route

router.get('/download/:filename', authMiddleware, announcementController.downloadAttachment);



module.exports = router;
