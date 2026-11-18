
const bcrypt = require("bcryptjs");
const USER = require("../module/user.module");

const SignUp = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        // Validate input types
        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid input format",
            });
        }

        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        if (normalizedName.length < 3 || normalizedName.length > 20) {
            return res.status(400).json({
                success: false,
                message: "Name must be between 3 and 20 characters",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        // Validate role if provided
        const allowedRoles = ["student", "business", "enterprices"];

        if (role !== undefined && !allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role",
            });
        }

        // Check existing user
        const existingUser = await USER.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = await USER.create({
            name: normalizedName,
            email: normalizedEmail,
            password: hashedPassword,
            role: role || "student",
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered",
            });
        }

        next(error);
    }
};

module.exports = { SignUp };
