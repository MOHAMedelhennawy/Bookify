import {
	getAllBookingsServices,
	getAllUserBookingServices,
	addNewBookingServices,
	deleteBookingService,
	checkExistBooking,
	updateBookingStatusServices,
} from "../services/bookings.js";
import AppError from "../utils/AppError.js";

import catchAsync from "../utils/catchAsync.js";
import logger from "../config/logger.js";

export const getAllBookingsController = catchAsync(async (req, res) => {
	const bookings = await getAllBookingsServices();

	res.status(200).json({
		message: "Bookings fetched successfully.",
		bookings,
	});
});

export const getAllUserBookingController = catchAsync(async (req, res) => {
	const userId = req.params.userId;

	if (!userId) {
		throw new AppError(
			"User ID is missing",
			400,
			"Please provide a valid user ID in the request.",
			true,
		);
	}

	const bookings = await getAllUserBookingServices(userId);

	res.status(200).json({
		message: "User bookings fetched successfully.",
		bookings,
	});

	logger.info("User bookings fetched successfully.");
});

export const addNewBookingController = catchAsync(async (req, res) => {
	const user = res.locals.user;
	const { eventId } = req.params;

	if (!user || !user.id) {
		throw new AppError(
			"User ID is missing",
			400,
			"You need to be logged in to perform this action. Please log in and try again",
			true,
		);
	}

	if (!eventId) {
		throw new AppError(
			"Event ID is missing",
			400,
			"Please provide a valid event ID in the request.",
			true,
		);
	}

	const bookingAlreadyExists = await checkExistBooking(user.id, eventId);

	if (bookingAlreadyExists) {
		throw new AppError(
			"Event already exists",
			400,
			"You have already booked this event.",
			true,
		);
	}

	const newBooking = await addNewBookingServices(user.id, eventId);

	res.status(201).json({
		message: "Booking created successfully.",
		newBooking,
	});
});

export const deleteBookingController = catchAsync(async (req, res) => {
	const user = res.locals.user;
	const { eventId } = req.params;

	// check if user ID and event ID is passed
	if (!user.id) {
		throw new AppError(
			"User ID is missing",
			400,
			"You need to be logged in to perform this action. Please log in and try again",
			true,
		);
	}

	if (!eventId) {
		throw new AppError(
			"Event ID is missing",
			400,
			"Please provide a valid event ID in the request.",
			true,
		);
	}

	await deleteBookingService(user.id, eventId);

	res.status(202).json({
		message: "Bookgin deleted successfully.",
	});
});

export const updateBookingStatusController = catchAsync(async (req, res) => {
	const { bookingId } = req.params;
	const { newStatus } = req.body;
	const validStatuses = ['CONFIRMED', 'CANCELLED', 'PENDING'];

	if (!validStatuses.includes(newStatus)) {
		throw new AppError(
			`Invalid status: ${newStatus}`,
			400,
			`Status must be one of: ${validStatuses.join(', ')}`,
			true
		);
	}

	if (!bookingId) {
		throw new AppError(
			"Booking ID is required",
			400,
			"Please provide a valid booking ID",
			true
		);
	}

	if (!newStatus || typeof newStatus !== "string") {
		throw new AppError(
			"New status is required and must be a string",
			400,
			"Please provide a valid new status",
			true
		);
	}

	const updatedBooking = await updateBookingStatusServices(bookingId, newStatus);

	res.status(200).json({
		message: "Booking status updated successfully.",
		updatedBooking,
	});
});