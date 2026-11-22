import express  from "express" ;
import { getGroups , createGroup, updateGroup, deleteGroup, getSingleGroup } from "../controllers/groupController.js";

const router = express.Router({mergeParams : true});
import { protect } from "../middleware/auth.middleware.js";
import checkCompany from "../middleware/companyAccess.js";

router.use(protect, checkCompany);

router.get("/:id" ,getSingleGroup);
router.get("/" , getGroups);
router.post("/" ,createGroup);
router.put("/:id" ,updateGroup);
router.delete("/:id" ,deleteGroup);

export default router ;