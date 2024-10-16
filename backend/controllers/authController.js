import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import { genTokenAndSetCookies } from '../utils/genTokenAndSetCookies.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const ifUserExists = await User.findOne({ email });
    if (ifUserExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // create new user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    genTokenAndSetCookies(res, user._id);

    res.status(201).json({ 
      message: 'User created successfully',
      user:{
        ...user._doc,
        password: null
      }
    });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong: ${error.message}` });
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // login user
    genTokenAndSetCookies(res, user._id);
    user.lastLogin = Date.now();
    await user.save();

    res.status(200).json({
      message: 'Logged in successfully',
      user: {
        ...user._doc,
        password: null
      }
    });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong: ${error.message}` });
  }
}

export const logout = (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(400).json({ message: 'User is not logged in' });
    }
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong: ${error.message}` });
  }
}

export const checkAuth = async (req, res) => {
  try {
    console.log("user id: ", req.userId)
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ message: `Something went wrong: ${error.message}` });
  }
}