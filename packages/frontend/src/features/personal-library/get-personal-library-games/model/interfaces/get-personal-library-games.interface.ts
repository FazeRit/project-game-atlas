import { IApiBasePaginateDto } from "@/shared"
import { EPersonalLibraryGameRank, EPersonalLibraryGameStatus } from "@/entities/personal-library-game/model/enums"
import { EPersonalLibraryGameSortField } from "../enums"

export interface IGetPersonalLibraryGamesRequestDto extends IApiBasePaginateDto<EPersonalLibraryGameSortField> {
    statuses: Array<EPersonalLibraryGameStatus>
    ranks: Array<EPersonalLibraryGameRank>
    genres?: Array<string>
    keywords?: Array<string>
}