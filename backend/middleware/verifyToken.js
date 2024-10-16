import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded Token:', decoded);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Unauthorized: invalid token' });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(500).json({ message: `Something went wrong: ${error.message}` });
  }
}