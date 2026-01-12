    export type Movie = {
        id: number;
        poster: string;
        title: string;
        rating: number;
        year: number;
        genre: string;
        description: string;
        director: string;
    };

    export type MovieApiResponse = {
        results: Movie[];
    };