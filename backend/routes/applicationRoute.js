import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAppliedJobs,
  applyJob,
  getApplicants,
  updateStatus,
} from "../controllers/applicationController.js";
import { singleUpload } from "../middlewares/multer.js";

const applicationRouter = express.Router();

applicationRouter.post("/apply/:id", isAuthenticated, applyJob);

applicationRouter.get("/get", isAuthenticated, getAppliedJobs);

applicationRouter.get("/:id/applicants", isAuthenticated, getApplicants);

applicationRouter.put("/status/:id/update", isAuthenticated, singleUpload, updateStatus);

export default applicationRouter;
