import { memo, useCallback, useMemo, useState } from "react";
import { IPersonalLibraryGameDataProps, updatePersonalLibraryGameSchema } from "../../model";
import { PersonalLibraryGameActionsFooter } from "../personal-library-game-actions-footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { TUpdatePersonalLibraryGameSchema } from "../../model";
import { CustomPopover } from "@/shared/components/custom-popover";
import { personalLibraryGameStatusLabels } from "@/entities/personal-library-game";
import { EPersonalLibraryGameStatus } from "@/entities/personal-library-game/model/enums";
import { Textarea } from "@/shared/components/ui/textarea";

export const PersonalLibraryGameActions = memo((props: IPersonalLibraryGameDataProps) => {
    const { personalLibraryGame } = props;

    const [statusSearchQuery, setStatusSearchQuery] = useState('');

    const defaultValues = useMemo(() => {
        return {
            gameId: personalLibraryGame?.game?.checksum,
            status: personalLibraryGame?.status,
            note: personalLibraryGame?.note,
        };
    }, [personalLibraryGame]);

    const methods = useForm<TUpdatePersonalLibraryGameSchema>({
        resolver: zodResolver(updatePersonalLibraryGameSchema),
        defaultValues: defaultValues,
        mode: 'onBlur'
    })

    const currentStatus = methods.watch('status');
    const { register } = methods;

    const statuses = useMemo(() => {
        return Object.keys(personalLibraryGameStatusLabels).map(key => {
            const statusKey = key as EPersonalLibraryGameStatus; 
            
            return {
                label: personalLibraryGameStatusLabels[statusKey], 
                value: statusKey,
            };
        })
    }, []);

    const handleStatusSelected = useCallback((value: string) => {
        const newValue = currentStatus === value ? undefined : (value as EPersonalLibraryGameStatus);

        methods.setValue('status', newValue, {
            shouldDirty: true
        });
    }, [methods, currentStatus]);

    const selectedValues = currentStatus ? [currentStatus] : [];

    return (
        <FormProvider {...methods}>
            <form 
                className="flex flex-col gap-6 md:gap-8 p-4 md:p-0"
                onSubmit={methods.handleSubmit(() => {})} 
            > 
                <div className="flex flex-col gap-4 bg-[#262626] p-4 rounded-xl">
                    <p className="text-white md:text-lg">
                        Статус в бібліотеці
                    </p>
                    <CustomPopover
                        triggerLabel="Виберіть статус"
                        items={statuses}
                        selectedValues={selectedValues}
                        onValueSelected={handleStatusSelected}
                        searchQuery={statusSearchQuery}
                        onSearchChange={setStatusSearchQuery}
                    />
                </div>

                <div className="flex flex-col gap-4 bg-[#262626] p-4 rounded-xl">
                    <p className="text-white text-lg">
                        Персональні нотатки
                    </p>
                    <Textarea 
                        {...register('note')}
                        placeholder="Додайте ваші персональні нотатки тут..."
                    />
                </div>

                <PersonalLibraryGameActionsFooter
                    personalLibraryGame={personalLibraryGame}
                />
            </form>
        </FormProvider>
    );
});