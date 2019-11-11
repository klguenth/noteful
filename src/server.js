require('dotenv').config()
const express = require('express');
const morgan = require('morgan')

console.log(process.env.API_TOKEN)

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Noteful Express');
});

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Express server listening on http://localhost:${PORT}.`);
});