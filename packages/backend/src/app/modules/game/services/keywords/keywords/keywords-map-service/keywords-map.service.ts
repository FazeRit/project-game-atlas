import { Injectable } from "@nestjs/common";
import { Keyword } from "@prisma/client";
import { KeywordResponseDto } from "../../../../dto";

@Injectable()
export class KeywordsMapService {
	toKeywordResponse(keyword: Keyword): KeywordResponseDto {
		return new KeywordResponseDto(
			keyword.checksum,
			keyword.name,
			keyword.slug,
			keyword.url,
			keyword.createdAt,
			keyword.updatedAt
		);
	}
}
