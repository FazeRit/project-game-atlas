import { IApiBasePaginateDto } from "@/shared"
import { ECatalogGameSortField } from "../enums"

export interface IGetCatalogGamesRequestDto extends IApiBasePaginateDto<ECatalogGameSortField> {
    genres?: Array<string>
    keywords?: Array<string>
}