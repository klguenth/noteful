module.exports = {
    API_ENDPOINT: 'http://localhost:8000/api',
    PORT: 8000,
    DB_URL: process.env.DB_URL || 'postgresql://postgres@localhost/noteful',
    API_KEY: process.env.REACT_APP_API_KEY,
  }