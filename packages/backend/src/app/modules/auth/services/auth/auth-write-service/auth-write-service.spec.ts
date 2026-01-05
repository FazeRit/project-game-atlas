import { BadRequestException } from "@nestjs/common";
import { AuthWriteService } from "./auth-write.service";

jest.mock('../../../dto/request/user/user-create.dto', () => ({
    UserCreateDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../dto/request/user/user-update.dto', () => ({
    UserUpdateDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../dto/request/otp/otp-create.dto', () => ({
    OtpCreateDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../dto/request/otp/otp-update.dto', () => ({
    OtpUpdateDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../dto/response/user/user.dto', () => ({
    UserResponseDto: class {
        constructor(data: any) {
            Object.assign(this, data)
        }
    }
}))

jest.mock('../../../dto/response/jwt/jwt-token-response.dto', () => ({
    JwtTokenResponseDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../dto/response/otp/otp-response.dto', () => ({
    OtpResponseDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

describe('AuthWriteService', () => {
    let service: AuthWriteService;

    const mockUserWriteService = {
        create: jest.fn()
    };

    const mockUserReadService = {
        findByEmail: jest.fn()
    };

    const mockJwtTokenService = {
        generateToken: jest.fn()
    };

    const mockOtpService = {}

    const mockSmtpAuthService = {}

    beforeEach(() => {
        jest.clearAllMocks();

        service = new AuthWriteService(
            mockUserWriteService as any,
            mockUserReadService as any,
            mockJwtTokenService as any,
            mockOtpService as any,
            mockSmtpAuthService as any
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should throw BadRequestException when registering with an already existing email', async () => {
        const mockUserDto = {
            checksum: '1',
            email: 'test@gmail.com',
            password: '123456',
            tasteVector: {},
            lastAccessedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        mockUserReadService.findByEmail.mockResolvedValueOnce(mockUserDto);

        await expect(service.register(mockUserDto))
            .rejects
            .toThrow(BadRequestException);
    })

    it('should successfully register a new user', async () => {
        const dto = { 
            email: 'test@test.com', 
            password: 'plain_password_123'  
        };

        mockUserReadService.findByEmail.mockResolvedValue(null);

        mockJwtTokenService.generateToken.mockResolvedValue({
            accessToken: 'test_token',
            expiresIn: '1d'
        });

        mockUserWriteService.create.mockResolvedValue({
            checksum: '1',
            ...dto,
            password: 'secure_hash_XYZ' 
        });

        await service.register(dto);

        expect(mockUserWriteService.create).toHaveBeenCalledWith(
            expect.objectContaining({
                email: 'test@test.com',
                password: 'plain_password_123'
            })
        );
    })
})