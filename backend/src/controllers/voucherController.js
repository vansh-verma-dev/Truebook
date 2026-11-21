import mongoose from "mongoose";
import Voucher from "../models/voucher.Mod.js";
import Ledger from "../models/ledger.Mod.js";

const voucherTypes = [
  "receipt",
  "payment",
  "contra",
  "journal",
  "sales",
  "purchase",
  "salesReturn",
  "purchaseReturn",
];

const studentTypes = ["receipt", "payment", "contra", "journal"];
const paymentModes = ["cash", "bank", "upi", "cheque", "other"];

const createVoucher = async (req, res) => {
  try {
    const { voucherType, date, narration, refNo, paymentMode, entries } = req.body;

    if (typeof voucherType !== "string" || !voucherTypes.includes(voucherType)) {
      return res.status(400).json({ success: false, message: "Invalid voucher type" });
    }

    if (req.user.role === "student" && !studentTypes.includes(voucherType)) {
      return res.status(403).json({
        success: false,
        message: "Student account can create only receipt, payment, contra and journal",
      });
    }

    if (!date || isNaN(new Date(date))) {
      return res.status(400).json({ success: false, message: "Valid date is required" });
    }

    if (paymentMode && !paymentModes.includes(paymentMode)) {
      return res.status(400).json({ success: false, message: "Invalid payment mode" });
    }

    if (!Array.isArray(entries) || entries.length < 2) {
      return res.status(400).json({
        success: false,
        message: "At least 2 entries are required",
      });
    }

    const cleanEntries = [];

    for (const entry of entries) {
      const amount = Number(entry.amount);

      if (
        typeof entry.ledger !== "string" ||
        !mongoose.isValidObjectId(entry.ledger) ||
        !["Dr", "Cr"].includes(entry.type) ||
        !(amount > 0)
      ) {
        return res.status(400).json({
          success: false,
          message: "Each entry needs a ledger, type (Dr/Cr) and amount greater than 0",
        });
      }

      cleanEntries.push({ ledger: entry.ledger, type: entry.type, amount });
    }

    const totalDr = cleanEntries
      .filter((entry) => entry.type === "Dr")
      .reduce((sum, entry) => sum + entry.amount, 0);

    const totalCr = cleanEntries
      .filter((entry) => entry.type === "Cr")
      .reduce((sum, entry) => sum + entry.amount, 0);

    if (Math.round(totalDr * 100) !== Math.round(totalCr * 100)) {
      return res.status(400).json({
        success: false,
        message: "Total debit and total credit must be equal",
      });
    }

    const ledgerIds = [...new Set(cleanEntries.map((entry) => entry.ledger))];

    const ledgerCount = await Ledger.countDocuments({
      _id: { $in: ledgerIds },
      company: req.company._id,
      isActive: true,
    });

    if (ledgerCount !== ledgerIds.length) {
      return res.status(400).json({
        success: false,
        message: "One or more ledgers are invalid for this company",
      });
    }

    const lastVoucher = await Voucher.findOne({
      company: req.company._id,
      voucherType,
    }).sort({ voucherNumber: -1 });

    const voucherNumber = lastVoucher ? lastVoucher.voucherNumber + 1 : 1;

    const voucher = await Voucher.create({
      company: req.company._id,
      createdBy: req.user._id,
      voucherType,
      voucherNumber,
      date,
      narration: typeof narration === "string" ? narration : "",
      refNo: typeof refNo === "string" ? refNo : "",
      paymentMode,
      entries: cleanEntries,
      totalAmount: Math.round(totalDr * 100) / 100,
    });

    res.status(201).json({
      success: true,
      message: "Voucher created successfully",
      data: voucher,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Voucher number clash, please try again",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

const getVouchers = async (req, res) => {
  try {
    const { type, from, to } = req.query;

    const query = { company: req.company._id, isDeleted: false };

    if (type) {
      if (typeof type !== "string" || !voucherTypes.includes(type)) {
        return res.status(400).json({ success: false, message: "Invalid voucher type" });
      }
      query.voucherType = type;
    }

    if (from || to) {
      query.date = {};

      if (from) {
        const fromDate = new Date(from);
        if (typeof from !== "string" || isNaN(fromDate)) {
          return res.status(400).json({ success: false, message: "Invalid from date" });
        }
        query.date.$gte = fromDate;
      }

      if (to) {
        const toDate = new Date(to);
        if (typeof to !== "string" || isNaN(toDate)) {
          return res.status(400).json({ success: false, message: "Invalid to date" });
        }
        toDate.setUTCHours(23, 59, 59, 999);
        query.date.$lte = toDate;
      }
    }

    const vouchers = await Voucher.find(query)
      .sort({ date: -1, voucherNumber: -1 })
      .populate("entries.ledger", "name group");

    res.status(200).json({
      success: true,
      count: vouchers.length,
      data: vouchers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createVoucher, getVouchers };