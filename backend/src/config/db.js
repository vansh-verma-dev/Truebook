const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB Atlas connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error.message);
        throw error;
    }
};

module.exports = connectDB;
