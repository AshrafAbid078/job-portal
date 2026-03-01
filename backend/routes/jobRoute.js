import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getJobById, getJobs, getJobsByUser, postJob, updateJobDetails } from "../controllers/jobController.js";


const JobRouter = express.Router();

JobRouter.route("/post").post(isAuthenticated,postJob); 
JobRouter.route("/get").get(getJobs);
JobRouter.route("/my").get(isAuthenticated, getJobsByUser);
JobRouter.route("/get/:id").get(isAuthenticated, getJobById);
JobRouter.route("/update/:id").put(isAuthenticated,updateJobDetails)


export default JobRouter;