import mongoose from 'mongoose';

const ledgerSchema = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'company',
            require: true
        },
        name: { type: String, require: true, trim: true },
        group: {
            type: String,
            enum: [
                "cash", "bank", "sundryDebtor", "sundryCreditor", "sales", "purchase", "directExpense", "indirectExpense", "directIncome", "indirectIncome", "capital", "fixedAsset", "currentAsset", "currentLiability", "dutiesTaxes",
            ],
            require: true,
        },
        openingBalance: { type: Number, default: 0, min: 0 },
        openingType: { type: String, enum: ["Dr", "Cr"], default: "Dr" },

        phone: { type: String, trim: true, default: "" },
        email: { type: String, trim: true, lowercase: true, default: "" },
        gstin: { type: String, trim: true, uppercase: true, default: "" },
        address: { type: String, trim: true, default: "" },
        city: { type: String, trim: true, default: "" },
        state: { type: String, trim: true, default: "" },

        isDefault: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
    } ,
      { timestamps: true }
);

ledgerSchema.index({company: 1 , name : 1} ,{unique : true});

const ledger = mongoose.model("Ledger" , ledgerSchema);

export default ledger ;

