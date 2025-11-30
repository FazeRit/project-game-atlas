import { CatalogList } from "@/features/catalog/get-catalog-games/ui/catalog-game-list"
import { HeaderLayout } from "@/shared/layouts/header-layout"

export const CatalogPage = () => {
    return (
        <HeaderLayout>
            <CatalogList />
        </HeaderLayout>
    )
}