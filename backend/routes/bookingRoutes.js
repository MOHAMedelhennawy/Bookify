import express from "express";
import {
	getAllUserBookingController,
	addNewBookingController,
	deleteBookingController,
} from "../controller/bookginController.js";
import { authRequire, checkCurrentUser } from "../middlewares/authMW.js";

const router = express.Router();

// Routes
router.get("/", checkCurrentUser, getAllUserBookingController);
// router.get("/:id", );
router.post("/:eventId", authRequire, addNewBookingController);
router.delete("/:eventId", authRequire, deleteBookingController);

export default router;
