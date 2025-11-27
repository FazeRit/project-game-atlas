import { IApiBasePaginateDto } from "@/shared"
import { TCatalogGameSearchField, TCatalogGameSortField } from "../types"

export interface IGetCatalogGamesRequestDto extends IApiBasePaginateDto<TCatalogGameSearchField, TCatalogGameSortField> {
    genres: Array<string>
    keywords: Array<string>
}