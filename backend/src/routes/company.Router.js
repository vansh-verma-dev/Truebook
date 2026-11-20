import express from "express";
import {createCompany, deleteCompany, getAllCompany, getSingleCompany, updateCompany,} from "../controllers/companyController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/Companies",protect ,  createCompany);
router.get("/Companies",protect ,  getAllCompany);
router.get("/Companies/:id" , protect ,   getSingleCompany);
router.patch("/Companies/:id" , protect ,   updateCompany);
router.delete("/Companies/:id" , protect ,   deleteCompany);

export default router;