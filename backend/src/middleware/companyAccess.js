import mongoose from "mongoose";
import Company from "../models/Company.Mod.js";

const checkCompany = async (req, res, next) => {
  try {
    const { companyId } = req.params;

    if (!mongoose.isValidObjectId(companyId)) {
      return res.status(400).json({ success: false, message: "Invalid company id" });
    }

    const company = await Company.findOne({
      _id: companyId,
      owner: req.user._id,
      isActive: true,
    });

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    req.company = company;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default checkCompany;