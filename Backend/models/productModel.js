// Creating mongoes model , from using this we can store the data in data base
import mongoose from "mongoose";

// creating the schema for Products
// Schema is the structur using that we can create the data into the data base
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String, 
        required: true,
    },
    sizes: {
        type: Array,
        required: false,
    },
    bestseller: {
        type: Boolean,
        required: true
    },
    date: {
        type: Number,
        required: true,
    }
}); 

//  using above schema we create mongo model
// When ever we run the project the model gonna be created multiple times
// So we gonna use or opearator if model is already created then not create it
const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
