export enum ROUTES {
	CATALOG = "/catalog",
	CATALOG_ITEM = "/catalog/:checksum",

	MY_LIBRARY = "my-library",
	PROFILE = "profile",
	RANKINGS = "rankings",

	COMPATIBILITY = "/compatibility/:checksum",
	
	REGISTER = "/register",
	LOGIN = "/login",

	FORGET_PASSWORD = "forget-password",
	VERIFY_FORGOT_PASSWORD ="verify-forgot-password",
	RESET_PASSWORD = "reset-password",

	PROFILE_INIT = "profile-init",
}