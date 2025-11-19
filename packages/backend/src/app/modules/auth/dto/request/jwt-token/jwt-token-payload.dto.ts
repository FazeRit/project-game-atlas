import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class JwtTokenPayloadDto {
    @Expose()
    checksum!: string;

    @Expose()
    username!: string;

    @Expose()
    email!: string;
}