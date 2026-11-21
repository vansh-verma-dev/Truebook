import express from "express";
import authRouter from "./routes/authRoutes.js";
import companyRouter from "./routes/company.Router.js";
import ledgerRouter from "./routes/ledgerRouter.js";
import voucherRouter from "./routes/voucherRouter.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Truebook API is running...");
});

app.use("/api/auth", authRouter);
app.use("/api", companyRouter);
app.use("/api/companies/:companyId/ledgers", ledgerRouter);
app.use("/api/companies/:companyId/vouchers", voucherRouter);


export default app;
// ledger => http://localhost:5000/api/companies/6b00909324c7edcc80611bd3/ledgers/
// voucher => http://localhost:5000/api/companies/6b00909324c7edcc80611bd3/vouchers