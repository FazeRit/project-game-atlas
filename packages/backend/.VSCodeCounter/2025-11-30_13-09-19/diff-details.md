# Diff Details

Date : 2025-11-30 13:09:19

Directory /home/denis/vscode_projects/project-game-atlas/packages/backend

Total : 105 files,  507 codes, 44 comments, -57 blanks, all 494 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [dist/main.js](/dist/main.js) | JavaScript | 996 | 27 | 124 | 1,147 |
| [prisma/migrations/20251126175519_removed_username/migration.sql](/prisma/migrations/20251126175519_removed_username/migration.sql) | MS SQL | 2 | 8 | 2 | 12 |
| [prisma/migrations/20251127202004_/migration.sql](/prisma/migrations/20251127202004_/migration.sql) | MS SQL | 6 | 14 | 6 | 26 |
| [prisma/schema.prisma](/prisma/schema.prisma) | Prisma | -33 | 0 | -13 | -46 |
| [src/app/modules/auth/controllers/auth/auth-write-controller/auth-write.controller.ts](/src/app/modules/auth/controllers/auth/auth-write-controller/auth-write.controller.ts) | TypeScript | 7 | 0 | 2 | 9 |
| [src/app/modules/auth/controllers/user/user-read-controller/user-read.controller.ts](/src/app/modules/auth/controllers/user/user-read-controller/user-read.controller.ts) | TypeScript | 8 | 0 | 2 | 10 |
| [src/app/modules/auth/dto/request/jwt-token/jwt-token-payload.dto.ts](/src/app/modules/auth/dto/request/jwt-token/jwt-token-payload.dto.ts) | TypeScript | -4 | 0 | -1 | -5 |
| [src/app/modules/auth/dto/request/user/user-create.dto.ts](/src/app/modules/auth/dto/request/user/user-create.dto.ts) | TypeScript | -4 | 0 | -1 | -5 |
| [src/app/modules/auth/dto/request/user/user-update.dto.ts](/src/app/modules/auth/dto/request/user/user-update.dto.ts) | TypeScript | -4 | 0 | -1 | -5 |
| [src/app/modules/auth/dto/response/user/user.dto.ts](/src/app/modules/auth/dto/response/user/user.dto.ts) | TypeScript | -4 | 0 | -1 | -5 |
| [src/app/modules/auth/repositories/user/implementations/user-read.repository.ts](/src/app/modules/auth/repositories/user/implementations/user-read.repository.ts) | TypeScript | -7 | 0 | 0 | -7 |
| [src/app/modules/auth/services/auth/auth-write-service/auth-write.service.ts](/src/app/modules/auth/services/auth/auth-write-service/auth-write.service.ts) | TypeScript | 6 | 1 | 3 | 10 |
| [src/app/modules/game/controllers/games/game-read-controller/game-read.controller.ts](/src/app/modules/game/controllers/games/game-read-controller/game-read.controller.ts) | TypeScript | 9 | 0 | 0 | 9 |
| [src/app/modules/game/controllers/genres/genres-read-controller/genres-read.controller.ts](/src/app/modules/game/controllers/genres/genres-read-controller/genres-read.controller.ts) | TypeScript | 27 | 0 | 4 | 31 |
| [src/app/modules/game/controllers/keywords/keywords-read-controller/keywords-read.controller.ts](/src/app/modules/game/controllers/keywords/keywords-read-controller/keywords-read.controller.ts) | TypeScript | 39 | 0 | 4 | 43 |
| [src/app/modules/game/dto/request/game/game-filters.dto.ts](/src/app/modules/game/dto/request/game/game-filters.dto.ts) | TypeScript | 1 | 0 | -2 | -1 |
| [src/app/modules/game/dto/request/index.ts](/src/app/modules/game/dto/request/index.ts) | TypeScript | 1 | 0 | -1 | 0 |
| [src/app/modules/game/dto/request/keywords/keyword-paginate.dto.ts](/src/app/modules/game/dto/request/keywords/keyword-paginate.dto.ts) | TypeScript | 24 | 0 | 5 | 29 |
| [src/app/modules/game/dto/response/game/game-details.dto.ts](/src/app/modules/game/dto/response/game/game-details.dto.ts) | TypeScript | -28 | 0 | -11 | -39 |
| [src/app/modules/game/dto/response/game/game.dto.ts](/src/app/modules/game/dto/response/game/game.dto.ts) | TypeScript | 0 | 0 | -1 | -1 |
| [src/app/modules/game/dto/response/game/index.ts](/src/app/modules/game/dto/response/game/index.ts) | TypeScript | 1 | 0 | -1 | 0 |
| [src/app/modules/game/dto/response/game/paginate-game.dto.ts](/src/app/modules/game/dto/response/game/paginate-game.dto.ts) | TypeScript | 33 | 0 | 4 | 37 |
| [src/app/modules/game/dto/response/index.ts](/src/app/modules/game/dto/response/index.ts) | TypeScript | -2 | 0 | 0 | -2 |
| [src/app/modules/game/dto/response/platform-type/index.ts](/src/app/modules/game/dto/response/platform-type/index.ts) | TypeScript | -1 | 0 | -2 | -3 |
| [src/app/modules/game/dto/response/platform-type/platform-type.dto.ts](/src/app/modules/game/dto/response/platform-type/platform-type.dto.ts) | TypeScript | -23 | 0 | -7 | -30 |
| [src/app/modules/game/dto/response/platform/index.ts](/src/app/modules/game/dto/response/platform/index.ts) | TypeScript | -1 | 0 | -2 | -3 |
| [src/app/modules/game/dto/response/platform/platform.dto.ts](/src/app/modules/game/dto/response/platform/platform.dto.ts) | TypeScript | -39 | 0 | -11 | -50 |
| [src/app/modules/game/game.module.ts](/src/app/modules/game/game.module.ts) | TypeScript | -14 | 0 | 0 | -14 |
| [src/app/modules/game/providers/index.ts](/src/app/modules/game/providers/index.ts) | TypeScript | -1 | 0 | 0 | -1 |
| [src/app/modules/game/providers/keywords/keywords.providers.ts](/src/app/modules/game/providers/keywords/keywords.providers.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/app/modules/game/providers/platforms/game-platform.providers.ts](/src/app/modules/game/providers/platforms/game-platform.providers.ts) | TypeScript | -17 | 0 | -1 | -18 |
| [src/app/modules/game/providers/platforms/index.ts](/src/app/modules/game/providers/platforms/index.ts) | TypeScript | -2 | 0 | -2 | -4 |
| [src/app/modules/game/providers/platforms/platform-types.providers.ts](/src/app/modules/game/providers/platforms/platform-types.providers.ts) | TypeScript | -19 | 0 | -1 | -20 |
| [src/app/modules/game/providers/platforms/platform.providers.ts](/src/app/modules/game/providers/platforms/platform.providers.ts) | TypeScript | -19 | 0 | -1 | -20 |
| [src/app/modules/game/repositories/games/abstracts/igame-read.repository.ts](/src/app/modules/game/repositories/games/abstracts/igame-read.repository.ts) | TypeScript | 7 | 0 | 1 | 8 |
| [src/app/modules/game/repositories/games/implementations/game-read.repository.ts](/src/app/modules/game/repositories/games/implementations/game-read.repository.ts) | TypeScript | -7 | 0 | 0 | -7 |
| [src/app/modules/game/repositories/genres/genres/abstracts/igenre-read.repository.ts](/src/app/modules/game/repositories/genres/genres/abstracts/igenre-read.repository.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/app/modules/game/repositories/genres/genres/implementations/genre-read.repository.ts](/src/app/modules/game/repositories/genres/genres/implementations/genre-read.repository.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [src/app/modules/game/repositories/keywords/keywords/abstracts/ikeyword-read.repository.ts](/src/app/modules/game/repositories/keywords/keywords/abstracts/ikeyword-read.repository.ts) | TypeScript | 7 | 0 | 0 | 7 |
| [src/app/modules/game/repositories/keywords/keywords/implementations/keyword-read.repository.ts](/src/app/modules/game/repositories/keywords/keywords/implementations/keyword-read.repository.ts) | TypeScript | 24 | 0 | 3 | 27 |
| [src/app/modules/game/repositories/platforms/game-platform/abstracts/igame-platform-read.repository.ts](/src/app/modules/game/repositories/platforms/game-platform/abstracts/igame-platform-read.repository.ts) | TypeScript | -3 | 0 | -3 | -6 |
| [src/app/modules/game/repositories/platforms/game-platform/abstracts/igame-platform-write.repository.ts](/src/app/modules/game/repositories/platforms/game-platform/abstracts/igame-platform-write.repository.ts) | TypeScript | -5 | 0 | -3 | -8 |
| [src/app/modules/game/repositories/platforms/game-platform/abstracts/index.ts](/src/app/modules/game/repositories/platforms/game-platform/abstracts/index.ts) | TypeScript | -2 | 0 | 0 | -2 |
| [src/app/modules/game/repositories/platforms/game-platform/implementations/game-platform-read.repository.ts](/src/app/modules/game/repositories/platforms/game-platform/implementations/game-platform-read.repository.ts) | TypeScript | -15 | 0 | -4 | -19 |
| [src/app/modules/game/repositories/platforms/game-platform/implementations/game-platform-write.repository.ts](/src/app/modules/game/repositories/platforms/game-platform/implementations/game-platform-write.repository.ts) | TypeScript | -36 | 0 | -7 | -43 |
| [src/app/modules/game/repositories/platforms/game-platform/implementations/index.ts](/src/app/modules/game/repositories/platforms/game-platform/implementations/index.ts) | TypeScript | -2 | 0 | -2 | -4 |
| [src/app/modules/game/repositories/platforms/platform-type/abstracts/index.ts](/src/app/modules/game/repositories/platforms/platform-type/abstracts/index.ts) | TypeScript | -2 | 0 | -2 | -4 |
| [src/app/modules/game/repositories/platforms/platform-type/abstracts/iplatform-type-read.repository.ts](/src/app/modules/game/repositories/platforms/platform-type/abstracts/iplatform-type-read.repository.ts) | TypeScript | -3 | 0 | -3 | -6 |
| [src/app/modules/game/repositories/platforms/platform-type/abstracts/iplatform-type-write.repository.ts](/src/app/modules/game/repositories/platforms/platform-type/abstracts/iplatform-type-write.repository.ts) | TypeScript | -5 | 0 | -3 | -8 |
| [src/app/modules/game/repositories/platforms/platform-type/implementations/index.ts](/src/app/modules/game/repositories/platforms/platform-type/implementations/index.ts) | TypeScript | -2 | 0 | -2 | -4 |
| [src/app/modules/game/repositories/platforms/platform-type/implementations/platform-type-read.repository.ts](/src/app/modules/game/repositories/platforms/platform-type/implementations/platform-type-read.repository.ts) | TypeScript | -15 | 0 | -4 | -19 |
| [src/app/modules/game/repositories/platforms/platform-type/implementations/platform-type-write.repository.ts](/src/app/modules/game/repositories/platforms/platform-type/implementations/platform-type-write.repository.ts) | TypeScript | -36 | 0 | -7 | -43 |
| [src/app/modules/game/repositories/platforms/platform/abstracts/index.ts](/src/app/modules/game/repositories/platforms/platform/abstracts/index.ts) | TypeScript | -2 | 0 | -2 | -4 |
| [src/app/modules/game/repositories/platforms/platform/abstracts/iplatform-read.repository.ts](/src/app/modules/game/repositories/platforms/platform/abstracts/iplatform-read.repository.ts) | TypeScript | -3 | 0 | -3 | -6 |
| [src/app/modules/game/repositories/platforms/platform/abstracts/iplatform-write.repository.ts](/src/app/modules/game/repositories/platforms/platform/abstracts/iplatform-write.repository.ts) | TypeScript | -5 | 0 | -3 | -8 |
| [src/app/modules/game/repositories/platforms/platform/implementations/index.ts](/src/app/modules/game/repositories/platforms/platform/implementations/index.ts) | TypeScript | -2 | 0 | -2 | -4 |
| [src/app/modules/game/repositories/platforms/platform/implementations/platform-read.repository.ts](/src/app/modules/game/repositories/platforms/platform/implementations/platform-read.repository.ts) | TypeScript | -15 | 0 | -4 | -19 |
| [src/app/modules/game/repositories/platforms/platform/implementations/platform-write.repository.ts](/src/app/modules/game/repositories/platforms/platform/implementations/platform-write.repository.ts) | TypeScript | -36 | 0 | -7 | -43 |
| [src/app/modules/game/services/games/game-map-service/game-map.service.ts](/src/app/modules/game/services/games/game-map-service/game-map.service.ts) | TypeScript | 21 | 0 | 0 | 21 |
| [src/app/modules/game/services/games/game-read-service/game-read.service.ts](/src/app/modules/game/services/games/game-read-service/game-read.service.ts) | TypeScript | 13 | 0 | 1 | 14 |
| [src/app/modules/game/services/genres/genres/genres-read-service/genre-read.service.ts](/src/app/modules/game/services/genres/genres/genres-read-service/genre-read.service.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [src/app/modules/game/services/keywords/keywords/keywords-map-service/keywords-map.service.ts](/src/app/modules/game/services/keywords/keywords/keywords-map-service/keywords-map.service.ts) | TypeScript | 16 | 0 | 2 | 18 |
| [src/app/modules/game/services/keywords/keywords/keywords-read-service/keyword-read.service.ts](/src/app/modules/game/services/keywords/keywords/keywords-read-service/keyword-read.service.ts) | TypeScript | -12 | 0 | -4 | -16 |
| [src/app/modules/game/services/keywords/keywords/keywords-read-service/keywords-read.service.ts](/src/app/modules/game/services/keywords/keywords/keywords-read-service/keywords-read.service.ts) | TypeScript | 42 | 0 | 10 | 52 |
| [src/app/modules/game/services/keywords/keywords/keywords-write-service/keyword-write.service.ts](/src/app/modules/game/services/keywords/keywords/keywords-write-service/keyword-write.service.ts) | TypeScript | -40 | 0 | -15 | -55 |
| [src/app/modules/game/services/keywords/keywords/keywords-write-service/keywords-write.service.ts](/src/app/modules/game/services/keywords/keywords/keywords-write-service/keywords-write.service.ts) | TypeScript | 40 | 0 | 15 | 55 |
| [src/app/modules/game/services/platforms/game-platforms/game-platforms-read-service/game-platforms-read.service.ts](/src/app/modules/game/services/platforms/game-platforms/game-platforms-read-service/game-platforms-read.service.ts) | TypeScript | -12 | 0 | -2 | -14 |
| [src/app/modules/game/services/platforms/game-platforms/game-platforms-write-service/game-platforms-write.service.ts](/src/app/modules/game/services/platforms/game-platforms/game-platforms-write-service/game-platforms-write.service.ts) | TypeScript | -41 | 0 | -15 | -56 |
| [src/app/modules/game/services/platforms/platform-type/platform-type-read-service/platform-type-read.service.ts](/src/app/modules/game/services/platforms/platform-type/platform-type-read-service/platform-type-read.service.ts) | TypeScript | -12 | 0 | -4 | -16 |
| [src/app/modules/game/services/platforms/platform-type/platform-type-write-service/platform-type-write.service.ts](/src/app/modules/game/services/platforms/platform-type/platform-type-write-service/platform-type-write.service.ts) | TypeScript | -41 | 0 | -15 | -56 |
| [src/app/modules/game/services/platforms/platform/platform-read-service/platform-read.service.ts](/src/app/modules/game/services/platforms/platform/platform-read-service/platform-read.service.ts) | TypeScript | -12 | 0 | -4 | -16 |
| [src/app/modules/game/services/platforms/platform/platform-write-service/platform-write.service.ts](/src/app/modules/game/services/platforms/platform/platform-write-service/platform-write.service.ts) | TypeScript | -41 | 0 | -15 | -56 |
| [src/app/modules/game/types/game/game-with-details.type.ts](/src/app/modules/game/types/game/game-with-details.type.ts) | TypeScript | -27 | 0 | -3 | -30 |
| [src/app/modules/game/types/game/game.types.ts](/src/app/modules/game/types/game/game.types.ts) | TypeScript | 33 | 0 | 4 | 37 |
| [src/app/modules/game/utils/game-where-builder.util.ts](/src/app/modules/game/utils/game-where-builder.util.ts) | TypeScript | -12 | 0 | 2 | -10 |
| [src/app/modules/game/utils/keyword-where-builder.util.ts](/src/app/modules/game/utils/keyword-where-builder.util.ts) | TypeScript | 26 | 0 | 5 | 31 |
| [src/app/modules/personal-library/controllers/personal-library-game/personal-library-game-read-controller/personal-library-game-read.controller.ts](/src/app/modules/personal-library/controllers/personal-library-game/personal-library-game-read-controller/personal-library-game-read.controller.ts) | TypeScript | 21 | 0 | 2 | 23 |
| [src/app/modules/personal-library/controllers/personal-library-game/personal-library-game-write-controller/personal-library-game-write.controller.ts](/src/app/modules/personal-library/controllers/personal-library-game/personal-library-game-write-controller/personal-library-game-write.controller.ts) | TypeScript | 22 | 0 | 6 | 28 |
| [src/app/modules/personal-library/controllers/personal-library/personal-library-write-controller/personal-library-write.controller.ts](/src/app/modules/personal-library/controllers/personal-library/personal-library-write-controller/personal-library-write.controller.ts) | TypeScript | 3 | 0 | 3 | 6 |
| [src/app/modules/personal-library/dto/request/index.ts](/src/app/modules/personal-library/dto/request/index.ts) | TypeScript | -1 | 0 | 0 | -1 |
| [src/app/modules/personal-library/dto/request/personal-library-game/personal-library-game-create.dto.ts](/src/app/modules/personal-library/dto/request/personal-library-game/personal-library-game-create.dto.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [src/app/modules/personal-library/dto/request/personal-library-game/personal-library-game-update.dto.ts](/src/app/modules/personal-library/dto/request/personal-library-game/personal-library-game-update.dto.ts) | TypeScript | -4 | 0 | -1 | -5 |
| [src/app/modules/personal-library/dto/request/personal-library/index.ts](/src/app/modules/personal-library/dto/request/personal-library/index.ts) | TypeScript | -2 | 0 | -2 | -4 |
| [src/app/modules/personal-library/dto/request/personal-library/personal-library-create.dto.ts](/src/app/modules/personal-library/dto/request/personal-library/personal-library-create.dto.ts) | TypeScript | -9 | 0 | -3 | -12 |
| [src/app/modules/personal-library/dto/request/personal-library/personal-library-update.dto.ts](/src/app/modules/personal-library/dto/request/personal-library/personal-library-update.dto.ts) | TypeScript | -12 | 0 | -4 | -16 |
| [src/app/modules/personal-library/dto/response/personal-library-game/index.ts](/src/app/modules/personal-library/dto/response/personal-library-game/index.ts) | TypeScript | 2 | 0 | -1 | 1 |
| [src/app/modules/personal-library/dto/response/personal-library-game/paginate-personal-library-game.dto.ts](/src/app/modules/personal-library/dto/response/personal-library-game/paginate-personal-library-game.dto.ts) | TypeScript | 26 | 0 | 2 | 28 |
| [src/app/modules/personal-library/dto/response/personal-library-game/personal-library-game-details.dto.ts](/src/app/modules/personal-library/dto/response/personal-library-game/personal-library-game-details.dto.ts) | TypeScript | -7 | 0 | -1 | -8 |
| [src/app/modules/personal-library/dto/response/personal-library-game/personal-library-game.dto.ts](/src/app/modules/personal-library/dto/response/personal-library-game/personal-library-game.dto.ts) | TypeScript | 2 | 0 | -1 | 1 |
| [src/app/modules/personal-library/repositories/personal-library-game/abstracts/ipersonal-library-game-read.repository.ts](/src/app/modules/personal-library/repositories/personal-library-game/abstracts/ipersonal-library-game-read.repository.ts) | TypeScript | 5 | 0 | 0 | 5 |
| [src/app/modules/personal-library/repositories/personal-library-game/implementations/personal-library-game-read.repository.ts](/src/app/modules/personal-library/repositories/personal-library-game/implementations/personal-library-game-read.repository.ts) | TypeScript | -16 | 0 | 2 | -14 |
| [src/app/modules/personal-library/services/personal-library-game/personal-library-game-map-service/personal-library-game-map.service.ts](/src/app/modules/personal-library/services/personal-library-game/personal-library-game-map-service/personal-library-game-map.service.ts) | TypeScript | 17 | 0 | 1 | 18 |
| [src/app/modules/personal-library/services/personal-library-game/personal-library-game-read-service/personal-library-game-read.service.ts](/src/app/modules/personal-library/services/personal-library-game/personal-library-game-read-service/personal-library-game-read.service.ts) | TypeScript | 17 | 0 | 3 | 20 |
| [src/app/modules/personal-library/services/personal-library-game/personal-library-game-write-service/personal-library-game-write.service.ts](/src/app/modules/personal-library/services/personal-library-game/personal-library-game-write-service/personal-library-game-write.service.ts) | TypeScript | -1 | 0 | -3 | -4 |
| [src/app/modules/personal-library/types/personal-library-game/personal-library-game-with-details.type.ts](/src/app/modules/personal-library/types/personal-library-game/personal-library-game-with-details.type.ts) | TypeScript | 10 | 0 | 0 | 10 |
| [src/app/modules/personal-library/utils/personal-library-game-where-builder.util.ts](/src/app/modules/personal-library/utils/personal-library-game-where-builder.util.ts) | TypeScript | -8 | 0 | 2 | -6 |
| [src/app/modules/seeding/commands/platforms/seed-platform-types.command.ts](/src/app/modules/seeding/commands/platforms/seed-platform-types.command.ts) | TypeScript | -16 | 0 | -5 | -21 |
| [src/app/modules/seeding/commands/platforms/seed-platforms.command.ts](/src/app/modules/seeding/commands/platforms/seed-platforms.command.ts) | TypeScript | -16 | 0 | -5 | -21 |
| [src/app/modules/seeding/seeders/games/games.seeder.ts](/src/app/modules/seeding/seeders/games/games.seeder.ts) | TypeScript | -15 | 0 | -3 | -18 |
| [src/app/modules/seeding/seeders/platforms/game-platforms.seeder.ts](/src/app/modules/seeding/seeders/platforms/game-platforms.seeder.ts) | TypeScript | -60 | 0 | -11 | -71 |
| [src/app/modules/seeding/seeders/platforms/platform-types.seeder.ts](/src/app/modules/seeding/seeders/platforms/platform-types.seeder.ts) | TypeScript | -87 | 0 | -20 | -107 |
| [src/app/modules/seeding/seeders/platforms/platforms.seeder.ts](/src/app/modules/seeding/seeders/platforms/platforms.seeder.ts) | TypeScript | -101 | -1 | -22 | -124 |
| [src/app/modules/seeding/seeding.module.ts](/src/app/modules/seeding/seeding.module.ts) | TypeScript | -9 | 0 | 0 | -9 |
| [src/app/shared/dto/response/pagination/base-paginate.dto.ts](/src/app/shared/dto/response/pagination/base-paginate.dto.ts) | TypeScript | 5 | -5 | 0 | 0 |
| [src/main.ts](/src/main.ts) | TypeScript | 1 | 0 | 0 | 1 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details