const express = require('express');
const router = express.Router();
const userController = require('../../Controllers/User/UserController');
const authMiddleware = require('../../Middleware/AuthMiddleware/AuthMiddleware');
const adminMiddleware = require('../../Middleware/AuthMiddleware/AdminMiddleware');

router.post('/signup', userController.Signup);
router.post('/login', userController.Login);
router.get('/users/:email',authMiddleware, userController.SpecificUser);
router.post('/refresh-token', userController.refreshToken);
router.get('/check-token', userController.checkToken);
router.get('/getUserById',authMiddleware, userController.getUserById);
router.post('/forgotPassword',userController.ForgotPassword);
router.post('/resetPassword',userController.ResetPassword);
router.get('/getAllCustomers',adminMiddleware, userController.AllCustomers);
router.delete('/:id',adminMiddleware, userController.deleteUser);
router.put('/update/:id',authMiddleware,userController.updateUser)
router.put('/self/update',authMiddleware,userController.updateOwnInformation);



module.exports = router;
