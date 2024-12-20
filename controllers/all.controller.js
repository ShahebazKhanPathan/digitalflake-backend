// Load required modules
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklist');
const Role = require('../models/role');
const User = require('../models/user');

// Controller function to authenticate admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await Admin.findOne({ email: email, password: password });
    if (result) {
      const token = jwt.sign({ id: email, password: password }, process.env.SECRET_KEY);

      return res.status(200).json({
        message: "Login successfull!",
        statusCode: 200,
        token: token
      });
    }

    res.status(404).json({
      message: "Invalid credentials",
      statusCode: 404
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to logout
const adminLogout = async (req, res) => {
  const token = req.header("auth-admin");
  try {
    const result = await new Blacklist({ token }).save();
    if (result) {
      return res.status(200).json({
        message: "Logout successfull!",
        statusCode: 200,
        token: token
      });
    }

    res.status(404).json({
      message: "Invalid token",
      statusCode: 404
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to create a new role
const createNewRole = async (req, res) => {
  const { name, status } = req.body;
  try {
    const result = await new Role(req.body).save();
    res.status(201).json({
      message: "Role created successfully",
      statusCode: 200
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to create a new user
const createNewUser = async (req, res) => {
  const { name, email, mobile, role } = req.body;
  const photo = req.file;

  if (!photo) {
    return res.status(400).json({ message: "Photo is required" });
  }

  try {
    const result = await new User({ name, email, mobile, role, photo: photo.path }).save();
    res.status(201).json({
      message: "User created successfully",
      statusCode: 200
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to retrieve all roles' record
const getRoles = async (req, res) => {
  try {
    const result = await Role.find();
    res.status(200).json({
      data: result,
      message: "Roles fetched successfully!",
      statusCode: 200
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to retrieve all users' record
const getUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json({
      data: result,
      message: "Users fetched successfully!",
      statusCode: 200
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to get user record by user ID
const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findById(id);
    res.status(200).json({
      data: result,
      message: "User fetched successfully!",
      statusCode: 200
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to update user record by user ID
const updateUserByID = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, role } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    // Find the user by ID and update only if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;
    if (role) user.role = role;
    if (photo) user.photo = photo;

    // Save the updated user data
    await user.save();

    // Return the updated user details
    res.status(200).json({ message: 'User updated successfully', data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
}

// Controller function to update user record by user ID
const updateRoleByID = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(req.body);

  try {
    // Find the user by ID and update only if the role exists
    const role = await Role.findByIdAndUpdate(id, { name: name });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Return the updated user details
    res.status(200).json({ message: 'Role updated successfully', data: role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
}

// Controller function to delete role record by role ID
const deleteRoleByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Role.findByIdAndDelete(id);
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to delete role record by role ID
const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Export the controller functions
module.exports = { adminLogin, adminLogout, createNewRole, createNewUser, getRoles, getUsers, getUserByID, updateUserByID, updateRoleByID, deleteRoleByID, deleteUserByID };