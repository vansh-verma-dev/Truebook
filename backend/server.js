require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");
const { PORT } = require("./src/config/config")


const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.log("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();