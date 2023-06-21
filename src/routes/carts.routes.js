//Module imports
import { Router } from 'express';

const router = Router();

//File imports
import { addToCart, createCart, deleteFromCart, emptyCart, getCart, replaceCart, updateProductQty } from '../dao/controllers/cart.controller.js';
import { validateCart, validateProduct, validateUser, validateQuantity } from '../middlewares/validations.js';

router.post('/:uid', validateUser, createCart);

router.post('/:cid/product/:pid', validateCart, validateProduct, addToCart);

router.delete('/:cid/product/:pid', validateCart, validateProduct, deleteFromCart);

router.delete('/:cid', validateCart, emptyCart);

router.get('/:cid', validateCart, getCart);

router.put('/:cid', validateCart, replaceCart);

router.put('/:cid/product/:pid', validateCart, validateProduct, validateQuantity, updateProductQty);

export default router;