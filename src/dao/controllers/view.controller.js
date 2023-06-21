import productModel from '../models/product.model.js';
import cartModel from '../models/cart.model.js';

export const renderProducts = async (req, res) => {

    const {limit = 10, page = 1, category, available, sort} = req.query;
    
    let query = {};

    if (category) {
        if (available) {
            query = {category: category, stock: { $gt: 0}}
        } else {
            query = {category: category}
        }
    };
    
    const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = await productModel.paginate(
        query,
        {
            limit: limit,
            sort:{ price: sort },
            page: page,
            lean: true
        }
    );

    const payload = docs;
    
    const prevLink = hasPrevPage === false ? null : `/products?page=${prevPage}`;

    const nextLink = hasNextPage === false ? null : `/products?page=${nextPage}`;

    res.render('products', {
        status: "Success",
        payload: payload,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page: page,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
        prevLink: prevLink,
        nextLink: nextLink,
        user: req.user.user
    });

};

export const renderCart = async (req, res) => {
    
    const cid = req.params.cid;

    const cart = await cartModel.findById(cid).populate({path:'products.product'}).lean();

    res.render('cart', {
        status: "Success",
        payload: cart
    });

};

export const renderProfile = async (req, res) => {
    
    res.render('profile', {user: req.user.user});

};

export const renderRegister = async (req, res) => {

    res.render('register');

};

export const renderLogin = async (req, res) => {

    res.render('login');

};

export const redirectProducts = async (req, res) => {

    res.redirect('/products');
    
};