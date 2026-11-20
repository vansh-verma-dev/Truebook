import mongoose from "mongoose";
import Company from "../models/Company.Mod.js";

// Create a new company
const createCompany = async (req, res) => {
    try {
        const newCompany = await Company.create({
            ...req.body,
            owner: req.user._id,
        });
        res.status(201).json({
            success: true,
            message: "compnay create successfull...",
            details: newCompany
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Get User All company
const getAllCompany = async (req, res) => {
    try {
        const Newdata = await Company.find({
            owner: req.user._id,
            isActive: true,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            totalCompany: Newdata.length,
            data: Newdata
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Update Compnay
const updateCompany = async (req, res) => {
    try {
        const updateData = await Company.findByIdAndUpdate(
            {
                _id: req.params.id,
                owner: req.user._id,
                isActive: true
            },
            {
                $set: req.body
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updateData) {
            return res.status(400).json({
                success: false,
                message: "Company not found"
            })
        };

        res.status(200).json({
            success: false,
            message: "Company Update Successfully..",
            data: updateData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// delete Company 
const deleteCompany = async (req, res) => {
    try {
        const deleteData = await Company.findByIdAndDelete(
            {
                _id: req.params.id,
                owner: req.user._id,
                isActive: true

            },
            {
                $set: {
                    isActive: false
                },
            },
            {
                new: true
            }
        );
         if (!deleteData) {
            return res.status(400).json({
                success: false,
                message: "Company not found"
            })
        };
           res.status(200).json({
            success: true,
            message: "Company deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
} 

const getSingleCompany = async (req, res) => {
    try {
        const getData = await Company.findById(
            {
                _id: req.params.id,
                owner: req.user._id,
                isActive: true
            }
        );
         if (!getData) {
            return res.status(400).json({
                success: false,
                message: "Company not found"
            })
        };
           res.status(200).json({
            success: true,
            message: "Company fetched successfully" ,
            data : getData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export { createCompany, getAllCompany, updateCompany , deleteCompany  , getSingleCompany};

