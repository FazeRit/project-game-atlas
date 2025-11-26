import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/shared/components/ui/form/form.component"
import { Input } from "@/shared/components/ui/input"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared"
import { registerSchema, TRegisterSchema } from "../../model"
import { useRegister } from "../../model/hooks"
import { Button } from "@/shared/components"

export const RegisterForm = () => {
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const mutation = useRegister();

    const handleSubmit = async (data: TRegisterSchema) => {
        await mutation.mutateAsync(data);
    }

    return (
        <Form
            {...form}
        >
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-6 bg-[#262626] p-8 rounded-xl w-full md:w-[448px]"
            >
                <p className="self-center text-white text-2xl">Створити новий аккаунт</p>
                
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
                    size="lg"
                    type="submit"
                >
                    Зареєструватися
                </Button>

                <Link
                    to={ROUTES.LOGIN}
                    className="self-center text-[#a3a3a3] text-sm"
                >
                    Вже маєте аккаунт? <span className="font-bold">Ввійдіть у систему</span>
                </Link>
            </form>
        </Form>
    )
}