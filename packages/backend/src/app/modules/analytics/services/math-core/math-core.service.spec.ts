import { Test, TestingModule } from '@nestjs/testing';
import { MathCoreService } from "./math-core.service"

describe('MathCoreSerivce', () => {
    let service: MathCoreService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MathCoreService],
        }).compile();

        service = module.get(MathCoreService);
    })

    it('should be define', () => {
        expect(service).toBeDefined();
    });

    it('should return 100% compatibility for equal vectors', () => {
        const userGenres = {
            'Action': 10,
            'RPG': 10
        };
        const gameGenres = {
            'Action': 10,
            'RPG': 10
        };

        const result = service.calculateSimilarity(userGenres, gameGenres);

        expect(result).toBeCloseTo(1, 5);
    })

    it('should return 0% compatibility for different vectors', () => {
        const userGenres = {
            'Action': 0,
            'RPG': 0
        };
        const gameGenres = {
            'Action': 10,
            'RPG': 10
        };

        const result = service.calculateSimilarity(userGenres, gameGenres);

        expect(result).toBeCloseTo(0, 5)
    })

    it('should invert vector', () => {
        const mockVector = { rpg: 10, action: -5 };

        const result = service.invertVector(mockVector);

        expect(result).toEqual({
            rpg: -10,
            action: 5
        });
    });

    it('should return empty object for empty input when invert', () => {
        expect(service.invertVector({})).toEqual({});
    });

    it('should handle zero vector when invert', () => {
        const mockVector = {
            rpg: 0
        }

        const result = service.invertVector(mockVector);
        
        expect(result).toEqual({
            rpg: -0
        });
    })
})