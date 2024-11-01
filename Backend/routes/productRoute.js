import express from 'express';
import { addProduct, listProducts, removeProducts, singleProducts } from '../controllers/productContoller.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

// adding the routes to the products
const productRouter = express.Router();

// to add the images we need to send all the images in this route
// From using mutliple middle wares we can get image from the user fast

// To give the authentication to the admin of apload and remove we added over
productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 },{ name: 'image2', maxCount: 1 },{ name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }]), addProduct)
productRouter.post('/remove',adminAuth, removeProducts)
productRouter.post('/single', singleProducts)
productRouter.get('/list', listProducts)

export default productRouter;