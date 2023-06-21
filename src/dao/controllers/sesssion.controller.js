import userModel from "../models/user.models.js";
import { createCart } from "./cart.controller.js";
import { createHash } from '../../utils.js';
import { generateToken } from "../../config/token.js";

export const register = async (req, res) => {

    const { first_name, last_name, email, age, password } = req.body;

    const inUse = await userModel.findOne({email: email});

    if (inUse) return res.status(400).send({status: 'Error', message: 'The email is already in use'});

    const user = { first_name, last_name, email, age, password: createHash(password) };

    try {

        await userModel.create(user);

        return res.status(202).send({status: 'Success', message: 'User registered'});

    } catch (err) {

        return res.status(400).send({status: "Error", message: err});

    };

};

export const login = async (req, res) => {

    const { email } = req.body;

    req.user = await userModel.findOne({email: email});

    req.params.uid = req.user._id;

    await createCart(req, res);

    const access_token = generateToken(req.user);

    res.cookie('token', access_token, {httpOnly: true}).send({
        status: 'Success',
        message: 'Correct Login'
    });

};

export const logout = (req, res) => {

    res.clearCookie('token');

    res.redirect('/login');

};

export const current = (req, res) => {
    
    res.send(req.user);

};