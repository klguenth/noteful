const path = require('path')
const express = require('express')
const xss = require('xss')
const FoldersService = require('./folder-service')

const foldersRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = folder ({
    id: folder.folder_id,
    name: xss(folder.name),
    note: xss(folder.note),
})

foldersRouter
    .route('/folder')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        FoldersService.getAllFolders(knexInstance)
            .then(folders => {
                res.json(folders.map(serializeFolder))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { name, note } = req.body
        const newFolder = { name, note }

        for (const [key, value] of Object.entries(newFolder))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            FoldersService.insertFolder(
                req.app.get('db'),
                newFolder
            )
                .then(folder => {
                    res
                        .status(201)
                        .location(path.posix.join(req.originalUrl, `/${folder.id}`))
                        .json(serializeFolder(folder))
                })
                .catch(next)
    })

foldersRouter
    .route('/:folder_id')
    .all((req, res, next) => {
        FoldersService.getById(
            req.app.get('db'),
            req.params.folder_id
        )
            .then(folder => {
                if (!folder) {
                    return res.status(404).json({
                        error: { message: `Article doesn't exist` }
                    })
                }
                res.folder = article
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeFolder(res.folder))
    })
    .delete((req, res, next) => {
        FoldersService.deleteFolder(
            req.app.get('db'),
            req.params.folder_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = foldersRouter