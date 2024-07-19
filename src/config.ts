export interface Config {
    apiKey: string;
    apiUrl: string;
  }
  
  export const defaultConfig: Config = {
    apiKey: '',
    apiUrl: 'http://localhost:8080/',
  };
  