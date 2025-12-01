export enum ROUTES {
	CATALOG = "/",
	GAME_DETAILS = "games/:checksum",

	PERSONAL_LIBRARY = "/personal-library",
	PERSONAL_LIBRARY_GAME = '/personal-library/:checksum',

	PROFILE = "/profile",
	RANKINGS = "/rankings",

	COMPATIBILITY = "/compatibility/:checksum",
	
	REGISTER = "/register",
	LOGIN = "/login",

	FORGET_PASSWORD = "/forget-password",
	VERIFY_FORGOT_PASSWORD ="/verify-forgot-password",
	RESET_PASSWORD = "/reset-password/:code",

	PROFILE_INIT = "/profile-init",
}