import Group from "../models/group.Mod.js";
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

const getGroups = async (req, res) => {
    try {
        const { companyId } = req.params;

        const userGroups = await Group.find({ company: companyId }).lean();

        const defaults = defaultGroups.map((group) => ({ ...group, isDefault: true }));
        const users = userGroups.map((group) => ({ ...group, isDefault: false }));

        const allGroups = [...defaults, ...users];
        res.status(200).json({
            success: true,
            message: "Groups fetched successfully..",
            totalGroup : allGroups.length , 
            groups: [...defaults, ...users],
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
        const { companyId } = req.params;
        const { name, nature } = req.body;

        if (!name || !name.trim()) {
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

        const inDefaults = defaultGroups.some((group) => group.key === key);

        if (inDefaults) {
            return res.status(400).json({
                success: false,
                message: "Group already exists",
            });
        }

        const inDatabase = await Group.findOne({ company: companyId, key });

        if (inDatabase) {
            return res.status(400).json({
                success: false,
                message: "Group already exists",
            });
        }

        const data = await Group.create({
            company: companyId,
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

export { getGroups, createGroup };