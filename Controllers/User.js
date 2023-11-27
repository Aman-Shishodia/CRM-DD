import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { tokenSchema } from "../models/Token.js";
import { User } from "../models/User.js";

const Token = mongoose.model("Token", tokenSchema);

export const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    role,
    mobileNumber,
    profileImage,
    dob,
    gender,
    address,
    linkedIn,
  } = req.body;
  try {
    let existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email or username",
      });
    }
    const hashedpwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedpwd,
      role,
      mobileNumber,
      profileImage,
      dob,
      gender,
      address,
      linkedIn,
    });

    const verificationToken = await Token.create({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    res.status(201).json({
      message: "User signed up successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {

  const { email, password } = req.body

  try {

    let user = await User.findOne({ email: email })
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.jwtsecretKey);
    res.cookie("token", token, {
      httpOnly: true,
    }).json({
      success: true,
      message: `Welcome back! ${user.firstName}`,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "LogIn failed",
      message: err
    })
  }
}

export const fetchProfile = async (req, res) => {
  const userId = req.params.userID;
  console.log(userId);
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.status(201).json({
      success: true,
      user: user
    })


  }
  catch (err) {
    res.status(400).json({
      status: 'Failed to get user',
      error: err
    })
  }

};

export const fetchallUsers = async (req, res) => {
  try {
    const Users = await User.find({});
    res.status(201).json({
      success: true,
      users: Users
    })
  } catch (err) {
    res.status(400).json({
      status: 'Failed to get all users',
      error: err
    })
  }
}

export const updateUser = async (req, res) => {

  const userID = req.params.userID

  try {
    const user = await User.findById(userID)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.role) {
      user.role = req.body.role;
    }
    if (req.body.mobileNumber) {
      user.mobileNumber = req.body.mobileNumber;
    }
    if (req.body.profileImage) {
      user.profileImage = req.body.profileImage;
    }
    if (req.body.dob) {
      user.dob = req.body.dob;
    }
    if (req.body.gender) {
      user.gender = req.body.gender;
    }
    if (req.body.address) {
      user.address = req.body.address;
    }
    if (req.body.linkedIn) {
      user.linkedIn = req.body.linkedIn;
    }

    const updatedUser = await user.save();

    res.status(201).json({
      status: "Success",
      user: updatedUser
    })

  } catch (err) {
    res.status(400).json({
      status: 'Failed to update user',
      error: err
    })
  }
}

export const changePassword = async (req, res) => {
  const userID = req.params.userID;

  try {
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({
        status: "False",
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: "False",
        message: "Invalid Password",
      });
    }

    if (req.body.newPassword) {
      const hashedPwd = await bcrypt.hash(req.body.newPassword, 10);
      user.password = hashedPwd;

      await user.save();

      return res.status(201).json({
        status: "True",
        message: "Password changed successfully",
      });
    } else {
      return res.status(400).json({
        status: "False",
        message: "New password is required",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "False",
      message: "Internal server error",
    });
  }
};

export const resetpassword = async (req, res) => {

  const userID = req.params.userID
  try {
    const user = await User.findById(userID)

    if (!user) {
      return res.status(404).json({
        status: "False",
        message: "User not found",
      });
    }

    const resetToken = await Token.create({
      userId: userID,
      token: crypto.randomBytes(32).toString("hex"),
    });

    if (req.body.newPassword) {

      const hashedPwd = await bcrypt.hash(req.body.newPassword, 10)
      user.password = hashedPwd

      await user.save();

      const token = jwt.sign({ _id: user._id }, process.env.jwtsecretKey)
      return res.cookie("token", token, {
        httpOnly: true,
      }).json({
        status: "True",
        message: "Password changed successfully",
      });
    } else {
      return res.status(400).json({
        status: "False",
        message: "New password is required",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "False",
      message: "Internal server error",
    });
  }
}

export const deleteuser = async (req, res) => {

  const userID = req.params.userID
  try {
    await User.findByIdAndDelete(userID)
    res.status(201).json({
      status: "True",
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "False",
      message: "Internal server error",
    });
  }
}