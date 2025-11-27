import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema, TForgotPasswordSchema, useForgotPassword } from "../../model"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form/form.component"
import { Input } from "@/shared/components/ui/input"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared"
import { Button } from "@/shared/components"

export const ForgotPasswordForm = () => {
    const form = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        }
    })

    const mutation = useForgotPassword();

    const handleSubmit = (data: TForgotPasswordSchema) => {
        mutation.mutateAsync(data);
    }

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
                        Забули пароль?
                    </p>
                    <p className="text-[#a3a3a3] text-xs md:text-sm">
                        Введіть вашу електронну пошту, і ми надішлемо вам код для відновлення доступу.
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

                <Button
                    variant="lightgray"
                    size="default" 
                    type="submit"
                >
                    Відновити пароль
                </Button>

                <Link
                    to={ROUTES.LOGIN}
                    className="self-center text-[#a3a3a3] text-xs md:text-sm hover:underline"
                >
                    Згадали пароль? <span className="font-bold text-white">Ввійти</span>
                </Link>
            </form>
        </Form>
    )
}