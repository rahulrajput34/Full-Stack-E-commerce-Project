import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

/**
 * Adds a new product to the database.
 * The product's images are first uploaded to Cloudinary, and the resulting URLs are stored in the database.
 *
 * @async
 * @function addProduct
 * @param {Object} req - Express request object containing product data and files.
 * @param {Object} res - Express response object.
 */
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Extract images from request files
        const images = ['image1', 'image2', 'image3', 'image4']
            .map(key => req.files[key] && req.files[key][0])
            .filter(image => image !== undefined);

        // Upload images to Cloudinary and get their URLs
        const imagesUrl = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Prepare product data to match the schema
        const productData = {
            name,
            description,
            price: Number(price),
            images: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true",
            date: Date.now(),
        };

        // Save product to the database
        const product = new productModel(productData);
        await product.save();
        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error("Error adding product:", error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Lists all products stored in the database.
 *
 * @async
 * @function listProducts
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error("Error listing products:", error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Removes a product from the database.
 *
 * @async
 * @function removeProducts
 * @param {Object} req - Express request object containing the product ID.
 * @param {Object} res - Express response object.
 */
const removeProducts = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error("Error removing product:", error);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Fetches details for a single product.
 *
 * @async
 * @function singleProducts
 * @param {Object} req - Express request object containing the product ID.
 * @param {Object} res - Express response object.
 */
const singleProducts = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.json({ success: false, message: error.message });
    }
};

export {
    addProduct,
    listProducts,
    removeProducts,
    singleProducts
};
