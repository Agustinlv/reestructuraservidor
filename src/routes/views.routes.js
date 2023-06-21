//Module imports
import { Router } from "express";
import passport from "passport";

const router = Router();

//File imports
import { renderProducts, renderCart, renderProfile, renderRegister, renderLogin, redirectProducts } from '../dao/controllers/view.controller.js';
import { publicAccess } from "../middlewares/access.js";

router.get('/', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), redirectProducts);

router.get('/login', publicAccess, renderLogin);

router.get('/register', publicAccess, renderRegister);

router.get('/profile', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), renderProfile);

router.get('/carts/:cid', renderCart);

router.get('/products', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), renderProducts);

export default router;