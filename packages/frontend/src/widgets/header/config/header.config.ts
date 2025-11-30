import { ROUTES } from "@/shared";
import { IHeaderConfig } from "../interfaces";

export const headerConfig: Array<IHeaderConfig> = [
    {
        label: "Каталог",
        path: ROUTES.CATALOG,
        index: 0,
        onlyAuth: false,
        onlyGuest: false,
    },
    {
        label: "Моя бібліотека",
        path: ROUTES.PERSONAL_LIBRARY,
        index: 1,
        onlyAuth: true,
        onlyGuest: false,
    },
    {
        label: "Профіль",
        path: ROUTES.PROFILE,
        index: 2,
        onlyAuth: true,
        onlyGuest: false,
    },
    {
        label: "Ранжування",
        path: ROUTES.RANKINGS,
        index: 3,
        onlyAuth: true,
        onlyGuest: false,
    },
    {
        label: "Аутентифікація",
        path: ROUTES.LOGIN,
        index: 4,
        onlyAuth: false,
        onlyGuest: true,
    },
    {
        label: "Реєстрація",
        path: ROUTES.REGISTER,
        index: 5,
        onlyAuth: false,
        onlyGuest: true,
    },
]