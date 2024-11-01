// first the data from user comes here 
// then the data is validated
// then the data is stored in the database
// when user want to access data from database that time it not gonna be used
import multer from "multer"


// Set up how we want to store the uploaded files
const storage = multer.diskStorage({
    // Here, we define how to name the uploaded files
    filename: function (req, file, callback) {
        // We’re keeping the original name of the file that the user uploads
        callback(null, file.originalname);
    }
});

// Now, we create a Multer instance with our storage settings
// We’re telling Multer to use the storage settings we just defined
const upload = multer({
    storage 
});

export default upload;