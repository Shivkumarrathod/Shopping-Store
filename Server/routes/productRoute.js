import express from "express";
import formidable from 'express-formidable'
import { authenticate,authorizeAdim } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

import { 
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    getProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProduct,
    fetchNewProduct,
    filterProducts,
} from "../controllers/productControler.js";
const router = express.Router()

router.route('/')
      .post(authenticate,authorizeAdim,formidable(),addProduct)
      .get(fetchProducts)
router.route('/allproducts')
      .get(fetchAllProducts)
router.route('/:id/reviews')
      .post(authenticate,checkId,addProductReview)
router.get('/top',fetchTopProduct)
router.get('/new',fetchNewProduct)
router.route('/:id')
      .put(authenticate,authorizeAdim,formidable(),updateProduct)
      .delete(authenticate,authorizeAdim,deleteProduct)
      .get(getProductById)
router.route('/filtered-products').post(filterProducts)
      
export default router