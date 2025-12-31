import 'reflect-metadata';

jest.mock('../../dto/response/recommandation/recommendation-candidate.dto', () => ({
    RecommandationCandidateResponseDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}));

jest.mock('../../dto/response/recommandation/recommandation-item.dto', () => ({
    RecommendationItemResponseDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}));

jest.mock('../../../personal-library/dto/request/personal-library-game/personal-library-game-filters.dto', () => ({
    PersonalLibraryGameFiltersDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}));

jest.mock('../../dto/response/heurestic-engine/match.dto', () => ({
    MatchResponseDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../dto/response/recommandation/backlog-candidates.dto', () => ({
    BacklogCandidates: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../dto/response/recommandation/prediction-flags.dto', () => ({
    PredictionFlagsResponseDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../dto/response/recommandation/prediction-compatibility.dto', () => ({
    PredictionResponseDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../auth/dto/request/user/user-create.dto', () => ({
    UserCreateDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../auth/dto/request/user/user-update.dto', () => ({
    UserUpdateDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../auth/dto/request/otp/otp-create.dto', () => ({
    OtpCreateDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../auth/dto/request/otp/otp-update.dto', () => ({
    OtpUpdateDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../auth/dto/response/user/user.dto', () => ({
    UserResponseDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../auth/dto/response/jwt/jwt-token-response.dto', () => ({
    JwtTokenResponseDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../auth/dto/response/otp/otp-response.dto', () => ({
    OtpResponseDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

jest.mock('../../../../shared/dto/request/pagination/paginate-meta.dto', () => ({
    PaginationMetaDto: class {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }
}))

import { Test, TestingModule } from "@nestjs/testing";
import { RecommendationCuratorService } from "./recommendation-curator.service";
import { RedisService } from "../../../redis/redis.service";
import { UserReadService } from "../../../auth/services/user/user-read-service/user-read.service";
import { GameReadService } from "../../../game/services/games/game-read-service/game-read.service";
import { MathCoreService } from "../math-core/math-core.service";
import { PersonalLibraryGameReadService } from "../../../personal-library/services/personal-library-game/personal-library-game-read-service/personal-library-game-read.service";

describe('RecommendationCuratorService: analyzeGap', () => {
    let service: RecommendationCuratorService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RecommendationCuratorService,
                {
                    provide: RedisService,
                    useValue: {
                        get: jest.fn(),
                        set: jest.fn()
                    }
                },
                {
                    provide: UserReadService,
                    useValue: {
                        getTasteProfile: jest.fn()
                    }
                },
                {
                    provide: GameReadService,
                    useValue: {
                        getGameVector: jest.fn()
                    }
                },
                {
                    provide: MathCoreService,
                    useValue: {
                        calculateSimilarity: jest.fn()
                    }
                },
                {
                    provide: PersonalLibraryGameReadService,
                    useValue: {
                        findLastSignificantGameId: jest.fn()
                    }
                },
            ],
        }).compile();

        service = module.get<RecommendationCuratorService>(RecommendationCuratorService);
    });

    it('should correctly identify green and red flags based on thresholds', () => {
        const mockUserVector = {
            rpg: 20,   
            action: -15, 
            indie: 5, 
            shooter: 100
        };

        const mockGameVector = {
            rpg: 1,      
            action: 1,   
            indie: 1,    
            shooter: 0
        };

        const result = service["analyzeGap"](mockUserVector, mockGameVector);

        expect(result.greenFlags).toContain('rpg');
        expect(result.redFlags).toContain('action');
        
        expect(result.greenFlags).not.toContain('shooter');
        expect(result.greenFlags).not.toContain('indie');
        expect(result.redFlags).not.toContain('indie');  
    });

    it('should return empty flags when user interest is in the neutral zone (-9 to 14)', () => {
        const mockUserVector = {
            rpg: 14,  
            action: -9,  
            indie: 0      
        };

        const mockGameVector = {
            rpg: 1,
            action: 1,
            indie: 1
        };

        const result = service["analyzeGap"](mockUserVector, mockGameVector);

        expect(result.greenFlags).toHaveLength(0);
        expect(result.redFlags).toHaveLength(0);
        
        expect(result.greenFlags).not.toContain('rpg');
        expect(result.redFlags).not.toContain('action');
    });
});