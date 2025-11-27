import { cn } from "@/shared/utils";
import { ICenteredLayoutProps } from "./interfaces"

export const CenteredLayout = (props: ICenteredLayoutProps) => {
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
}