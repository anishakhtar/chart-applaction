import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import { sendEmail } from '../utils/emailService.js';
import crypto from 'crypto';

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered. Please login or use a different email.',
      });
    }

    // Create verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Create new user
    const user = new User({
      name,
      email,
      password,
      emailVerificationToken,
      emailVerificationTokenExpire,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    });

    // Send verification email (optional)
    // await sendEmail({
    //   to: email,
    //   subject: 'Email Verification',
    //   message: `Click here to verify your email: ${process.env.FRONTEND_URL}/verify/${emailVerificationToken}`,
    // });

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your email.',
      token,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed.',
      error: error.message,
    });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and select password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.',
      });
    }

    // Check password
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Update last seen
    user.lastSeen = Date.now();
    user.status = 'online';
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed.',
      error: error.message,
    });
  }
};

// Logout User
export const logout = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      user.status = 'offline';
      user.lastSeen = Date.now();
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Logout successful.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Logout failed.',
      error: error.message,
    });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User with this email does not exist.',
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetTokenExpire = Date.now() + 60 * 60 * 1000; // 1 hour

    await user.save();

    // Send email with reset link
    // await sendEmail({
    //   to: email,
    //   subject: 'Password Reset Request',
    //   message: `Click here to reset your password: ${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
    // });

    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email.',
      resetToken, // Remove in production
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to process forgot password request.',
      error: error.message,
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token.',
      });
    }

    // Update password
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful. Please login with your new password.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to reset password.',
      error: error.message,
    });
  }
};

// Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token.',
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify email.',
      error: error.message,
    });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.status(200).json({
      success: true,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user.',
      error: error.message,
    });
  }
};
