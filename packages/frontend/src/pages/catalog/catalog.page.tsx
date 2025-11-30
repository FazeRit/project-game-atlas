import { CatalogList } from "@/features/catalog/get-catalog-games/ui/catalog-game-list"
import { MainLayout } from "@/shared/layouts/main-layout"

export const CatalogPage = () => {
    return (
        <MainLayout>
            <CatalogList />
        </MainLayout>
    )
}