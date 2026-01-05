import 'reflect-metadata';

import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../app/app.module";
import request from 'supertest';
import cookieParser from 'cookie-parser';

jest.mock('../../app/shared/dto/response/api-response.dto', () => {
    return {
        ApiResponseDto: class {
            constructor(public data: any) {}
        }
    };
});

describe('User', () => {
    let app: INestApplication;
    let httpServer: any;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = module.createNestApplication();

        app.useGlobalPipes(new ValidationPipe({ 
            whitelist: false, 
            transform: true 
        }));

        app.use(cookieParser());

        await app.init();
        httpServer = app.getHttpServer();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('GET /users/', () => {
        let accessTokenCookie: string;
        const testEmail = `user_${Date.now()}@test.com`;
        const testPassword = 'StrongPassword123!';

        beforeAll(async () => {
            await request(httpServer)
                .post('/auth/register')
                .send({
                    email: testEmail,
                    password: testPassword
                })
                .expect(201);

            const loginResponse = await request(httpServer)
                .post('/auth/login')
                .send({
                    email: testEmail,
                    password: testPassword
                })
                .expect(200);

            accessTokenCookie = loginResponse.headers['set-cookie'];

            expect(accessTokenCookie)
                .toBeDefined();
        });

        it('should retrieve the current user profile using a valid login cookie', async () => {
            const response = await request(httpServer)
                .get('/users/')
                .set('Cookie', accessTokenCookie)
                .expect(200);

            expect(response.body.data.success)
                .toBe(true);
            
            expect(response.body.data.data.email)
                .toEqual(testEmail);
        });

        it('should fail with 404 Unauthorized if no cookie is provided', async () => {
            await request(httpServer)
                .get('/users/me')
                .expect(404);
        });
    });
});
