require('dotenv').config()
const foldersRouter = require('./folders-router')
const notesRouter = require('./Note/notes-router')
const express = require('express')
const morgan = require('morgan')
const knex = require('knex')
const { PORT, DATABASE_URL } = require('./config')
const cors = require('cors')
console.log('Port equals', PORT)
console.log(process.env.API_TOKEN)

const app = express();
app.use(morgan('dev'));
app.use(function(req, res, next) { 
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization'); 
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE'); 
    if(req.method === 'OPTIONS') { 
        return res.sendStatus(204); 
    } 
    next(); 
});
app.use('/api/folders', foldersRouter);
app.use('/api/notes', notesRouter);


const knexInstance = knex({
    client: 'pg',
    connection: DATABASE_URL,
})

app.set('db', knexInstance)

app.get('/', (req, res) => {
    res.send('Noteful Express');
});

app.listen(PORT, () => {
    console.log(`Express server listening on http://localhost:${PORT}.`);
});

module.exports = app
module.exports = knexInstance