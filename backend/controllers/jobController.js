import { Job } from "../models/jobModel.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.user.id;

    // role check
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can post jobs",
        success: false,
      });
    }

    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      salary === undefined ||
      !jobType ||
      experience === undefined ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
        success: false,
      });
    }

    const job = new Job({
      title,
      description,
      location,
      requirements: requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean),
      salary: Number(salary),
      jobType,
      experience: Number(experience),
      position,
      company: companyId,
      createdBy: userId,
    });

    const savedJob = await job.save();

    return res.status(201).json({
      message: "Job posted successfully",
      job: savedJob,
      success: true,
    });
  } catch (error) {
    console.error("POST JOB ERROR:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};

    const jobs = await Job.find(keyword)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "company",
      path:"applicants",
    });
    if (!job || job.length === 0) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Job fetched successfully",
      job,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

export const getJobsByUser = async (req, res) => {
  try {
    const adminId = req.user.id;
    const jobs = await Job.find({ createdBy: adminId }).populate({
      path: "company",
    });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};
export const updateJobDetails = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      experience,
      jobType,
      requirements,
    } = req.body;

    const updateData = {
      title,
      description,
      location,
      salary,
      experience,
      jobType,
    };

    if (requirements) {
      updateData.requirements = Array.isArray(requirements)
        ? requirements
        : requirements
            .split(",")
            .map((r) => r.trim())
            .filter(Boolean);
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("company");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job details updated successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};


