import express from "express";
import { authenticate,authorizeAdim } from "../middlewares/authMiddleware.js";
import { 
    createCategory,
    updateCategory,
    deleteCategory,
    listCategory,
    readCategory,
} from "../controllers/categoryControler.js";

const router = express.Router()

router.route('/')
      .post(authenticate,authorizeAdim,createCategory)
router.route('/:categoryId')
      .put(authenticate,authorizeAdim,updateCategory)
      .delete(authenticate,authorizeAdim,deleteCategory)
router.route('/categories')
      .get(listCategory)
router.route('/:id').get(readCategory)
export default router