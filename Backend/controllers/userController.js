// Logic of create an account and the login on the website
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY);
}

// Route for user Login is in the router folder
// we can check from going thunder client and give route of loginUser is it working or not?
const loginUser = async (req, res) => {
    try{
        // This is what the user is passed from the forms
        const { email, password } = req.body;
        // This is where the we are matchig if the given user email is present in data base or not
        const user = await userModel.findOne({ email });
        // if not present then do not let them login
        if (!user) {
            return res.json({success: false, message: "User doesn't exists"});   
        }
        // If the email present then check the password of user given and the password which stored in the database
        const isMatched = await bcrypt.compare(password, user.password);  // return in boolean

        // if this password is not matching means user provided wrong password
        if (!isMatched) {
            return res.json({
              success: false,
              message: "Invalid credentials",
            });
          }
          const token = createToken(user._id);
          res.json({ success: true, message: "User credentials are correct", token });
        } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message });
        }
};
      
// Route for user Registration is in route folder
// We can check this function is working or not on thunder client by passing json of name email and password in body
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists in the database
        // If a user with the given email exists, 'exists' will contain the user data; if not, it will be undefined.
        const exists = await userModel.findOne({ email });
        // if exists 
        if (exists) {
            return res.json({success: false, message: "User already exists"});
        } 

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please Enter a valid email"});
        }

        // validating password lenght
        if (password.lenght < 8) {
            return res.json({success: false, message: "Please Enter a strong password"});
        }

        // If password and email both presnet and valid then we gonna create the account for that user

        // Hashing user password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // This is how we can create the user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        // For storing the user into the data base
        const user = await newUser.save();

        // from  where the user can log in into the website
        // _id is from the user because whenever the user is created that time an ID is generated by itself
        const token = createToken(user._id);
        res.json({success: true, token});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Create basic authentication mechanism for an admin
const adminLogin = async (req, res) => {
    try {
        // what email and password is submitted by the user
        const {email, password} = req.body;
        // if its match admin credentials then jwt token is created
        // This token if for preventing that all time login credentials give for the login
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // create the token with combination of email and password
            const token = jwt.sign(email+password, process.env.JWT_SECRET_KEY);
            res.json({success: true, token});
        }
    } catch (error) {
        res.json({success: false, message: error.message});
        console.log("Error in the adminLogin in user control");
    }
}
// We collect the token from here and gonna pass it to middle ware

export {
    loginUser,
    registerUser,
    adminLogin,
}