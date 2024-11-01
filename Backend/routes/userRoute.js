import express from "express";
import { loginUser, registerUser, adminLogin } from "../controllers/userController.js";

// it will create a new router object
const userRouter = express.Router();

// Adding routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

export default userRouter;
