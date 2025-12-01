import { memo, useMemo } from "react";
import { CustomBadge } from "@/shared/components";
import { IGameDataProps } from "../../model";
import { GameDataHeader } from "../game-data-header";
import { GameDataFooter } from "../game-data-footer";

export const GameData = memo((props: IGameDataProps) => {
    const { game } = props;

    const uniqueGenres = useMemo(() => {
        if (!game?.genres) return [];
        
        const genreNames = game.genres.map(g => g.name);
        const uniqueNames = [...new Set(genreNames)]; 

        const uniqueItems = uniqueNames.map(name => {
            return game.genres.find(g => g.name === name);
        }).filter(Boolean);
        
        return uniqueItems;
    }, [game?.genres]);
    
    const uniqueKeywords = useMemo(() => {
        if (!game?.keywords) return [];
        
        const keywordNames = game.keywords.map(k => k.name);
        const uniqueNames = [...new Set(keywordNames)]; 

        const uniqueItems = uniqueNames.map(name => {
            return game.keywords.find(k => k.name === name);
        }).filter(Boolean);
        
        return uniqueItems;
    }, [game?.keywords]);

    const hasGenresToShow = uniqueGenres.length > 0;
    const hasKeywordsToShow = uniqueKeywords.length > 0;

    return (
        <div className="flex flex-col gap-6 md:gap-8 p-4 md:p-0"> 
            <GameDataHeader
                game={game}
            />

            {hasGenresToShow && (
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-white text-base">
                        Жанри
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {uniqueGenres.map((item, index) => (
                            <CustomBadge
                                name={item?.name ?? ''}
                                key={item?.name ?? index.toString()}
                            />
                        ))}
                    </div>
                </div>
            )}

            {hasKeywordsToShow && (
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-white text-base">
                        Ключові слова
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {uniqueKeywords.map((item, index) => (
                            <CustomBadge
                                name={item?.name ?? ''}
                                key={item?.name ?? index.toString()}
                            />
                        ))}
                    </div>
                </div>
            )}
            
            <div className="flex flex-col gap-2">
                <p className="font-semibold text-white text-base">
                    Про гру
                </p>
                <p className="text-[#d4d4d4] text-base leading-relaxed">
                    {game?.summary}
                </p>
            </div>
            
            <GameDataFooter
                game={game}
            />
        </div>
    );
});