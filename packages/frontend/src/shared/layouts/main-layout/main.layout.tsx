import { cn } from "@/shared/utils";
import { IMainLayoutProps } from "./interfaces"
import { memo } from "react";
import { Header } from "@/widgets";
import { Footer } from "@/widgets/footer";

export const MainLayout = memo((props: IMainLayoutProps) => {
    const {
        children,
        className
    } = props;

    return (
        <div
            className="flex flex-col bg-[#171717] w-full min-h-screen"
        >
            <div className="top-0 z-50 sticky bg-[#171717] w-full">
                <Header />
            </div>

            <div className={cn("px-5 md:px-[112px] py-8 grow", className)}>
                {children}
            </div>
            
            <Footer />
        </div>
    )
})