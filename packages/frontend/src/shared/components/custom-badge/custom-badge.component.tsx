import { memo } from "react";
import { ICustomBadgeProps } from "./interfaces";

export const CustomBadge = memo((props: ICustomBadgeProps) => {
    const {
        name
    } = props;

    return (
        <div className="flex justify-center items-center bg-[#525252] px-1 py-0.5 rounded-md h-fit text-[10px] text-white md:text-[14px]">
            {name}
        </div>
    )
})