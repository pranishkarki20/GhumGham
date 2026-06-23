import { Router } from "express";

import { addflight, delflight } from "../controllers/flight.controller.js";
import { getallfligths  , getsflight ,updateFlight, searchflights} from "../controllers/flight.controller.js";
const router = Router();

router.route('/addflight').post(addflight);
router.route('/').get(getallfligths);
router.route("/search").get(searchflights);
router.route('/:id').get(getsflight);
router.route('/:id').put(updateFlight);
router.route('/:id').delete(delflight);
export default router