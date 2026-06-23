import { Router } from "express";

import { addstay } from "../controllers/stay.controller.js";

const router = Router();

router.route('/addstay').post(addstay)

export default router