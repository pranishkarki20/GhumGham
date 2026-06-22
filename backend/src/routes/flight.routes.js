import { Router } from "express";

import { addflight } from "../controllers/flight.controller.js";
import { getallfligths  , getsflight} from "../controllers/flight.controller.js";
const router = Router();

router.route('/addflight').post(addflight);
router.route('/').get(getallfligths);
router.route('/:id').get(getsflight);

export default router