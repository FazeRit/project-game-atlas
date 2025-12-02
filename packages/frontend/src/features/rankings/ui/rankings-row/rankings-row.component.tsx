import { useDroppable } from "@dnd-kit/core";
import { memo } from "react";
import { IRankingsRowProps, rankingsLabel } from "../../model";
import { RankingsItem } from "../rankings-item";

export const RankingsRow = memo((props: IRankingsRowProps) => {
    const {
        tierRank,
        items
    } = props;
    
    const { setNodeRef } = useDroppable({
        id: tierRank,
    })

    return (
        <div className="flex flex-col md:gap-4 md:p-4 rounded-lg">
            <div className="flex flex-row items-center gap-3 min-w-[120px]"> 
                <div className="flex justify-center items-center bg-[#737373] rounded-md w-fit min-w-7 md:min-w-8 h-7 md:h-8">
                    <span className="font-bold text-white text-sm md:text-base">
                        {tierRank} 
                    </span>
                </div>
                
                <span className="font-medium text-[#a3a3a3] text-sm md:text-xl">
                    {rankingsLabel[tierRank]}
                </span>
            </div>

            <div 
                ref={setNodeRef}
                className="flex flex-row gap-2 md:gap-4 md:p-3 border border-[#525252] border-dashed rounded-lg overflow-x-auto"
            >
                {items.map((item, index) => {
                    return (
                        <RankingsItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            index={index}
                            parent={tierRank}
                            coverUrl={item.coverUrl}
                        />
                    )
                })}
            </div>
        </div>
    )
})