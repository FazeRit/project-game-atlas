export abstract class IReadRepository<TData> {
	abstract findById(checksum: string): Promise<TData | null>;
}