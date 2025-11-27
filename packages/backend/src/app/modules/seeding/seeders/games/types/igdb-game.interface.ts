export interface IgdbGame {
	checksum: string;
	name: string;
	summary?: string;
	storyline?: string;
	total_rating?: number;
	total_rating_count?: number;
	url?: string;
	first_release_date?: number;
	platforms?: Array<number | string | { checksum: string }>;
	genres?: Array<number | string | { checksum: string }>;
	keywords?: Array<number | string | { checksum: string }>;
}

