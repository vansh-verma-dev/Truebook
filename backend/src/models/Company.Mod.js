import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    // Owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Company Identity
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mailingName: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
      default: "",
    },

    businessType: {
      type: String,
      enum: [
        "trader",
        "manufacturer",
        "service",
        "retailer",
        "other",
      ],
      default: "trader",
    },

    industry: {
      type: String,
      trim: true,
      default: "",
    },

    // Contact Details
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    // Address
    address: {
      type: String,
      trim: true,
      default: "",
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    state: {
      type: String,
      trim: true,
      default: "",
    },

    pincode: {
      type: String,
      trim: true,
      default: "",
    },

    country: {
      type: String,
      trim: true,
      default: "India",
    },

    // Tax & GST
    gstEnabled: {
      type: Boolean,
      default: false,
    },

    gstin: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },

    gstRegistrationType: {
      type: String,
      enum: ["regular", "composition", "unregistered"],
      default: "unregistered",
    },

    pan: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },

    // Accounting Period
    financialYearStart: {
      type: Date,
      required: true,
    },

    booksBeginFrom: {
      type: Date,
      required: true,
    },

    financialYearEnd: {
      type: Date,
      required: true,
    },

    // Currency
    currency: {
      type: String,
      default: "INR",
    },

    currencySymbol: {
      type: String,
      default: "₹",
    },

    decimalPlaces: {
      type: Number,
      default: 2,
      min: 0,
      max: 4,
    },

    // Accounting Settings
    accountingMethod: {
      type: String,
      enum: ["accrual", "cash"],
      default: "accrual",
    },

    maintainInventory: {
      type: Boolean,
      default: true,
    },

    // Company Features
    features: {
      accounting: {
        type: Boolean,
        default: true,
      },

      inventory: {
        type: Boolean,
        default: true,
      },

      taxation: {
        type: Boolean,
        default: true,
      },

      banking: {
        type: Boolean,
        default: true,
      },

      payroll: {
        type: Boolean,
        default: false,
      },

      costCenter: {
        type: Boolean,
        default: false,
      },

      multiCurrency: {
        type: Boolean,
        default: false,
      },
    },

    // Preferences
    preferences: {
      dateFormat: {
        type: String,
        default: "DD-MM-YYYY",
      },

      numberFormat: {
        type: String,
        default: "indian",
      },
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

 
companySchema.index(
  { owner: 1, name: 1 },
  { unique: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;