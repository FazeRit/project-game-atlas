import { ForgotPasswordForm } from "@/features/auth/forgot-password"
import { AuthLayout } from "@/shared/layouts/auth-layout"

export const ForgotPasswordPage = () => {
    return (
        <AuthLayout>
            <ForgotPasswordForm />
        </AuthLayout>
    )
}