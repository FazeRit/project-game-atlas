import { createContext, useContext, useState } from "react";
import { IHeaderProviderContext, IHeaderProviderProps } from "./interfaces";

export const HeaderContext = createContext<IHeaderProviderContext>({
    activeIndex: 0,
    setActiveIndex: () => {},
})

export const HeaderProvider = (props: IHeaderProviderProps) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const handleSetActiveIndex = (index: number) => {
        setActiveIndex(index)
    }

    return (
        <HeaderContext.Provider
            value={{
                activeIndex,
                setActiveIndex: handleSetActiveIndex
            }}
        >
            {props.children}
        </HeaderContext.Provider>
    )
}

export const useHeader = () => {
    const context = useContext(HeaderContext);

    if (context === undefined) {
        throw new Error('useHeader must be used within a HeaderProvider');
    }

    return context;
};