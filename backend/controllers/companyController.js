import { Company } from "../models/companyModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({
      name: companyName,
    });
    if (company) {
      return res.status(400).json({
        message: "Company already registered",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.user.id,
    });
    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

export const getCompanyDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const companies = await Company.find({ userId });
    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No company details found for this user",
      });
    }
    return res.status(200).json({
      message: "Company details fetched successfully",
      companies,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

export const getCompanyDetailsById = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!company) {
      return res.status(403).json({
        message: "Not authorized",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company details fetched successfully",
      company,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

export const updateCompanyDetails = async (req, res) => {
  try {
    const { name, description, location, website } = req.body;
    const file = req.file;

    const updateData = {
      name,
      description,
      location,
      website,
    };

    if (file) {
      const fileUri = getDataUri(file);
      const upload = await cloudinary.uploader.upload(
        fileUri.content,
        { folder: "companies" }
      );
      updateData.logo = upload.secure_url;
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company details updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

