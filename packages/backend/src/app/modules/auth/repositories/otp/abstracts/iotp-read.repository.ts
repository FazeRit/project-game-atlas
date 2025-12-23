import { OtpResponseDto } from "../../../dto";

export abstract class IOtpReadRepository {
	abstract findOneByEmail(email: string): Promise<OtpResponseDto | null>;
}