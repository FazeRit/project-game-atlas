import { ProfileInitList } from "@/features/profile/profile-init/ui/profile-init-list"
import { MainLayout } from "@/shared/layouts/main-layout"

export const ProfileInitPage = () => {
    return (
        <MainLayout
            className="gap-8 md:px-[300px]"
        >
            <div className="flex flex-col items-center">
                <p className="text-white md:text-[30px] text-xl">
                    Ініціалізуйте свій профіль смаку
                </p>
                <p className="text-[#A3A3A3] text-xs md:text-lg text-center">
                    Виберіть 3-5 ігор, які найкраще відповідають вашим смакам, щоб активувати свого особистого куратора.
                </p>
            </div>
            <ProfileInitList />
        </MainLayout>
    )
}