import express  from "express" ;
import { getGroups , createGroup } from "../controllers/groupController.js";

const router = express.Router({mergeParams : true});

router.get("/" , getGroups);
router.post("/" ,createGroup);

export default router ;