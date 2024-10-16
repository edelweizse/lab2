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

export const signin = (req, res) => {
  res.send('Signin route');
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