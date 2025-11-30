import { PersonalLibraryGameList } from "@/features/personal-library/get-personal-library-games/ui/personal-library-game-list"
import { HeaderLayout } from "@/shared/layouts/header-layout"

export const PersonaLibraryPage = () => {
    return (
        <HeaderLayout>
            <PersonalLibraryGameList />
        </HeaderLayout>
    )
}