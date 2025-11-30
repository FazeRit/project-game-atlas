export interface ICompany {
    checksum: string;
    name: string;
    slug?: string;
    country?: number;
    startDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGameCompany {
    developer: boolean;
	publisher: boolean;
	supporting: boolean;
	company: ICompany;
}