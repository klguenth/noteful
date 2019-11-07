const path = require('path')
const express = require('express')
const xss = require('xss')
const FoldersService = require('./folder-service')

const foldersRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = folder ({
    id: folder.folder_id,
    //CHECK FOLDER TABLE COLUMNS
})

foldersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        FoldersService.getAllFolders(knexInstance)
            .then(folders => {
                res.json(folders.map(serializeFOlder))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { }
    })