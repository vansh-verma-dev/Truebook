import "dotenv/config";
import app from "./src/app.js";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import connectDB from "./src/config/config.js";

const PORT = process.env.PORT || 3000;

const StartServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        cosole.error(`Error: ${error.message}`);

    }
}

StartServer();