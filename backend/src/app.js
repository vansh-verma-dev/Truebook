
const express = require("express");
const notFoundMiddleware = require("./middleware/notFound");
const errorMiddleware = require("./middleware/errorMiddleware");
const authRouter = require("../src/routes/auth.router");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "TrueBook Backend Running Successfully...",
    });
});

app.use("/api", authRouter);

// Handle unmatched routes first
app.use(notFoundMiddleware);

// Handle errors last
app.use(errorMiddleware);

module.exports = app;
