import { AuthReadService } from "./auth-read.service"
import { UnauthorizedException } from "@nestjs/common";

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

describe('AuthReadService', () => {
    let service: AuthReadService;

    const mockUserReadService = {
        findByEmail: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();

        service = new AuthReadService(mockUserReadService as any);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should throw UnauthorizedException when email is wrong', async () => {
        const mockEmail = 'wrong@test.com';
        
        mockUserReadService.findByEmail.mockResolvedValue(null);

        await expect(service.validateUser(mockEmail, 'any-pass'))
            .rejects
            .toThrow(new UnauthorizedException('Invalid email'));
    });
})