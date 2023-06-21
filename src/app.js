//Module imports
import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from 'passport';

//File imports
import __dirname from './utils.js';
import initializePassport from './config/passport.config.js';
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import sessionRouter from './routes/sessions.routes.js'
import viewRouter from './routes/views.routes.js';
import { config } from './config/config.js';

initializePassport();

const PORT = config.server.port;

const MONGO_URL = config.mongo.url;

const app = express();

mongoose.connect(MONGO_URL);

//Cookie Parser
app.use(cookieParser());

//Express
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

//Passport
app.use(passport.initialize());

//Handlebars
app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');

app.set('view engine', 'handlebars');

//Rutas
app.use('/api/products', productRouter);

app.use('/api/carts', cartRouter);

app.use('/api/sessions', sessionRouter);

app.use('/', viewRouter);

app.listen(PORT, () => {console.log(`El servidor está corriendo en el puerto ${PORT}`)});