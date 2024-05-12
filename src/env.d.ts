declare var process: {
  env: ProcessEnv;
};

interface ProcessEnv extends APIEndpoint {
  readonly NG_APP_ENV: string;
}

interface APIEndpoint {
  readonly NG_APP_API_BASE_URL: string;
  readonly NG_APP_API_ALL_TOPICS: string;
  readonly NG_APP_API_INT_FOOTBALL_GOALSCORERS: string;
  readonly NG_APP_API_INT_FOOTBALL_RESULTS: string;
  readonly NG_APP_API_INT_FOOTBALL_SHOOTOUTS: string;
}

/*
 ### use this setup when the "import.meta" jest error will be fixed ###
 
 interface ImportMeta {
   readonly env: ImportMetaEnv;
 }
 
 interface ImportMetaEnv extends APIEndpoint {
   readonly NODE_ENV: string;
 }
  
 */
