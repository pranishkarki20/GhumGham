import { Router } from "express";

import { addstay , searchStay} from "../controllers/stay.controller.js";
import auth from "../middleware/auth.js"
const router = Router();

router.route('/addstay').post(auth , addstay)
router.route('/search').get(auth ,searchStay)

export default router