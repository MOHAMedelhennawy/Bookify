import express from "express";
import {
	getAllBookingsController,
	getAllUserBookingController,
	addNewBookingController,
	deleteBookingController,
	updateBookingStatusController,
} from "../controller/bookginController.js";
import { authRequire, checkCurrentUser, checkUserPrivlages } from "../middlewares/authMW.js";

const router = express.Router();

// Routes
router.get("/", checkCurrentUser, checkUserPrivlages, getAllBookingsController); // only admins
router.get("/:userId", authRequire, getAllUserBookingController);
router.post("/:eventId", authRequire, addNewBookingController);
router.patch("/:bookingId", checkCurrentUser, checkUserPrivlages, updateBookingStatusController); // only admins
router.delete("/:eventId", authRequire, deleteBookingController);

export default router;
