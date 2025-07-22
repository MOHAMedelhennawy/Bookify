import express from "express";
import passport from "passport";
import {
	loginPost,
	signupPost,
	logoutGet,
	googleOAuthController,
	googleOAthCallbackController,
} from "../controller/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
	loginSchema,
	signupSchema,
} from "../middlewares/schemas/auth.schema.js";
import { checkCurrentUser } from "../middlewares/authMW.js";

const router = express.Router();

router.post("/api/login", validateSchema(loginSchema), loginPost);

router.post("/api/signup", validateSchema(signupSchema), signupPost);

router.get("/api/me", checkCurrentUser, (req, res) => {
	const user = res.locals.user;
	return res.json({ user: user || null });
});

router.get("/api/logout", checkCurrentUser, logoutGet);

// Google OAuth
router.get("/auth/google", googleOAuthController);

router.get(
	"/auth/google/callback",
	passport.authenticate("google", { session: false }),
	googleOAthCallbackController,
);

export default router;
