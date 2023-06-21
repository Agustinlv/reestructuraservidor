//Module imports
import { Router } from 'express';

const router = Router();

//File imports
import { getProducts, getProductByID, addProduct, updateProduct, deleteProduct } from '../dao/controllers/product.controller.js';

router.get('/', getProducts);

router.get('/:pid', getProductByID);

router.post('/', addProduct);

router.put('/:pid', updateProduct);

router.delete('/:pid', deleteProduct);

export default router;