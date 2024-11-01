import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
// Login of product
// function for add product
// to add the product use middle ware multer
const addProduct = async (req, res) => {
    try {
        // req.body refers to an object that contains the data sent by the client 
        // it is in-build in express
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        // to get image from file
        // console.log(req.files);   //Finee to check what user is passing
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        // We need to store this data and images into the database
        // but in the data base we can not able to store the image 
        // So first we need to upload these images on the cloudinary 
        // from cloudinary we got the url and then we can store our data into the data base
        // if anything undefined in array then remove it
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        // This is how we can covert the images to the url format
        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path, {resource_type:'image'});
                return result.secure_url;
            })
        )
        // console.log(imagesUrl);  -- fine
        
        // Now we should Store into the database
        // all the data comes in string from cloudinary
        // This below code should match the format of the product model
        const productData = {
            name,
            description,
            price: Number(price),
            images: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true"? true : false,
            date: Date.now()
        }
        // before adding this to data bace lets do console log
        // To add the product into the data base we need to import the model
        const product = new productModel(productData);
        await product.save(); // to save the product into the data base
        res.json({ success: true, message: "Product added successfully" });
        }  catch (error) {
        res.json({ success: false, message: error.message });   
    }
}

// function for List products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true, products});

    } catch (error) {
        res.json({success:false, message: error.message });
    }
}

// function for remove product
const removeProducts = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        res.json({success:false, message: error.message });
    }
}

// TODO: the code is fine but the product is not diplaying
//function for single product info
const singleProducts = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true, product});

    } catch (error) {
        res.json({success:false, message: error.message });
    }
}

export {
    addProduct,
    listProducts,
    removeProducts,
    singleProducts
}


