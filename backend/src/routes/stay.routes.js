import { Router } from "express";

import { addstay , searchStay} from "../controllers/stay.controller.js";

const router = Router();

router.route('/addstay').post(addstay)
router.route('/search').get(searchStay)

export default router