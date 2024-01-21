import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

//Protects Transaction routes as an example --> server.js
export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('authentication invalid');

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === '64b2c07ccac2efc972ab0eca';
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

//not used yet.Admin routes later.
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};
