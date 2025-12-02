import { Exclude, Expose } from "class-transformer";

@Exclude()
export class BacklogCandidates {
    @Expose()
    checksum: string;

    @Expose()
    tasteVector: Record<string, number>;

    constructor(data: {
        checksum: string;
        tasteVector: Record<string, number>;
    }) {
        this.checksum = data.checksum;
        this.tasteVector = data.tasteVector;
    }

}