import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/shared/components/ui/form/form.component"
import { Input } from "@/shared/components/ui/input"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared"
import { registerSchema, TRegisterSchema } from "../../model"
import { useRegister } from "../../model/hooks"
import { Button } from "@/shared/components"
import { memo, useCallback } from "react"

export const RegisterForm = memo(() => {
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const { mutateAsync: register } = useRegister();

    const handleSubmit =  useCallback(async (data: TRegisterSchema) => {
        await register(data);
    }, [register]);

    return (
        <Form
            {...form}
        >
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4 md:gap-6 bg-[#262626] p-4 md:p-8 rounded-xl w-[320px] md:w-[448px]"
            >
                <div className="flex flex-col items-center gap-2">
                    <p className="text-white text-lg md:text-2xl text-center">
                        Створити новий аккаунт
                    </p>
                </div>
                
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Електронна пошта</FormLabel>
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
                            <FormLabel>Пароль</FormLabel>
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

                <Button
                    variant="lightgray"
                    size="default"
                    type="submit"
                >
                    Зареєструватися
                </Button>

                <Link
                    to={ROUTES.LOGIN}
                    className="self-center text-[#a3a3a3] text-xs md:text-sm"
                >
                    Вже маєте аккаунт? <span className="font-bold">Ввійдіть у систему</span>
                </Link>
            </form>
        </Form>
    )
})