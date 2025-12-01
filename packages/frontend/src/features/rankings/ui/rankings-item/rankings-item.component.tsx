import { memo } from "react";
import { IRankingsItemProps } from "../../model";
import {useDraggable} from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities";

export const RankingsItem = memo((props: IRankingsItemProps) => {
    const {
        id,
        title,
        index,
        parent,
        coverUrl
    } = props;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform
    } = useDraggable({
        id,
        data: {
            title,
            index,
            parent,
            coverUrl
        }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        cursor: 'grab', 
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex flex-col gap-1 bg-[#404040] p-1 rounded-xl w-[80px] sm:w-[90px] md:w-[110px] min-w-[80px]" 
        >
            <div className="rounded-lg w-full aspect-square overflow-hidden">
                <img
                    src={coverUrl}
                    alt={title}
                    className="w-full h-full object-cover" 
                />
            </div>

            <p className="text-white text-xs text-center line-clamp-2">
                {title}
            </p>
        </div>
    )
})