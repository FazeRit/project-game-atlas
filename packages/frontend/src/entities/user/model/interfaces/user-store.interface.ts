import { IUser } from "./user.interface";

export interface IUserState {
    isAuthenticated: boolean;
    user: IUser | null;
}

export interface IUserActions {
    setUser: (user: IUser) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    logout: () => void;
}

export interface IUserStore extends IUserState, IUserActions { }