import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUserReadRepository } from '../../../repositories/user/abstracts/iuser-read.repository';
import { IUserWriteRepository } from '../../../repositories/user/abstracts/iuser-write.repository';
import { JwtTokenPayloadDto } from '../../../dto/request/jwt-token/jwt-token-payload.dto';
import { JwtTokenResponseDto, UserCreateDto, UserResponseDto } from '../../../dto';
import { JwtTokenService } from '../../jwt-token/jwt-token.service';

@Injectable()
export class AuthWriteService {
    constructor(
        private readonly userReadRepository: IUserReadRepository,
        private readonly userWriteRepository: IUserWriteRepository,
        private readonly jwtTokenService: JwtTokenService,
    ) {}

    async login(data: UserResponseDto): Promise<JwtTokenResponseDto> {
        const jwtTokenPayload: JwtTokenPayloadDto = {
            checksum: data.checksum,
            username: data.username,
            email: data.email,
        };

        // TODO: move to env variable or const
        const accessToken = await this.jwtTokenService.generateToken(
            jwtTokenPayload,
            '1h'
        );

        console.log('accessToken', accessToken);

        const jwtTokenResponse = new JwtTokenResponseDto(accessToken);

        return jwtTokenResponse;
    }

    async register(data: UserCreateDto): Promise<void> {
        const user = await this.userReadRepository.findByUsernameOrEmail(data.username, data.email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await this.userWriteRepository.create({
            ...data,
            password: hashedPassword,
        })

        if (!newUser) {
            throw new InternalServerErrorException('Failed to create user');
        }
    }
}