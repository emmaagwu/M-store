import express from 'express';

import Product from '../models/product.model.js';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controller.js/product.controller.js';

const router = express.Router();

router.get('/', getProducts)

router.post("/", createProduct);


router.delete("/:id", deleteProduct);


router.put("/:id", updateProduct);


export default router;