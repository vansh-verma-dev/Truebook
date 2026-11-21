import express from "express" ;
import { protect } from "../middleware/auth.middleware.js";
import CompanyAccess from "../middleware/companyAccess.js";
import { createLedger, deleteLedger, getLedger, getSingleLedger, updateLedger } from "../controllers/ledgerController.js";

const router = express.Router({ mergeParams: true });

router.use(protect , CompanyAccess);
router.post("/" , createLedger);
router.get("/" , getLedger);
router.get("/:id" , getSingleLedger);
router.put("/:id" , updateLedger);
router.delete("/:id" , deleteLedger);

export default router ;