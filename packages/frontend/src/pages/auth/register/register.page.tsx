import { RegisterForm } from "@/features/auth/register/ui"
import { AuthLayout } from "@/shared/layouts/auth-layout"

export const RegisterPage = () => {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    )
}