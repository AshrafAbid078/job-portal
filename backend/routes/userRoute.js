import express from "express";
import { register , login, logout,updateProfile } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const UserRouter = express.Router();

UserRouter.route("/register").post(singleUpload, register); 
UserRouter.route("/login").post(login); 
UserRouter.route("/logout").get(logout); 
UserRouter.route("/profile/update").put(isAuthenticated, singleUpload, updateProfile); 

export default UserRouter;