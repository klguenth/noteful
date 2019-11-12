require('dotenv').config()
const foldersRouter = require('./folders-router')
const express = require('express')
const morgan = require('morgan')
const knex = require('knex')
const { PORT, DB_URL } = require('./config')
console.log('Port equals', PORT)
console.log(process.env.API_TOKEN)

const app = express();
app.use(morgan('dev'));
app.use('/api', foldersRouter);

const db = knex({
    client: 'pg',
    connection: DB_URL,
})

app.set('db', db)

app.get('/', (req, res) => {
    res.send('Noteful Express');
});

app.listen(PORT, () => {
    console.log(`Express server listening on http://localhost:${PORT}.`);
});