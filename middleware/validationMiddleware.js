import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import mongoose from 'mongoose';
import User from '../models/userModel.js';

// import Job from '../models/jobModel.js';

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
  body('lastName').notEmpty().withMessage('last name is required'),
]);

//NOTE: NEEDS SLIMING DOWN
export const validateTransactionInput = withValidationErrors([
  body('description').notEmpty().withMessage('Description is required'),
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Wrong format, please use numbers'),
  body('divisionType').notEmpty().withMessage('Division type is required'),
  body('creator').notEmpty().withMessage('Creator is required'),
  body('payer').notEmpty().withMessage('Payer is required'),
  body('shares').custom((shares, { req }) => {
    const { divisionType, amount } = req.body;

    if (divisionType === 'split equally') {
      // For 'split equally', shares field can be empty
      return true;
    }

    // For other division types, both shareholderId and share should not be empty
    if (!shares || !shares.length) {
      throw new Error('Shares field is required');
    }

    for (const share of shares) {
      if (!share.shareholderId || !share.share) {
        throw new Error('Both shareholderId and share are required');
      }
    }

    // shares.share match amount
    let totalShares = 0;
    shares.forEach((shareObj, index) => {
      const shareValue = shareObj.share;
      totalShares = totalShares + shareValue;
    });

    /* Checking: total, or small deviation
    if (totalShares > amount - 0.05 && totalShares < amount + 0.05) {
      return true;
    } else {
      throw new Error('Sums do not add up.');
    }*/

    return true;
  }),
]);
