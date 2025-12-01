import { memo, useMemo } from "react";
import { Star } from "lucide-react";
import { ICompatibilityGameDataHeaderProps } from "../../model";

export const CompatibilityGameDataHeader = memo((props: ICompatibilityGameDataHeaderProps) => {
    const { game } = props;

    const developerCompaniesString = useMemo(() => {
        if (!game?.companies) return 'Невідомо';
        
        const developerObjects = game.companies
            .filter(item => Boolean(item.developer));

        const companyNames = developerObjects
            .map(item => item.company.name);

        return companyNames.join(', ');
    }, [game]);
    
    const releaseYear = useMemo(() => {
        if (!game?.firstReleaseDate) return null;
        try {
            const date = new Date(game.firstReleaseDate);
            return date.getFullYear().toString();
        } catch (error) {
            return null;
        }
    }, [game.firstReleaseDate]);

    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-extrabold text-white text-3xl md:text-4xl leading-tight">
                {game?.name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2 text-[#a3a3a3] text-sm">
                
                <p className="order-1">
                    {developerCompaniesString}
                </p>

                {releaseYear && (
                    <p className="order-2">
                        {releaseYear}
                    </p>
                )}

                {game?.totalRating !== undefined && game.totalRating !== null && (
                    <p className="flex items-center gap-1 order-3 text-white">
                        <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                        <span className="font-semibold">{game.totalRating.toFixed(1)}</span>
                    </p>
                )}
            </div>
        </div>
    );
});