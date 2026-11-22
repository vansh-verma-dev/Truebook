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
const invoiceTypes = ["sales", "purchase"];
const paymentModes = ["cash", "bank", "upi", "cheque", "other"];
const notPartyGroups = ["sales", "purchase", "dutiesTaxes"];

const round2 = (n) => Math.round(n * 100) / 100;

const buildManualEntries = async (body, companyId) => {
  const { entries } = body;

  if (!Array.isArray(entries) || entries.length < 2) {
    return { error: "At least 2 entries are required" };
  }

  const cleanEntries = [];

  for (const entry of entries) {
    const amount = Number(entry?.amount);

    if (
      typeof entry?.ledger !== "string" ||
      !mongoose.isValidObjectId(entry.ledger) ||
      !["Dr", "Cr"].includes(entry.type) ||
      !(amount > 0)
    ) {
      return { error: "Each entry needs a ledger, type (Dr/Cr) and amount greater than 0" };
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
    return { error: "Total debit and total credit must be equal" };
  }

  const ledgerIds = [...new Set(cleanEntries.map((entry) => entry.ledger))];

  const ledgerCount = await Ledger.countDocuments({
    _id: { $in: ledgerIds },
    company: companyId,
    isActive: true,
  });

  if (ledgerCount !== ledgerIds.length) {
    return { error: "One or more ledgers are invalid for this company" };
  }

  return { entries: cleanEntries, totalAmount: round2(totalDr) };
};

const buildInvoice = async (body, voucherType, companyId) => {
  const { party, items } = body;

  if (typeof party !== "string" || !mongoose.isValidObjectId(party)) {
    return { error: "Party is required" };
  }

  if (!Array.isArray(items) || items.length === 0) {
    return { error: "At least 1 item is required" };
  }

  const cleanItems = [];
  let subTotal = 0;
  let gstTotal = 0;

  for (const item of items) {
    const quantity = Number(item?.quantity);
    const rate = Number(item?.rate);
    const gstRate = Number(item?.gstRate || 0);

    if (
      typeof item?.name !== "string" ||
      item.name.trim() === "" ||
      !(quantity > 0) ||
      !(rate >= 0) ||
      !(gstRate >= 0 && gstRate <= 100)
    ) {
      return { error: "Each item needs a name, quantity greater than 0, a valid rate and GST rate" };
    }

    const amount = round2(quantity * rate);

    subTotal += amount;
    gstTotal += (amount * gstRate) / 100;

    cleanItems.push({
      name: item.name.trim(),
      quantity,
      unit: typeof item.unit === "string" && item.unit ? item.unit : "Pcs",
      rate,
      gstRate,
      amount,
    });
  }

  subTotal = round2(subTotal);
  gstTotal = round2(gstTotal);
  const total = round2(subTotal + gstTotal);

  if (!(total > 0)) {
    return { error: "Invoice total must be greater than 0" };
  }

  const partyLedger = await Ledger.findOne({
    _id: party,
    company: companyId,
    isActive: true,
  });

  if (!partyLedger || notPartyGroups.includes(partyLedger.group)) {
    return { error: "Invalid party for this company" };
  }

  const isSales = voucherType === "sales";

  const mainLedger = await Ledger.findOne({
    company: companyId,
    group: isSales ? "sales" : "purchase",
    isActive: true,
  });

  if (!mainLedger) {
    return {
      error: isSales
        ? "Create a Sales A/c ledger (group: sales) first"
        : "Create a Purchase A/c ledger (group: purchase) first",
    };
  }

  let gstLedger = null;

  if (gstTotal > 0) {
    const gstName = isSales ? "Output GST" : "Input GST";

    gstLedger = await Ledger.findOne({
      company: companyId,
      group: "dutiesTaxes",
      name: { $regex: `^${gstName}$`, $options: "i" },
      isActive: true,
    });

    if (!gstLedger) {
      return { error: `Create a "${gstName}" ledger (group: dutiesTaxes) first` };
    }
  }

  let entries;

  if (isSales) {
    entries = [
      { ledger: partyLedger._id, type: "Dr", amount: total },
      { ledger: mainLedger._id, type: "Cr", amount: subTotal },
    ];
    if (gstLedger) entries.push({ ledger: gstLedger._id, type: "Cr", amount: gstTotal });
  } else {
    entries = [{ ledger: mainLedger._id, type: "Dr", amount: subTotal }];
    if (gstLedger) entries.push({ ledger: gstLedger._id, type: "Dr", amount: gstTotal });
    entries.push({ ledger: partyLedger._id, type: "Cr", amount: total });
  }

  return {
    party: partyLedger._id,
    items: cleanItems,
    entries,
    totalAmount: total,
  };
};

const createVoucher = async (req, res) => {
  try {
    const { voucherType, date, narration, refNo, paymentMode } = req.body;

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

    const isInvoice = invoiceTypes.includes(voucherType);

    const built = isInvoice
      ? await buildInvoice(req.body, voucherType, req.company._id)
      : await buildManualEntries(req.body, req.company._id);

    if (built.error) {
      return res.status(400).json({ success: false, message: built.error });
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
      paymentMode: isInvoice ? undefined : paymentMode,
      party: built.party,
      items: built.items,
      entries: built.entries,
      totalAmount: built.totalAmount,
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