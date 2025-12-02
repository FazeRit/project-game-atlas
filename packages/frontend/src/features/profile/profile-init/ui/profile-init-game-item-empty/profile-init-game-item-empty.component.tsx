import clsx from "clsx";
import { memo } from "react";

export const ProfileInitGameItemEmpty = memo(() => {
    return (
        <div
            className={clsx(
                "flex flex-col justify-center items-center",
                "h-full min-h-[160px] w-full",
                "rounded-2xl border-2 border-dashed border-zinc-600",
                "bg-zinc-800/40 text-zinc-500",
                "transition-all duration-300 transform hover:scale-[1.02]",
                "hover:border-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
            )}
        />
    )
})