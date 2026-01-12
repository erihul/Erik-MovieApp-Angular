export interface Environment {
  apiUrl: string;
  apiKey: string;
}

export const environment: Environment = {
  apiUrl: 'https://api.themoviedb.org/3',
  apiKey: 'YOUR_API_KEY_HERE'
};