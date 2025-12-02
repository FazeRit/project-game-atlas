import { CatalogList } from "@/features/catalog/get-catalog-games/ui/catalog-game-list"
import { RecommandationsRow } from "@/features/catalog/get-recommandations"
import { MainLayout } from "@/shared/layouts/main-layout"

export const CatalogPage = () => {
    return (
        <MainLayout>
            <RecommandationsRow />
            <CatalogList />
        </MainLayout>
    )
}