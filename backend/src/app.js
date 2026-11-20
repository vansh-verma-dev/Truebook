import express from "express";
import authRouter from "./routes/authRoutes.js";
import companyRouter from "./routes/company.Router.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Truebook API is running...");
});

app.use("/api/auth", authRouter);
app.use("/api", companyRouter);


export default app;