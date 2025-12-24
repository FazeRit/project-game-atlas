export enum ROUTES {
	CATALOG = "/",
	GAME_DETAILS = "games/:gameId",

	PERSONAL_LIBRARY = "/personal-library",
	PERSONAL_LIBRARY_GAME_DETAILS = '/personal-library/:gameId',

	PROFILE = "/profile",
	RANKINGS = "/rankings",

	COMPATIBILITY = "/compatibility/:gameId",
	
	REGISTER = "/register",
	LOGIN = "/login",

	FORGET_PASSWORD = "/forget-password",
	VERIFY_FORGOT_PASSWORD ="/verify-forgot-password/:email",
	RESET_PASSWORD = "/reset-password/:code/:email",

	PROFILE_INIT = "/profile-init",
}