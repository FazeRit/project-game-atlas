import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, TLoginSchema, useLogin } from "../../model"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form/form.component"
import { Input } from "@/shared/components/ui/input"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared"
import { Button } from "@/shared/components"
import { memo, useCallback } from "react"

export const LoginForm = memo(() => {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const mutation = useLogin();

    const handleSubmit = useCallback(async (data: TLoginSchema) => {
        await mutation.mutateAsync(data);
    }, [mutation])

    return (
        <Form
            {...form}
        >
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4 md:gap-6 bg-[#262626] p-4 md:p-8 rounded-xl w-[320px] md:w-[448px]"
            >
                
                <div className="flex flex-col items-center gap-2">
                    <p className="text-white text-lg md:text-2xl">
                        Ввійти в Game Atlas
                    </p>
                    <p className="text-[#a3a3a3] text-xs md:text-sm">
                        З поверненням! Будь ласка, введіть свої дані.
                    </p>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Електронна пошта
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Введіть пошту"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Пароль
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Введіть пароль"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Link
                    to={ROUTES.FORGET_PASSWORD}
                    className="self-end text-[#a3a3a3] text-xs md:text-sm"
                >
                    Забули пароль?
                </Link>

                <Button
                    variant="lightgray"
                    size="default"
                    type="submit"
                >
                    Ввійти
                </Button>

                <Link
                    to={ROUTES.REGISTER}
                    className="self-center text-[#a3a3a3] text-xs md:text-sm"
                >
                    Не маєте аккаунт? <span className="font-bold">Зареєструйтеся</span>
                </Link>
            </form>
        </Form>
    )
})