import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { DEFAULT_USER_STORE } from '../const';
import { IUserStore } from '../interfaces/user-store.interface';
import { IUser } from '../interfaces/user.interface';
import { STORAGE } from '@/shared/enums/storage.enum';

export const useUserStore = create<IUserStore>()(
    persist(
        (set) => ({
            ...DEFAULT_USER_STORE,
            setUser: (user: IUser) => {
                set({ user });
            },
            setIsAuthenticated: (isAuthenticated: boolean) => {
                set({ isAuthenticated });
            },
            logout: () => {
                set({
                    ...DEFAULT_USER_STORE,
                    isAuthenticated: false,
                });
            },
        }),
        {
            name: STORAGE.USER,
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);