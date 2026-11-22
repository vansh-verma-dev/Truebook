import mongoose from "mongoose";
import Group from "../models/group.Mod.js";
import Ledger from "../models/ledger.Mod.js";
import defaultGroups from "../utils/Group.js";

const natures = ["asset", "liability", "income", "expense"];

const makeKey = (name) =>
    name
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((word, i) =>
            i === 0
                ? word.toLowerCase()
                : word[0].toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");

const keyOf = (group) => (group.name ? makeKey(group.name) : "");

const isDefaultKey = (id) => defaultGroups.some((group) => group.key === id);

const isNameTaken = async (companyId, name, excludeId) => {
    const newKey = makeKey(name);

    const inDefaults = defaultGroups.some(
        (group) => group.key === newKey || keyOf(group) === newKey
    );

    if (inDefaults) return true;

    const query = { company: companyId };
    if (excludeId) query._id = { $ne: excludeId };

    const others = await Group.find(query).select("name key").lean();

    return others.some((group) => group.key === newKey || keyOf(group) === newKey);
};

const getGroups = async (req, res) => {
    try {
        const userGroups = await Group.find({ company: req.company._id }).lean();

        const defaults = defaultGroups.map((group) => ({ ...group, isDefault: true }));
        const users = userGroups.map((group) => ({ ...group, isDefault: false }));

        const allGroups = [...defaults, ...users];

        res.status(200).json({
            success: true,
            message: "Groups fetched successfully..",
            totalGroup: allGroups.length,
            groups: allGroups,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const createGroup = async (req, res) => {
    try {
        const { name, nature } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Group name is required",
            });
        }

        const key = makeKey(name);

        if (!key) {
            return res.status(400).json({
                success: false,
                message: "Group name is not valid",
            });
        }

        const finalNature = natures.includes(nature) ? nature : "asset";

        if (await isNameTaken(req.company._id, name)) {
            return res.status(400).json({
                success: false,
                message: "Group already exists",
            });
        }

        const data = await Group.create({
            company: req.company._id,
            name: name.trim(),
            key,
            nature: finalNature,
        });

        res.status(201).json({
            success: true,
            message: "Group created successfully..",
            group: { ...data.toObject(), isDefault: false },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, nature } = req.body;

        if (isDefaultKey(id)) {
            return res.status(400).json({
                success: false,
                message: "Default groups cannot be changed",
            });
        }

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid group id",
            });
        }

        if (name === undefined && nature === undefined) {
            return res.status(400).json({
                success: false,
                message: "Nothing to update",
            });
        }

        const group = await Group.findOne({ _id: id, company: req.company._id });

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found",
            });
        }

        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim() || !makeKey(name)) {
                return res.status(400).json({
                    success: false,
                    message: "Group name is not valid",
                });
            }

            if (await isNameTaken(req.company._id, name, id)) {
                return res.status(400).json({
                    success: false,
                    message: "Group already exists",
                });
            }

            group.name = name.trim();
        }

        if (nature !== undefined) {
            if (!natures.includes(nature)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid nature",
                });
            }

            group.nature = nature;
        }

        await group.save();

        res.status(200).json({
            success: true,
            message: "Group updated successfully..",
            group: { ...group.toObject(), isDefault: false },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;

        if (isDefaultKey(id)) {
            return res.status(400).json({
                success: false,
                message: "Default groups cannot be deleted",
            });
        }

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid group id",
            });
        }

        const group = await Group.findOne({ _id: id, company: req.company._id });

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found",
            });
        }

        const usedInLedger = await Ledger.exists({
            company: req.company._id,
            group: group.key,
        });

        if (usedInLedger) {
            return res.status(400).json({
                success: false,
                message: "This group has ledgers, remove them first",
            });
        }

        await Group.deleteOne({ _id: id, company: req.company._id });

        res.status(200).json({
            success: true,
            message: "Group deleted successfully..",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSingleGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const defaultGroup = defaultGroups.find((group) => group.key === id);

        if (defaultGroup) {
            return res.status(200).json({
                success: true,
                message: "Group fetched successfully..",
                group: { ...defaultGroup, isDefault: true },
            });
        }

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid group id",
            });
        }

        const group = await Group.findOne({
            _id: id,
            company: req.company._id,
        }).lean();

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Group fetched successfully..",
            group: { ...group, isDefault: false },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { getGroups, getSingleGroup,  createGroup, updateGroup, deleteGroup  };