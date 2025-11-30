import clsx from "clsx";
import { memo, useMemo } from "react";
import { IProfileInitItemProps } from "../../model";

export const ProfileInitItem = memo((props: IProfileInitItemProps) => {
    const {
        game
    } = props;

    const coverUrl = useMemo(() => {
        return game.coverUrl ||
            'https://placehold.co/260x192/404040/FFFFFF?text=No+Cover';
    }, [game.coverUrl]);

    return (
        <div
            className={clsx(
                "flex flex-col rounded-2xl overflow-hidden",
                "shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] h-full"
            )}
        >
            <div className="relative rounded-2xl w-full min-h-[212px] max-h-[212px] overflow-hidden">
                <img
                    className="z-10 relative w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    src={coverUrl}
                    loading="lazy"
                    decoding="async"
                    alt={`Обкладинка гри ${game.name}`}
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/260x192/404040/FFFFFF?text=Error';
                    }}
                />
            </div>
            <p className="self-center font-semibold text-white md:text-[16px] text-xs truncate">
                {game.name}
            </p>
        </div>
    );
})