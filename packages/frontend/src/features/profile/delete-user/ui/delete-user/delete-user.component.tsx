import { Button, Popover, PopoverContent, PopoverTrigger } from "@/shared/components";
import { memo } from "react";
import { useDeleteUser } from "../../model";
import { PopoverClose } from "@radix-ui/react-popover";
import { Trash } from "lucide-react";

export const DeleteUser = memo(() => {
    const { mutateAsync: deleteUser } = useDeleteUser();
    
    const handleDelete = () => {
        deleteUser();
    }

    return (
        <div className="flex flex-col gap-2 md:gap-4">
            <p className="text-white text-base md:text-lg">
                Видалення аккаунта
            </p>
            <div className="flex flex-row gap-2 bg-[#360404] bg-opacity-10 p-3 rounded-lg">
                <Trash
                    fill="#c00000"
                    color="#C00000"
                    className="mt-0.5 w-5 h-5 shrink-0"
                /> 
                <div className="flex flex-col gap-1">
                    <p className="font-medium text-[#FF3B30] md:text-[16px] text-sm">
                        Увага: ця дія є незворотною
                    </p>
                    <p className="text-[#D4D4D4] text-xs md:text-sm">
                        Видалення вашого акаунта назавжди видалить всі дані, пов'язані з вашим профілем. Ця дія є незворотною і відповідає вашим правам за GDPR. Усі рейтинги, вподобання та персоналізовані рекомендації гри будуть втрачені назавжди.
                    </p>
                </div>
            </div>
            
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="destructive"
                        className="bg-[#C00000] hover:bg-[#A00000] w-fit text-white" 
                    >
                        <Trash
                            fill="white"
                            color="white"/>
                        Видалити обліковий запис назавжди 
                    </Button>
                </PopoverTrigger>
                
                <PopoverContent 
                    className="bg-zinc-800 shadow-xl p-4 border border-gray-700 w-80" 
                    align="end"
                >
                    <div className="flex flex-col space-y-3">
                        <p className="font-semibold text-white text-base">
                            Остаточне підтвердження
                        </p>
                        <p className="text-gray-400 text-sm">
                            Ви впевнені, що бажаєте остаточно видалити свій акаунт? Цю дію неможливо скасувати.
                        </p>
                        <div className="flex justify-end space-x-2">
                            
                            <PopoverClose asChild>
                                <Button variant="lightgray" size="sm">
                                    Скасувати
                                </Button>
                            </PopoverClose>
                            
                            <Button 
                                variant="destructive" 
                                size="sm" 
                                onClick={handleDelete}
                                className="bg-[#C00000] hover:bg-[#A00000] text-white"
                            >
                                <Trash
                                    fill="white"
                                    color="white"
                                    className="w-3 h-3"
                                />
                                Видалити
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            
        </div>
    )
})