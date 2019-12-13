module.exports = {
    API_ENDPOINT: process.env.API_ENDPOINT || 'http://localhost:8000/api',
    PORT: process.env.PORT || 8000,
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/noteful',
    API_KEY: process.env.REACT_APP_API_KEY,
  }