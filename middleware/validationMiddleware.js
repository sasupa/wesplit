import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import mongoose from 'mongoose';

// import Job from '../models/jobModel.js';
// import User from '../models/userModel.js';
// import mongoose from 'mongoose';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        // //checking if we need throw notfound
        // if (errorMessages[0].startsWith('no job')) {
        //   throw new NotFoundError(errorMessages);
        // }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

//chaining is based on the Schema/jobModel.js

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);

//chaining is based on the Schema/userModel.js
export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);

//NOTE: NEEDS SLIMING DOWN
export const validateTransactionInput = withValidationErrors([
  body('description').notEmpty().withMessage('description is required'),
  body('amount')
    .notEmpty()
    .withMessage('password is required')
    .isNumeric()
    .withMessage('wrong format, please use numbers'),
  body('divisionType')
    .notEmpty()
    .withMessage('division type is required is required'),
  body('creator').notEmpty().withMessage('creator is required'),
  body('payer').notEmpty().withMessage('creator is required'),
  body('shares').custom((shares) => {
    // Check if share.share exists and is of type Decimal128
    if (share.share && share.share instanceof mongoose.Types.Decimal128) {
      // Additional validation logic for Decimal128, if needed
    } else {
      // Throw an error with a custom message for this specific validation failure
      throw new Error(
        'Invalid format for share or share.share is not of type Decimal128'
      );
    }

    return true;
  }),
]);
