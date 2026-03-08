import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    if (req.user.role !== "applicant") {
      return res.status(403).json({
        message: "Only applicants can apply",
        success: false,
      });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applicants.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Application submitted successfully",
      success: true,
    });
  } catch (error) {
     console.error("APPLY JOB ERROR 👉", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    if(req.user.role !== "applicant"){
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this route",
      });
    }

    const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        select: " -createdBy",
        populate: { path: "company", select: "name location website" },
      })
      .sort({ createdAt: -1 });

    if (!applications.length) {
      return res.status(404).json({
        message: "No applied jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applied jobs fetched successfully",
      success: true,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applicants",
      populate: { path: "applicant" },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to view applicants for this job",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applicants fetched successfully",
      success: true,
      applicants: job.applicants,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        message: "Not authorized",
        success: false,
      });
    }

    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};
