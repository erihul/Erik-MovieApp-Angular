export interface MovieDetail {
  id: number;
  title: string;
  poster?: string;
  backdrop?: string;

  description?: string;
  rating?: number;
  year?: number;
  runtime?: number;

  genres?: { id: number; name: string }[];

  releaseDate?: string;
  budget?: number;
  homepage?: string;

  trailerKey?: string;
}
