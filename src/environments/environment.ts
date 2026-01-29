  export interface Environment {
	apiKey: string;
	apiToken: string;
    apiUrl: string;
    imageUrl: string;
  }

  export const environment: Environment = {
	apiKey: 'YOUR_API_KEY_HERE',
	apiToken: 'YOUR_API_TOKEN_HERE',
    apiUrl: 'https://api.themoviedb.org/3',
    imageUrl: 'https://image.tmdb.org/t/p'
  };