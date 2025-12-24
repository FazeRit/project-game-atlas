import { useForm } from "react-hook-form"
import { useParams, Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form/form.component"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components"
import { ROUTES } from "@/shared"
import { resetPasswordSchema, TResetPasswordSchema, useResetPassword } from "../../model"
import { toast } from "react-toastify"
import { memo, useCallback } from "react"

export const ResetPasswordForm = memo(() => {
    const {
        code,
        email
    } = useParams();
    
    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    })

    const mutation = useResetPassword();

    const handleSubmit = useCallback(async (data: TResetPasswordSchema) => {
        if (!code || !email) {
            toast.error("Невірне посилання для відновлення пароля.");
            return;
        }

        await mutation.mutateAsync({
            newPassword: data.password,
            code, 
            email,
        });
    }, [mutation, code, email]);

    return (
        <Form
            {...form}
        >
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4 md:gap-6 bg-[#262626] p-4 md:p-8 rounded-xl w-[320px] md:w-[448px]"
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <p className="font-semibold text-white text-lg md:text-2xl">
                        Скидання пароля
                    </p>
                    <p className="text-[#a3a3a3] text-xs md:text-sm">
                        Придумайте новий надійний пароль для вашого облікового запису.
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Новий пароль</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Введіть новий пароль"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Підтвердження пароля</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Повторіть пароль"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    variant="lightgray"
                    size="default"
                    type="submit"
                >
                    Змінити пароль
                </Button>

                <Link
                    to={ROUTES.LOGIN}
                    className="self-center text-[#a3a3a3] hover:text-white text-xs md:text-sm transition-colors"
                >
                    <span className="font-bold">Повернутися до входу</span>
                </Link>
            </form>
        </Form>
    )
})