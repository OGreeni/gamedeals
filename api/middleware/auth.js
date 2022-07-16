import jwt from 'jsonwebtoken';

const config = process.env;

export const verifyToken = (req, res, next) => {
  const token = req.cookies.JWT_TOKEN.split(' ')[1];

  if (!token) {
    const error = new Error('Authentication token required');
    error.statusCode = 403;
    return next(error);
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    req.user = decoded;
    return next();
  } catch (err) {
    const error = new Error('Invalid authentication token supplied');
    error.statusCode = 401;
    return next(error);
  }
};
