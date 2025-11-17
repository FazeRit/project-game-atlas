export abstract class IWriteRepository<TData, TCreate, TUpdate> {
	abstract create(data: TCreate): Promise<TData | null>;
	abstract update(checksum: string, data: TUpdate): Promise<TData | null>;
	abstract delete(checksum: string): Promise<void>;
}