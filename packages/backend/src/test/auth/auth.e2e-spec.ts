import 'reflect-metadata';

import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../app/app.module";
import request from 'supertest';
import cookieParser from 'cookie-parser';

jest.mock('../../app/modules/auth/dto', () => {
    return {
        UserCreateDto: class {},
        UserUpdateDto: class {},
        UserResponseDto: class {
            checksum: string;
            email: string;
            createdAt: Date;
            updatedAt: Date

            constructor(
                checksum: string,
                email: string,
                createdAt: Date,
                updatedAt: Date
            ) {
                this.checksum = checksum;
                this.email = email;
                this.createdAt = createdAt;
                this.updatedAt = updatedAt;
            }
        },
        OtpCreateDto: class {},
        OtpUpdateDto: class {},
        OtpResponseDto: class {},
        JwtTokenResponseDto: class { 
            accessToken: string;
            constructor(accessToken: string) { 
                this.accessToken = accessToken; 
            } 
        },
    };
});

jest.mock('../../app/shared/dto/response/api-response.dto', () => {
    return {
        ApiResponseDto: class {
            constructor(public data: any) {}
        }
    };
});

describe('Auth', () => {
    let app: INestApplication;
    let httpServer: any;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
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

    describe('POST /auth/register', () => {
        const dummyEmail = `duplicate_${Date.now()}@gmail.com`;
        const dummyPassword = 'StrongPassword123!';

        beforeAll(async () => {
            await request(httpServer)
                .post('/auth/register')
                .send({
                    email: dummyEmail,
                    password: dummyPassword
                })
                .expect(201);
        })

        it('should fail to register with a duplicate email and return 400 Bad Request', async () => {
            const response = await request(httpServer)
                .post('/auth/register')
                .send({
                    email: dummyEmail,
                    password: dummyPassword
                })
                .expect(400);

            expect(response.body.data.data.message)
                .toEqual('User already exists');
        })
    })

    describe('POST /auth/login', () => {
        const loginEmail = `login_${Date.now()}@test.com`;
        const loginPassword = 'MySecretPassword123';

        beforeAll(async () => {
            await request(httpServer)
                .post('/auth/register')
                .send({
                    email: loginEmail,
                    password: loginPassword
                });
        });

        it('should successfully login with valid credentials and return an access token (200)', async () => {
            const response = await request(httpServer)
                .post('/auth/login')
                .send({
                    email: loginEmail,
                    password: loginPassword
                })
                .expect(200);

            const cookies = response.headers['set-cookie'];

            expect(cookies).toBeDefined();
            expect(cookies).toHaveLength(1);

            expect(cookies[0]).toMatch(/access_token=.+/);
        });

        it('shouldnt login with invalid credentials and return an unauthorized error', async () => {
            const response = await request(httpServer)
                .post('/auth/login')
                .send({
                    email: 'DUMMY@gmail.com',
                    password: '14235678'
                })
                .expect(401);

                expect(response.body.data.statusCode)
                    .toBe(401);
        });
    });
});
