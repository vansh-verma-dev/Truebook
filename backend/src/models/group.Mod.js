import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
    {
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
        name: { type: String, required: true, trim: true },
        key: { type: String, required: true },
        nature: { type: String, enum: ["asset", "liability", "income", "expense"], default: "asset" },
    },
    { timestamps: true }
);

groupSchema.index({ company: 1, key: 1 }, { unique: true });

const Group = mongoose.model("Group", groupSchema);

export default Group;