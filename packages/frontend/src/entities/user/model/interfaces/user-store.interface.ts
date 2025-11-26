import { IUser } from "./user.interface";

export interface IUserState {
    isAuthenticated: boolean;
    user: IUser | null;
    accessToken: string | null;
}

export interface IUserActions {
    setUser: (user: IUser) => void;
    setAccessToken: (accessToken: string) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    logout: () => void;
    removeAccessToken: () => void;
}

export interface IUserStore extends IUserState, IUserActions { }