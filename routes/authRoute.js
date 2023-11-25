import express from 'express';
import { registerController, loginController, forgotPasswordController, profileController, ordersController } from '../controller/authController.js';
import { adminAccess, requireSignIn, userAccess } from '../middlewares/authMiddleware.js';

const router = express.Router();

// For signup --> POST method
router.post('/register', registerController);

// For login --> POST method
router.post('/login', loginController);

// protected user auth route
router.get('/user-auth', requireSignIn, userAccess, (req, res) => {
    res.status(200).send({success: true})
})

// forgot password
router.post('/forgot-password', forgotPasswordController);

// protected admin auth route
router.get('/admin-auth', requireSignIn, adminAccess, (req, res) => {
    res.status(200).send({success: true})
});

// update user
router.post('/profile', requireSignIn, profileController);

//orders
router.get('/orders', requireSignIn, ordersController);

export default router;