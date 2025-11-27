import { cn } from "@/shared/utils";
import { ICenteredLayoutProps } from "./interfaces"
import { memo } from "react";

export const CenteredLayout = memo((props: ICenteredLayoutProps) => {
    const {
        children,
        className
    } = props;

    return (
        <div
            className={
                cn("flex justify-center items-center bg-[#171717] w-full min-h-screen", className)
            }
        >
            {children}
        </div>
    )
})