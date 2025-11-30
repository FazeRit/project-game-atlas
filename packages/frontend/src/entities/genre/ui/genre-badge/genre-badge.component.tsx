import { memo } from "react";
import { IGenreBadgeProps } from "./interfaces";

export const GenreBadge = memo((props: IGenreBadgeProps) => {
    const {
        genreName
    } = props;

    return (
        <div className="flex justify-center items-center bg-[#525252] px-1 py-0.5 rounded-md h-fit text-[10px] text-white md:text-[14px]">
            {genreName}
        </div>
    )
})