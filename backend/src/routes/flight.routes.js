import { Router } from "express";
import auth from "../middleware/auth.js"
import authorize from "../middleware/aut.js";
import { addflight, delflight } from "../controllers/flight.controller.js";
import { getallfligths  , getsflight ,updateFlight, searchflights} from "../controllers/flight.controller.js";
const router = Router();

router.route('/addflight').post(auth , authorize("admin") ,addflight);
router.route('/').get(auth ,getallfligths);
router.route("/search").get(auth ,searchflights);
router.route('/:id').get(auth ,getsflight);
router.route('/:id').put(auth ,updateFlight);
router.route('/:id').delete(auth ,delflight);
export default router