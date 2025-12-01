import { memo, useCallback } from "react";
import { Trash2, Save } from "lucide-react";
import { Button } from "@/shared/components";
import { useDeletePersonalLibraryGame, useUpdatePersonalLibraryGame } from "@/entities/personal-library-game"; 
import { IPersonalLibraryGameDataFooterProps, TUpdatePersonalLibraryGameSchema } from "../../model";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared";

export const PersonalLibraryGameActionsFooter = memo((props: IPersonalLibraryGameDataFooterProps) => {
    const {
        personalLibraryGame,
    } = props;

    const navigate = useNavigate();

    const methods = useFormContext<TUpdatePersonalLibraryGameSchema>();
    const { 
        handleSubmit, 
        formState: { isDirty }
    } = methods;

    const {
        mutate: deleteGameFromLibrary, 
        isPending: isDeleting,
    } = useDeletePersonalLibraryGame();
    
    const { 
        mutateAsync: updateGameInLibrary,
        isPending: isUpdating,
    } = useUpdatePersonalLibraryGame();

    const handleDeleteFromLibrary = useCallback(() => {
        if (!personalLibraryGame?.game?.checksum) return; 

        deleteGameFromLibrary(personalLibraryGame.game.checksum); 

        navigate(ROUTES.PERSONAL_LIBRARY);
    }, [deleteGameFromLibrary, personalLibraryGame?.game?.checksum]);

    const onSubmit = useCallback(async (data: TUpdatePersonalLibraryGameSchema) => {
        await updateGameInLibrary(data);
    }, [updateGameInLibrary]);
    
    const handleSaveChanges = useCallback(() => {
        return handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);
    
    return (
        <div className="flex flex-col gap-3 pt-6 border-t border-t-[#262626]">
            <Button 
                onClick={handleSaveChanges}
                disabled={isUpdating || isDeleting || !isDirty}
                className="flex flex-grow justify-center items-center gap-2"
            >
                {!isUpdating && <Save className="w-5 h-5" />}
                {isUpdating ? 'Збереження...' : 'Зберегти зміни'} 
                </Button>
            <Button 
                onClick={handleDeleteFromLibrary}
                disabled={isDeleting || isUpdating}
                className="flex flex-grow justify-center items-center gap-2 bg-red-600 hover:bg-red-700"
            >
                {!isDeleting && <Trash2 className="w-5 h-5" />}
                {isDeleting ? 'Видалення...' : 'Прибрати з бібліотеки'} 
            </Button>
        </div>
    );
});