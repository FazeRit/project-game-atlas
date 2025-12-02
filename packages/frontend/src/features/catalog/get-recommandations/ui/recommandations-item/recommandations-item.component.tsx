import { memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { AspectRatio, CustomBadge } from "@/shared/components";
import { transformCoverUrl } from "@/shared/utils/transform-cover-url.util";
import { IRecommandationsItemProps } from "../../model";
import { ROUTES } from "@/shared";
import { useGetGameDetails } from "@/entities/game/model/hooks";

export const RecommandationsItem = memo((props: IRecommandationsItemProps) => {
    const {
        item
    } = props;

    const navigate = useNavigate();

    const { data: game } = useGetGameDetails(item.gameId);

    const coverUrl = useMemo(() => {
        console.log()
        const coverUrl = game?.data?.cover?.url

        return transformCoverUrl(coverUrl);
    }, [game?.data?.cover?.url]);

    
    const handleGameClick = useCallback(() => {
        navigate(ROUTES.GAME_DETAILS.replace(':gameId', item.gameId));
    }, [item.gameId, navigate]);

    return (
        <div
            onClick={handleGameClick}
            className={clsx(
                "flex flex-col pt-4 rounded-xl overflow-hidden cursor-pointer",
                "bg-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] h-full"
            )}
        >
            <div className="relative w-full min-h-[192px] max-h-[256px] overflow-hidden">
                <AspectRatio ratio={2 / 3} className="w-full overflow-hidden">
                    <img
                        className="z-10 relative w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={coverUrl}
                        loading="lazy"
                        decoding="async"
                        alt={`Обкладинка гри ${game?.data.name}`}
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/260x192/404040/FFFFFF?text=Error';
                        }}
                    />
                </AspectRatio>
            </div>

            <div className="flex flex-col gap-2 md:gap-3 p-3 md:p-4 w-full h-full">
                <p className="font-semibold text-[14px] text-white md:text-lg truncate">
                    {game?.data.name}
                </p>
                <div className="flex flex-col flex-grow justify-between gap-2">
                    <div className="flex flex-wrap gap-x-2 gap-y-1 overflow-hidden">
                        <CustomBadge
                            key={item.gameId}
                            name={item.description}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});