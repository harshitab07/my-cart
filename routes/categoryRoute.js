import express from 'express';
import { adminAccess, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCategoryController, getAllCategoriesController, updateCategoryController, getCategoryController, deleteCategoryController } from '../controller/categoryController.js';

const router = express.Router();

// router for creating category
router.post('/create-category', requireSignIn, adminAccess, createCategoryController);

// updating category
router.put('/update-category', requireSignIn, adminAccess, updateCategoryController);

// get all categories
router.get('/get-categories', getAllCategoriesController);

// get one category
router.get('/get-category', getCategoryController);

// delete category
router.delete('/delete-category', requireSignIn, adminAccess, deleteCategoryController);

export default router;