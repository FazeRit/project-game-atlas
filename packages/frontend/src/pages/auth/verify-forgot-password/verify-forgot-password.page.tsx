import { VerifyForgotPasswordForm } from "@/features/auth/verify-forgot-password"
import { AuthLayout } from "@/shared/layouts/auth-layout"

export const VerifyForgotPasswordPage = () => {
    return (
        <AuthLayout>
            <VerifyForgotPasswordForm />
        </AuthLayout>
    )
}