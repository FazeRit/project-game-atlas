import { DeleteUser } from "@/features/profile/delete-user"
import { MainLayout } from "@/shared/layouts/main-layout"

export const ProfilePage = () => {
    return (
        <MainLayout>
            <div className="gap-4 md:gap-8 bg-zinc-800 p-4 md:p-8 rounded-lg">
                <p className="font-medium text-white text-lg md:text-2xl">
                    Управління даними
                </p>
                <div className="p-2">
                    <DeleteUser />
                </div>
            </div>
        </MainLayout>
    )
}