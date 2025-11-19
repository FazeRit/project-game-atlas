import { IOtpReadRepository } from '../../repositories/otp/abstracts/iotp-read.repository';
import { IOtpWriteRepository } from '../../repositories/otp/abstracts/iotp-write.repository';
import { OtpReadRepository } from '../../repositories/otp/implementations/otp-read.repository';
import { OtpWriteRepository } from '../../repositories/otp/implementations/otp-write.repository';
import { Provider } from '@nestjs/common';

export const OTP_PROVIDERS: Array<Provider> = [
	{
		provide: IOtpReadRepository,
		useClass: OtpReadRepository,
	},
	{
		provide: IOtpWriteRepository,
		useClass: OtpWriteRepository,
	},
];

