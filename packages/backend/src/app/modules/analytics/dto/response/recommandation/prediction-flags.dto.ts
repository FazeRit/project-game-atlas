import { Expose } from 'class-transformer';

export class PredictionFlagsResponseDto {
    @Expose()
    greenFlags: Array<string>;

    @Expose()
    redFlags: Array<string>;

    constructor(data: {
		greenFlags: Array<string>;
		redFlags: Array<string>;
	}) {
        this.greenFlags = data.greenFlags;
        this.redFlags = data.redFlags;
    }
}