import { ConfigModule } from '@nestjs/config';
import { EnvService } from './services/env.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env', '.env.local'],
        }),
    ],
    providers: [EnvService],
    exports: [EnvService],
})
export class EnvModule {}