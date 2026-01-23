export type Movie = {
    id: number;
    poster: string;
    title: string;
    rating: number;
    year: number;
    description: string;
    runtime?: number;
    showDetails?: boolean;
};

export type SavedMovieItem = {
    id: number;
    title: string;
    poster: string;
};

