import { cn } from "@/shared/utils";
import { IHeaderLayoutProps } from "./interfaces"
import { memo } from "react";
import { Header } from "@/widgets";

export const HeaderLayout = memo((props: IHeaderLayoutProps) => {
    const {
        children,
        className
    } = props;

    return (
        <div
            className={
                cn("flex flex-col bg-[#171717] w-full min-h-screen", className)
            }
        >
            <Header />
            <div className="px-5 md:px-[112px] py-8">
                {children}
            </div>
        </div>
    )
})