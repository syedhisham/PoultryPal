const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const user  = require('../../Models/User/UserModel');
const sendEmail = require('../../mail/sendEmail');

exports.AddEmployee= async (req, res) => {
    const { firstName, lastName, email, password, image,role,payment } = req.body;
  
    try {
      const existingUser = await user.findOne({ email });
  
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email is already registered, please use a different one" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new user({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        image,
        role,
        payment
      });
      await newUser.save();
      res.status(201).json({ message: "Successfully Added Employee" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while registering" });
    }
  };

  exports.AllEmployees = async (req, res) => {
    try {
        const AllEmployees = await user.find({ role: { $ne: 'Customer' } }).select('-password'); // Exclude users with role 'Customer'
        if (!AllEmployees || AllEmployees.length === 0) {
            return res.status(404).json({ msg: 'No Employees Found' });
        }
        res.status(200).json(AllEmployees);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
  }
  
  // Update an existing employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, role,payment } = req.body;

    // Fetch the user by ID to get the current email
    const currentUser = await user.findById(id);
    
    if (!currentUser) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Check if the email already exists for another user
    const emailConflict = await user.findOne({ email, _id: { $ne: id } });
    if (emailConflict) {
      return res.status(409).json({ message: 'Email already exists for another Employee' });
    }

    // Update the user and return the updated document
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { firstName, lastName, email, role,payment },
      { new: true }
    );

    // If the email is changing, trigger the email-sending function
    if (currentUser.email !== email) {
      // Replace this with your own component or function to send the email
      sendEmail({
        email: currentUser.email, // Old email
        subject: 'Account Email Updated',
        type: 'emailChange',
        name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        newEmail: updatedUser.email // New email
      });
    }

    res.status(200).json({ message: 'Employee updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete an Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await user.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Error deleting Employee:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};