import express from 'express';
import { adminAccess, requireSignIn, userAccess } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, filterProductController, getAllProductsController, getProductController, getProductPhotoController, updateProductController, getProductCountController, getProductListController, searchProductController, relatedProductsController, productCategoryController, getPaymentController, makePaymentController} from '../controller/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// for creating product
router.post('/create-product', requireSignIn, adminAccess, formidable(), createProductController);

// get all products
router.get('/get-products', getAllProductsController);

// get single product
router.get('/get-product/:id', getProductController);

// get product's photo
router.get('/get-product-photo/:id', getProductPhotoController);

// delete product
router.delete('/delete-product/:id', requireSignIn, adminAccess, formidable(), deleteProductController);

// update product
router.put('/update-product/:id', requireSignIn, adminAccess, formidable(), updateProductController);

// filter products
router.post('/filter-products', filterProductController);

// product count
router.get('/get-products-count', getProductCountController);

// product per page
router.get('/product-list/:page', getProductListController);

// search product
router.get('/search-product/:keywords', searchProductController);

// related products
router.get('/similar-products/:pid/:cid', relatedProductsController);

// category wise products
router.get('/product-category/:id', productCategoryController)

//get payment gateway token
router.get('/payment-token', getPaymentController);

//make payment
router.post('/payment', requireSignIn, makePaymentController);
export default router;