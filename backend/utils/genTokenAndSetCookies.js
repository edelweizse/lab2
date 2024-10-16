import jwt from 'jsonwebtoken';

export const genTokenAndSetCookies = (res, user_id) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });

  return token;
}