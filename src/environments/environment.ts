  export interface Environment {
    apiUrl: string;
    apiKey: string;
    imageUrl: string;
  }

  export const environment: Environment = {
    apiUrl: 'https://api.themoviedb.org/3',
    apiKey: 'YOUR_API_KEY_HERE',
    imageUrl: 'https://image.tmdb.org/t/p'
  };