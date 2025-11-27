import { ResetPasswordForm } from "@/features/auth/reset-password"
import { AuthLayout } from "@/shared/layouts/auth-layout"

export const ResetPasswordPage = () => {
    return (
        <AuthLayout>
            <ResetPasswordForm />
        </AuthLayout>
    )
}