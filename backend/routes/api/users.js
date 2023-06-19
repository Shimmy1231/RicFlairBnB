const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
//Validating Signup Request Body
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .notEmpty()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .notEmpty()
    .withMessage('Please provide your first name.'),
  check('lastName')
    .notEmpty()
    .withMessage('Please provide your last name'),
  handleValidationErrors
];

// Sign up
router.post(
  '/signup',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    const checkUserName = await User.findOne({ where: { username: username } })
        if (checkUserName) return (
            res.status(403),
            res.json({
                message: 'User Already Exists',
                statusCode: '403',
                errors: { username: "User with that username already exists" }
            }));
        const checkEmail = await User.findOne({ where: { email: email } });
        if (checkEmail) return (
            res.status(403),
            res.json({
                message: 'User Already Exists',
                statusCode: '403',
                errors: { email: "User with that email already exists" }
            }));

      const user = await User.signup({ firstName, lastName, username, email, password });
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      };
      const token = await setTokenCookie(res, safeUser);
      // safeUser.token = token;
      res.status(200);
      return res.json({
        user : safeUser
      })

  }
);

// Get the Current User
router.get(
  '/current',
  requireAuth,
  async (req, res) => {
    const userId = req.user.id;
    const currentUser = await User.getCurrentUser(userId);

    return res.json({ user: currentUser })
  })

module.exports = router;
