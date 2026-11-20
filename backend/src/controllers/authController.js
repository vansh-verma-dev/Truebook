import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
}
const registerUser = async (req, res) => {
    try {
        const { fullName, email, phone, password, role } = req.body;

        if (!fullName || !email || !phone || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const existingUser = await userModel.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            success: true,
            token: createToken(user._id),
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


const GetUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};  

const GetAllUser = async (req, res) => {
    try {
        const users = await userModel.find()
        .select("-password")
        .sort({ createdAt: -1 });   
        res.status(200).json({
            success: true,
             totalUsers: users.length,
            users
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};  

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }

        const user = await userModel.findOne({email : email.toLowerCase()});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        res.status(200).json({
            success: true,
            token: createToken(user._id),
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
export { registerUser , GetUser , GetAllUser , loginUser };