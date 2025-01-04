const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const user  = require('../../Models/User/UserModel');
const sendEmail = require('../../mail/sendEmail');

exports.Signup= async (req, res) => {
    const { firstName, lastName, email, password, image } = req.body;
  
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
      });
      await newUser.save();
      await sendEmail({
        email,
        subject: 'Account Created Successfully',
        type: 'welcome',
        name: `${newUser.firstName} ${newUser.lastName}`,
      });
      res.status(201).json({ message: "Successfully Registered" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while registering" });
    }
  };
  
  // API endpoint for login
  exports.Login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const loginuser = await user.findOne({ email });
  
      if (!loginuser) {
        return res.status(400).json({ message: "Account Not Found" });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, loginuser.password);
  
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      // Exclude password from the user object before creating the token
    const { password: _, ...userWithoutPassword } = loginuser.toObject();

    // Create a token with the user data excluding the password
    const token = jwt.sign({ user: userWithoutPassword }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
      console.log('Token: ' + token);
      const role = loginuser.role;
      // Successful login
      res.status(200).json({ message: "Logged In Successfully",token,role });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while logging in" });
    }
  };
  
 exports.SpecificUser = async (req, res) => {
    const { email } = req.params;
  
    try {
      // Find the user in the database based on email
      const userfetch = await user.findOne({ email: email });
  
      if (!userfetch) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return user data
      res.status(200).json(userfetch);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching user data" });
    }
  };

  // Refresh token controller
exports.refreshToken = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }

    // Verify if the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = jwt.sign({ user: decoded.user }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token: newToken });
  } catch (err) {
    console.error('Error refreshing token:', err);
    res.status(403).json({ message: 'Failed to refresh token' });
  }
};

// Check token validity controller
exports.checkToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ isValid: false, message: 'Authorization header is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ isValid: true });
  } catch (err) {
    console.error('Error checking token:', err);
    res.status(401).json({ isValid: false, message: 'Token is not valid or expired' });
  }
};


exports.getUserById = async (req, res) => {
  const userId = req.user._id;
  console.log('getUserById', userId);
  try {
      const getUserById = await user.findById(userId).select('-password'); // Exclude password field
      if (!getUserById) return res.status(404).json({ msg: 'User not found' });
      res.status(200).json(getUserById);
      
  } catch (err) {
      res.status(500).json({ msg: 'Server error' });
  }
}

// exports.AllUsers = async (req, res) => {
//   try {
//       const users = await user.find().select('-password'); // Exclude password field
//       if (!users) return res.status(404).json({ msg: 'No User Found' });
//       res.status(200).json(users);
//   } catch (err) {
//       res.status(500).json({ msg: 'Server error' });
//   }
// }

exports.AllCustomers = async (req, res) => {
  try {
      const customers = await user.find({ role: 'Customer' }).select('-password'); // Assuming role field differentiates users
      if (!customers || customers.length === 0) {
          return res.status(404).json({ msg: 'No Customers Found' });
      }
      res.status(200).json(customers);
  } catch (err) {
      res.status(500).json({ msg: 'Server error' });
  }
}


// Forgot Password
exports.ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token with 5 minutes expiration
    const resetToken = jwt.sign({ userId: User._id }, process.env.JWT_SECRET, { expiresIn: '30m' });

    // Construct reset URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    // Send reset email
    await sendEmail({
      email: User.email,
      subject: 'Password Reset Request',
      resetUrl,
      type: 'verify',
      name: `${User.firstName} ${User.lastName}`,
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Error sending password reset email:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Reset Password
exports.ResetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const User = await user.findById(decoded.userId);

    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update password
    User.password = await bcrypt.hash(newPassword, 10);
    await User.save();
// Send reset email
await sendEmail({
  email: User.email,
  subject: 'Password Reset Successful',
  type: 'reset',
  name: `${User.firstName} ${User.lastName}`,
});
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Reset token has expired' });
    }
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email} = req.body;

    // Fetch the user by ID to get the current email
    const currentUser = await user.findById(id);
    
    if (!currentUser) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check if the email already exists for another user
    const emailConflict = await user.findOne({ email, _id: { $ne: id } });
    if (emailConflict) {
      return res.status(409).json({ message: 'Email already exists for another Customer' });
    }

    // Update the user and return the updated document
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { firstName, lastName, email },
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

    res.status(200).json({ message: 'Customer updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing user
exports.updateOwnInformation = async (req, res) => {
  try {
    const id = req.user._id; // User's ID from the token/session
    const { firstName, lastName, email, newPassword, currentPassword } = req.body; // Accept current password
    let image = req.body.image || null;

    // Fetch the user by ID
    const currentUser = await user.findById(id);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the email already exists for another user
    if (email && email !== currentUser.email) {
      const emailConflict = await user.findOne({ email, _id: { $ne: id } });
      if (emailConflict) {
        return res.status(409).json({ message: 'Email already exists for another user' });
      }
    }

    // Build the update object dynamically
    let updateFields = {};
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    if (email) updateFields.email = email;
    
    // If the user wants to update the password, verify the current password first
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required to update your password.' });
      }

      // Compare the provided current password with the stored password
      const isPasswordMatch = await bcrypt.compare(currentPassword, currentUser.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Current password is incorrect.' });
      }

      // Hash and update the new password
      updateFields.password = await bcrypt.hash(newPassword, 10);
    }

    if (image && image !== currentUser.image) {
      updateFields.image = image;
    }

    // Update the user with only the provided fields
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true } // Return the updated document
    );

    // Send confirmation email if the email was changed
    if (email && currentUser.email !== email) {
      await sendEmail({
        email: currentUser.email, // Old email
        subject: 'Account Email Updated',
        type: 'emailChange',
        name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        newEmail: updatedUser.email // New email
      });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await user.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    console.error('Error deleting Customer:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};