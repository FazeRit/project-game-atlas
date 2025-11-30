import { PersonalLibraryGameList } from "@/features/personal-library/get-personal-library-games/ui/personal-library-game-list"
import { MainLayout } from "@/shared/layouts/main-layout"

export const PersonaLibraryPage = () => {
    return (
        <MainLayout>
            <PersonalLibraryGameList />
        </MainLayout>
    )
}