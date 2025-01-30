import multer from 'multer';

/**
 * Multer configuration for handling file uploads.
 * 
 * This module sets up storage options and exports a pre-configured instance
 * of Multer, ready to be used in routes that handle file uploads.
 */

// Define storage strategy for uploaded files
const storage = multer.diskStorage({
    /**
     * Specify how filenames should be handled.
     * 
     * @param {Object} req - The Express request object.
     * @param {Object} file - The file object provided by Multer.
     * @param {Function} callback - Callback function to set the file name.
     */
    filename: (req, file, callback) => {
        // Use the original name of the uploaded file as its stored name
        callback(null, file.originalname);
    }
});

// Initialize Multer with the defined storage settings
const upload = multer({ storage });

export default upload;
