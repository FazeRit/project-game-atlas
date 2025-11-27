import { ROUTES } from "@/shared";
import { IHeaderConfig } from "../interfaces";

export const headerConfig: Array<IHeaderConfig> = [
    {
        label: "Каталог",
        path: ROUTES.CATALOG,
        index: 0,
    },
    {
        label: "Моя бібліотека",
        path: ROUTES.MY_LIBRARY,
        index: 1,
    },
    {
        label: "Профіль",
        path: ROUTES.PROFILE,
        index: 2,
    },
    {
        label: "Ранжування",
        path: ROUTES.RANKINGS,
        index: 3,
    }
]