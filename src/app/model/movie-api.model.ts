export interface MovieApiItem {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
    release_date: string;
    overview: string;
}

export interface MovieApiResponse {
    results: MovieApiItem[];
}
