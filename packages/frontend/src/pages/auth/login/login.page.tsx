import { LoginForm } from "@/features"
import { AuthLayout } from "@/shared/layouts/auth-layout"

export const LoginPage = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    )
}