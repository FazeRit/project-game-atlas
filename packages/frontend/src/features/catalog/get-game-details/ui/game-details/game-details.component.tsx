import { useGetGameDetails } from "@/entities/game/model/hooks";
import { ROUTES } from "@/shared";
import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameData } from "../game-data";
import { ArrowLeft } from "lucide-react";
import { ScreenshotsCarousel } from "@/entities/screenshot";
export const GameDetails = memo(() => {
    const navigate = useNavigate();

    const { gameId } = useParams();

    if (!gameId) {
        navigate(ROUTES.CATALOG);
        return null;
    }

    const { data: game, isError } = useGetGameDetails(gameId); 
    
    if (isError || !game?.data) {
        navigate(ROUTES.CATALOG);
        return null;
    }

    const handleBackClick = () => {
        navigate(ROUTES.CATALOG);
    };

    return (
        <div className="flex flex-col gap-6 md:gap-8"> 
            <div 
                className="flex flex-row items-center gap-2 mb-4 text-[#a3a3a3] hover:text-white text-base transition-colors cursor-pointer"
                onClick={handleBackClick}
            >
                <ArrowLeft className="w-5 h-5" /> 
                Назад до каталогу
            </div>
            
            <div className="gap-8 md:gap-12 grid grid-cols-1 md:grid-cols-2">
                <div className="w-full"> 
                    <ScreenshotsCarousel
                        cover={game.data.cover}
                        screenshots={game.data.screenshots}
                    />
                </div>
                
                <GameData 
                    game={game.data}
                />
            </div>
        </div>
    );
});