import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompanyDetails, getCompanyDetailsById, registerCompany, updateCompanyDetails } from "../controllers/companyController.js";
import { singleUpload } from "../middlewares/multer.js";

const CompanyRouter = express.Router();

CompanyRouter.route("/register").post(isAuthenticated,registerCompany); 
CompanyRouter.route("/get").get(isAuthenticated,getCompanyDetails); 
CompanyRouter.route("/get/:id").get(isAuthenticated,getCompanyDetailsById); 
CompanyRouter.route("/update/:id").put(isAuthenticated, singleUpload , updateCompanyDetails); 

export default CompanyRouter;