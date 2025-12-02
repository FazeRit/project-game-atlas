# Diff Details

Date : 2025-12-02 17:58:17

Directory /home/denis/vscode_projects/project-game-atlas/packages/backend

Total : 34 files,  743 codes, 47 comments, 141 blanks, all 931 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [dist/main.js](/dist/main.js) | JavaScript | 359 | 9 | 32 | 400 |
| [prisma/migrations/20251201174455_added_on_cascade_relation/migration.sql](/prisma/migrations/20251201174455_added_on_cascade_relation/migration.sql) | MS SQL | 24 | 24 | 24 | 72 |
| [prisma/migrations/20251201212758/migration.sql](/prisma/migrations/20251201212758/migration.sql) | MS SQL | 9 | 7 | 1 | 17 |
| [prisma/migrations/20251202150347/migration.sql](/prisma/migrations/20251202150347/migration.sql) | MS SQL | 6 | 7 | 1 | 14 |
| [prisma/schema.prisma](/prisma/schema.prisma) | Prisma | -3 | -1 | -1 | -5 |
| [src/app/config/winston-logger/config/winston-logger.config.ts](/src/app/config/winston-logger/config/winston-logger.config.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/app/modules/analytics/analytics.module.ts](/src/app/modules/analytics/analytics.module.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/app/modules/analytics/controllers/analytics-read-controller/analytics-read.controller.ts](/src/app/modules/analytics/controllers/analytics-read-controller/analytics-read.controller.ts) | TypeScript | 23 | 0 | 6 | 29 |
| [src/app/modules/analytics/core/core-analytics.module.ts](/src/app/modules/analytics/core/core-analytics.module.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [src/app/modules/analytics/dto/index.ts](/src/app/modules/analytics/dto/index.ts) | TypeScript | 2 | 0 | -1 | 1 |
| [src/app/modules/analytics/dto/response/heurestic-engine/index.ts](/src/app/modules/analytics/dto/response/heurestic-engine/index.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/app/modules/analytics/dto/response/heurestic-engine/march.dto.ts](/src/app/modules/analytics/dto/response/heurestic-engine/march.dto.ts) | TypeScript | 14 | 0 | 3 | 17 |
| [src/app/modules/analytics/dto/response/prediction-compatibility.dto.ts](/src/app/modules/analytics/dto/response/prediction-compatibility.dto.ts) | TypeScript | -26 | 0 | -4 | -30 |
| [src/app/modules/analytics/dto/response/prediction-flags.dto.ts](/src/app/modules/analytics/dto/response/prediction-flags.dto.ts) | TypeScript | -14 | 0 | -3 | -17 |
| [src/app/modules/analytics/dto/response/proactive-recommendations.dto.ts](/src/app/modules/analytics/dto/response/proactive-recommendations.dto.ts) | TypeScript | 0 | 0 | -1 | -1 |
| [src/app/modules/analytics/dto/response/recommandation/backlog-candidates.dto.ts](/src/app/modules/analytics/dto/response/recommandation/backlog-candidates.dto.ts) | TypeScript | 15 | 0 | 4 | 19 |
| [src/app/modules/analytics/dto/response/recommandation/index.ts](/src/app/modules/analytics/dto/response/recommandation/index.ts) | TypeScript | 5 | 0 | 0 | 5 |
| [src/app/modules/analytics/dto/response/recommandation/prediction-compatibility.dto.ts](/src/app/modules/analytics/dto/response/recommandation/prediction-compatibility.dto.ts) | TypeScript | 26 | 0 | 4 | 30 |
| [src/app/modules/analytics/dto/response/recommandation/prediction-flags.dto.ts](/src/app/modules/analytics/dto/response/recommandation/prediction-flags.dto.ts) | TypeScript | 14 | 0 | 3 | 17 |
| [src/app/modules/analytics/dto/response/recommandation/recommandation-item.dto.ts](/src/app/modules/analytics/dto/response/recommandation/recommandation-item.dto.ts) | TypeScript | 32 | 0 | 7 | 39 |
| [src/app/modules/analytics/dto/response/recommandation/recommendation-candidate.dto.ts](/src/app/modules/analytics/dto/response/recommandation/recommendation-candidate.dto.ts) | TypeScript | 24 | 0 | 5 | 29 |
| [src/app/modules/analytics/services/heuristic-engine-service/heuristic-engine.service.ts](/src/app/modules/analytics/services/heuristic-engine-service/heuristic-engine.service.ts) | TypeScript | -2 | 0 | 0 | -2 |
| [src/app/modules/analytics/services/math-core/math-core.service.ts](/src/app/modules/analytics/services/math-core/math-core.service.ts) | TypeScript | 15 | 0 | 7 | 22 |
| [src/app/modules/analytics/services/recommendation-curator/recommendation-curator.service.ts](/src/app/modules/analytics/services/recommendation-curator/recommendation-curator.service.ts) | TypeScript | 155 | 1 | 43 | 199 |
| [src/app/modules/auth/controllers/user/user-write-controller/user-write.controller.ts](/src/app/modules/auth/controllers/user/user-write-controller/user-write.controller.ts) | TypeScript | 8 | 0 | 2 | 10 |
| [src/app/modules/personal-library/controllers/personal-library/personal-library-write-controller/personal-library-write.controller.ts](/src/app/modules/personal-library/controllers/personal-library/personal-library-write-controller/personal-library-write.controller.ts) | TypeScript | -14 | 0 | -3 | -17 |
| [src/app/modules/personal-library/dto/request/personal-library/index.ts](/src/app/modules/personal-library/dto/request/personal-library/index.ts) | TypeScript | 1 | 0 | 2 | 3 |
| [src/app/modules/personal-library/dto/request/personal-library/personal-library-create.dto.ts](/src/app/modules/personal-library/dto/request/personal-library/personal-library-create.dto.ts) | TypeScript | 11 | 0 | 4 | 15 |
| [src/app/modules/personal-library/repositories/personal-library-game/abstracts/ipersonal-library-game-read.repository.ts](/src/app/modules/personal-library/repositories/personal-library-game/abstracts/ipersonal-library-game-read.repository.ts) | TypeScript | 5 | 0 | 5 | 10 |
| [src/app/modules/personal-library/repositories/personal-library-game/implementations/personal-library-game-read.repository.ts](/src/app/modules/personal-library/repositories/personal-library-game/implementations/personal-library-game-read.repository.ts) | TypeScript | 33 | 0 | 5 | 38 |
| [src/app/modules/personal-library/services/personal-library-game/personal-library-game-read-service/personal-library-game-read.service.ts](/src/app/modules/personal-library/services/personal-library-game/personal-library-game-read-service/personal-library-game-read.service.ts) | TypeScript | 9 | 0 | 2 | 11 |
| [src/app/modules/personal-library/services/personal-library-game/personal-library-game-write-service/personal-library-game-write.service.ts](/src/app/modules/personal-library/services/personal-library-game/personal-library-game-write-service/personal-library-game-write.service.ts) | TypeScript | -1 | 0 | -1 | -2 |
| [src/app/modules/personal-library/services/personal-library/personal-library-write-service/personal-library-write.service.ts](/src/app/modules/personal-library/services/personal-library/personal-library-write-service/personal-library-write.service.ts) | TypeScript | -18 | 0 | -8 | -26 |
| [src/app/modules/personal-library/utils/personal-library-game-where-builder.util.ts](/src/app/modules/personal-library/utils/personal-library-game-where-builder.util.ts) | TypeScript | 16 | 0 | 2 | 18 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details