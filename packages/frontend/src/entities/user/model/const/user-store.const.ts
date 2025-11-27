import { IUserState } from "../interfaces";

export const DEFAULT_USER_STORE: IUserState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
}