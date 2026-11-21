import express from "express";
import authRouter from "./routes/authRoutes.js";
import companyRouter from "./routes/company.Router.js";
import ledgerRouter from "./routes/ledgerRouter.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Truebook API is running...");
});

app.use("/api/auth", authRouter);
app.use("/api", companyRouter);
app.use("/api/companies/:companyId/ledgers", ledgerRouter);


export default app;