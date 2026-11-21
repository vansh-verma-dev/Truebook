import ledger from "../models/ledger.Mod.js";
import Voucher from "../models/voucher.Mod.js";
import mongoose from "mongoose";

const groups = ledger.schema.path("group").enumValues;

const createLedger = async (req, res) => {
    try {
        const { name,
            group,
            openingBalance,
            openingType,
            phone,
            email,
            gstin,
            address,
            city,
            state, } = req.body

        if (typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Ledger name is required"
            })
        };
        if (typeof group !== "string" || !groups.includes(group)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ledger group"
            })
        }

        const newLedger = await ledger.create({
            company: req.company._id,
            name,
            group,
            openingBalance,
            openingType,
            phone,
            email,
            gstin,
            address,
            city,
            state,
        });
        res.status(200).json({
            success: true,
            message: "ledger create Successfully..",
            ledger: newLedger
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Ledger with this name already exists",
            });
        }
        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: error.message });

    }
}

// get ledger 

const getLedger = async (req, res) => {
    try {
        const newledger = await ledger.find({
            company: req.company._id,
            isActive: true,
        }).sort({ name: 1 });

        res.status(200).json({
            success: true,
            message: "Ledger fetched succesfully..",
            ledger: newledger
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getSingleLedger = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ledger id",
            });
        }
        const foundLedger = await ledger.findOne({
            _id: id,
            company: req.company._id,
            isActive: true,
        });

        if (!foundLedger) {
            res.status(400).json({
                success: false,
                message: "Ledger Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "ledger fetched success..",
            ledger: foundLedger
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateLedger = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ledger id" });
    }

    const allowedFields = [
      "name",
      "group",
      "openingBalance",
      "openingType",
      "phone",
      "email",
      "gstin",
      "address",
      "city",
      "state",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: "Nothing to update" });
    }

    const updatedLedger = await ledger.findOneAndUpdate(
      { _id: id, company: req.company._id, isActive: true },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedLedger) {
      return res.status(404).json({ success: false, message: "Ledger not found" });
    }

    res.status(200).json({
      success: true,
      message: "Ledger updated successfully",
      ledger: updatedLedger,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Ledger with this name already exists",
      });
    }
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

//delete ledger


const deleteLedger = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ledger id" });
    }

    const foundLedger = await ledger.findOne({
      _id: id,
      company: req.company._id,
      isActive: true,
    });

    if (!foundLedger) {
      return res.status(404).json({ success: false, message: "Ledger not found" });
    }

    if (foundLedger.isDefault) {
      return res.status(400).json({
        success: false,
        message: "Default ledger cannot be deleted",
      });
    }

    const usedInVoucher = await Voucher.exists({
      company: req.company._id,
      isDeleted: false,
      "entries.ledger": id,
    });

    if (usedInVoucher) {
      return res.status(400).json({
        success: false,
        message: "This ledger is used in vouchers, so it cannot be deleted",
      });
    }

    foundLedger.isActive = false;
    await foundLedger.save();

    res.status(200).json({
      success: true,
      message: "Ledger deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createLedger, getLedger, getSingleLedger, updateLedger, deleteLedger };