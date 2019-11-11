const express = require('express');
const morgan = require('morgan')

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Noteful Express');
});

app.listen(8000, () => {
    console.log('Express server listening on port 8000.');
});