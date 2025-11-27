import { ReactNode } from "react";

export interface IHeaderProviderContext {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

export interface IHeaderProviderProps {
    children: ReactNode;
}