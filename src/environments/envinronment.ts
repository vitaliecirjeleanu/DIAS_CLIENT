export const environment = {
  production: false,
  api: {
    baseUrl: process.env.NG_APP_API_BASE_URL,
    endpoints: {
      topics: process.env.NG_APP_API_ALL_TOPICS,
      images: process.env.NG_APP_API_IMAGES,
      intFootball: {
        goalscorers: process.env.NG_APP_API_INT_FOOTBALL_GOALSCORERS,
        results: process.env.NG_APP_API_INT_FOOTBALL_RESULTS,
        shootouts: process.env.NG_APP_API_INT_FOOTBALL_SHOOTOUTS,
      },
    },
  },
};
