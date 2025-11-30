import { ROUTES } from "@/shared";

export interface IHeaderConfig {
    label: string;
    path: ROUTES;
    index: number;
    onlyGuest: boolean;
    onlyAuth: boolean;
}