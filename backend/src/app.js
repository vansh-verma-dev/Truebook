import express from "express";
import authRouter from "./routes/authRoutes.js";
import companyRouter from "./routes/company.Router.js";
import ledgerRouter from "./routes/ledgerRouter.js";
import voucherRouter from "./routes/voucherRouter.js";
import cors from "cors";
import groupRouter from "./routes/groupRouter.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://truebook-one.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Truebook API is running...");
});

app.use("/api/auth", authRouter);
app.use("/api", companyRouter);
app.use("/api/companies/:companyId/ledgers", ledgerRouter);
app.use("/api/companies/:companyId/vouchers", voucherRouter);

app.use("/api/companies/:companyId/group" , groupRouter);

export default app;