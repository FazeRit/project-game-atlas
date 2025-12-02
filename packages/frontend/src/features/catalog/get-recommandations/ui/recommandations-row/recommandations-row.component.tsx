import { RecommandationsItem } from "../recommandations-item";
import { RecommandationsEmpty } from "../recommandations-empty";
import { useGetRecommandations } from "../../model/hooks";
import { memo, useMemo } from "react";
import { Star, Loader2 } from "lucide-react";
export const RecommandationsRow = memo(() => {
    const { data: recommendationsData, isLoading } = useGetRecommandations(); 

    const hasNoRecommendations = useMemo(() => {
        return !recommendationsData ||
        !recommendationsData.data ||
        recommendationsData.data.length === 0;
    }, [recommendationsData]);

    let content;

    if (isLoading) {
        content = (
            <div className="flex justify-center items-center p-8 w-full min-h-[200px]">
                <Loader2 className="w-8 h-8 text-[#A3A3A3] animate-spin" /> 
            </div>
        );
    } else if (hasNoRecommendations) {
        content = (
            <div className="flex justify-center items-center p-4 md:p-6 w-full min-h-[200px]">
                <RecommandationsEmpty />
            </div>
        );
    } else {
        content = (
            <div className="gap-3">
                <h3 className="flex items-center gap-2 p-4 md:p-6 text-[#a3a3a3] text-xl md:text-2xl">
                    <Star fill="#a3a3a3" size={24} /> 
                    Персональні рекомендації
                </h3>
                
                <div className="gap-2 gap-y-4 md:gap-6 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] px-4 md:px-6 pb-4 md:pb-6"
                >
                    {recommendationsData!.data.map(item => ( 
                        <RecommandationsItem
                            key={item.gameId}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col mb-4 md:mb-8 border border-[#A3A3A3] rounded-2xl w-full">
            {content}
        </div>
    )
})