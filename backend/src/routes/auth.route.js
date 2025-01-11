const express = require('express');
const { body } = require('express-validator');
const { signup, login, updateProfile, checkAuth } = require('../controllers/auth.controller');
const { protectRoute } = require('../middlewares/protectRoute');
const router = express.Router();

router.post(
  '/signup',
  [
    body('username')
      .isLength({ min: 3 })
      .withMessage('The username should be at least 3 characters long.'),
    body('email').isEmail().withMessage('The email should be a valid email address.'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('The password should be at least 8 characters long.'),
  ], signup
);

router.post('/login',[
    body('email').isEmail().withMessage('The email should be a valid email address.'),
    body('password').isLength().withMessage('The password should be at least 1 characters long.')
],
    login
)

router.put('/update-profile',protectRoute ,updateProfile)

router.get('/check',protectRoute, checkAuth)

module.exports = router;
