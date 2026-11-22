import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    ledger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ledger",
      required: true,
    },
    type: {
      type: String,
      enum: ["Dr", "Cr"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
  },
  { _id: false }
);

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0.01 },
    unit: { type: String, default: "Pcs" },
    rate: { type: Number, required: true, min: 0 },
    gstRate: { type: Number, default: 0, min: 0 },
    amount: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const voucherSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    voucherType: {
      type: String,
      enum: [
        "receipt",
        "payment",
        "contra",
        "journal",
        "sales",
        "purchase",
        "salesReturn",
        "purchaseReturn",
      ],
      required: true,
    },

    voucherNumber: { type: Number, required: true },
    date: { type: Date, required: true },
    narration: { type: String, trim: true, default: "" },
    refNo: { type: String, trim: true, default: "" },

    paymentMode: {
      type: String,
      enum: ["cash", "bank", "upi", "cheque", "other"],
    },
    party: { type: mongoose.Schema.Types.ObjectId, ref: "Ledger" },
    items: [itemSchema],
    
    entries: {
      type: [entrySchema],
      validate: {
        validator: (arr) => arr.length >= 2,
        message: " minimum  2 entry  require ",
      },
    },

    totalAmount: { type: Number, required: true, min: 0.01 },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

voucherSchema.index(
  { company: 1, voucherType: 1, voucherNumber: 1 },
  { unique: true }
);

voucherSchema.index({ company: 1, date: -1 });

const Voucher = mongoose.model("Voucher", voucherSchema);

export default Voucher;