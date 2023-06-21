import cartModel from "../dao/models/cart.model.js";
import productModel from "../dao/models/product.model.js";
import userModel from "../dao/models/user.models.js";
import { validatePassword } from "../utils.js";

export const validateLogin = async (req, res, next) => {

    const { email, password } = req.body;
    
    const user = await userModel.findOne({email: email});

    if (!user) return res.status(400).send({
        status: 'Error',
        message: 'Incorrect credentials'
    });

    const isValidPassword = validatePassword(password, user);
    
    if (!isValidPassword) return res.status(400).send({
        status: 'Error',
        message: 'Incorrect credentials'
    });

    next();

};

export const validateUser = async (req, res, next) => {

    next();

};

export const validateCart = async (req, res, next) => {

    const cid = req.params.cid;

    const cart = await cartModel.findById(cid);

    if (!cart) {
        
        return res.status(400).send({
            status: 'Error',
            message: `No se pudo encontrar un cart con el ID ${cid}`
        });

    };

    next();

};

export const validateProduct = async (req, res, next) => {

    const pid = req.params.pid;
    
    const product = await productModel.findById(pid);

    if (!product) {
        
        return res.status(400).send({
            status: 'Error',
            message: `No se pudo encontrar un producto con el ID ${pid}`
        });

    };

    next();

};

export const validateQuantity = async (req, res, next) => {

    const quantity = req.body.quantity;

    if (!quantity) {

        return res.status(400).send({
            status: "Error",
            message: "No se encontró una cantidad válida en el body"
        });
    
    };

    next();

};