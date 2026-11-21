import express from "express" ;
import {protect} from "../middleware/auth.middleware.js"
import { createVoucher, getVouchers } from "../controllers/voucherController.js";
import checkCompany from "../middleware/companyAccess.js";

const router = express.Router({mergeParams: true});

router.use(protect , checkCompany)

router.post("/" , createVoucher);
router.get("/" , getVouchers);

export default router ;