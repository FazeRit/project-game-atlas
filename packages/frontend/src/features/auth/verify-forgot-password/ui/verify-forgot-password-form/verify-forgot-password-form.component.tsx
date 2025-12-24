import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form/form.component"
import { Link, useParams } from "react-router-dom"
import { ROUTES } from "@/shared"
import { Button, InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/components"
import { TVerifyForgotPasswordSchema, useVerifyForgotPassword, verifyForgotPasswordSchema } from "../../model"
import { memo, useCallback } from "react"

export const VerifyForgotPasswordForm = memo(() => {
    const form = useForm({
        resolver: zodResolver(verifyForgotPasswordSchema),
        defaultValues: {
            code: "",
        }
    })

    const { email } = useParams();
    const mutation = useVerifyForgotPassword();

    const handleSubmit = useCallback(async (data: TVerifyForgotPasswordSchema) => {
        if (!email) {
            return;
        }

        await mutation.mutateAsync({
            ...data,
            email,
        });
    }, [mutation, email]);

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
                        Введіть код
                    </p>
                    <p className="text-[#a3a3a3] text-xs md:text-sm">
                        Ми надіслали 6-значний код підтвердження на {email}.
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center">
                            <FormLabel className="sr-only">
                                Одноразовий код
                            </FormLabel>
                            <FormControl>
                                <InputOTP
                                    maxLength={6}
                                    {...field}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
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
                    Підтвердити
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
})