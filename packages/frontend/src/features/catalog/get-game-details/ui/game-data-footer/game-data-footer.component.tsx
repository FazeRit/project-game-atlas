import { memo, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components";
import { useUserStore } from "@/entities";
import { IGameDataFooterProps } from "../../model/interfaces/game-data-footer.interface";
import { useCreatePersonalLibraryGame } from "@/entities/personal-library-game";
import { EPersonalLibraryGameRank, EPersonalLibraryGameStatus } from "@/entities/personal-library-game/model/enums";
import { useExistsPersonalLibraryGame } from "@/entities/personal-library-game/model/hooks/exists-personal-library-game.hook";

export const GameDataFooter = memo((props: IGameDataFooterProps) => {
    const {
        game,
    } = props;

    const isAuthenticated = useUserStore(state => state.isAuthenticated);

    const { 
        data: existsData, 
        isLoading: isLoadingExists,
        isError: isExistsError 
    } = useExistsPersonalLibraryGame(game.checksum);
    
    const { 
        mutateAsync: addToPersonaLibrary, 
        isPending: isAdding,
    } = useCreatePersonalLibraryGame();
    
    const isGameInLibrary = existsData?.data ?? false; 
    const isLibraryCheckPending = isLoadingExists || isAdding;
    
    const handleAddToLibrary = useCallback(async () => {
        if (!game.checksum) return;

        await addToPersonaLibrary({
            gameId: game.checksum,
            rank: EPersonalLibraryGameRank.UNRANKED,
            status: EPersonalLibraryGameStatus.BACKLOG
        });
    }, [addToPersonaLibrary, game.checksum]);


    if (!isAuthenticated) {
        return null;
    }

    if (isExistsError) {
        return (
            <div className="flex flex-col gap-3 pt-6 border-t border-t-[#262626]">
                <p className="text-red-400 text-sm italic">
                    Не вдалося перевірити статус бібліотеки. Спробуйте пізніше.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 pt-6 border-t border-t-[#262626]">
            {isLibraryCheckPending ? (
                <p className="text-[#a3a3a3] text-sm italic">
                    Перевірка стану бібліотеки...
                </p>
            ) : (
                !isGameInLibrary && (
                    <p className="text-[#a3a3a3] text-sm italic">
                        Ця гра ще не в персональній бібліотеці
                    </p>
                )
            )}
            
            <Button 
                disabled={isLibraryCheckPending}
            >
                Проаналізувати сумісність
            </Button>

            {!isGameInLibrary && (
                <Button 
                    onClick={handleAddToLibrary}
                    disabled={isAdding || isLoadingExists}
                    className="flex items-center gap-2"
                >
                    {!isAdding && <Plus className="w-5 h-5" />}
                    {isAdding ? 'Додавання...' : 'Додати до бібліотеки'} 
                </Button>
            )}

            {isGameInLibrary && !isLibraryCheckPending && (
                <p className="font-semibold text-green-400 text-sm">
                    ✅ Гра вже у вашій бібліотеці!
                </p>
            )}
        </div>
    );
});