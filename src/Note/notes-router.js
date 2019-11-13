require('dotenv').config()
const path = require('path')
const express = require('express')
const xss = require('xss')
const NotesService = require('./notes-service')

const notesRouter = express.Router()
const jsonParser = express.json()

const serializeNote = note => ({
    id: note.id,
    content: xss(note.content),
    date_created: note.date_created,
    modified: note.modified,
    folder_id: folder.folder_id,
})

NotesService.getAllNotes(knexInstance)
    .then(notes => console.log(notes))
    .then(() =>
        NotesService.insertNote(knexInstance, {
            content: 'New content',
            date_published: new Date(),
        })
    )
    .then(newNote => {
        console.log(newNote)
        return NotesService.updateNote(
            knexInstance,
            newNote.id
        ).then(() => NotesService.getById(knexInstance, newNote.id))
    })
    .then(note => {
        console.log(note)
        return NotesService.deleteNote(knexInstance, note.id)
    })

notesRouter
    .route('/note')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        NotesService.getAllNotes(knexInstance)
            .then(notes => {
                res.json(notes.map(serializeNote))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { content, folder_id, date_created } = req.body
        const newComment = { content, folder_id, date_created }

        for (const [key, value] of Object.entries(newNote))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body`}
                })

        newNote.date_created = date_created;

        NotesService.insertNote(
            req.app.get('db'),
            newNote
        )
            .then(note => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${note.id}`))
                    .json(serializeNote(note))
            })
            .catch(next)
    })

notesRouter
    .route('/:note_id')
    .all((req,res,next) => {
        NotesService.getById(
            req.app.get('db'),
            req.params.comment_id
        )
            .then(note => {
                if (!note) {
                    return res.status(404).json({
                        error: { message: `Note doesn't exist` }
                    })
                }
                res.note = note
                next()
            })
            .get((req, res, next) => {
                res.json(serializeNote(res.note))
            })
            .delete((req, res, next) => {
                NotesService.deleteNote(
                    req.app.get('db'),
                    req.params.note_id
                )
                    .then(numRowsAffected => {
                        res.status(204).end()
                    })
                    .catch(next)
            })
            .patch(jsonParser, (req, res, next) => {
                const { content, modified } = req.body
                const noteToUpdate = { content, modified }

                const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length
                if (numberOfValues === 0)
                    return res.status(400).json({
                        error: {
                            message: `Request body must contain either 'content' or 'modified'`
                        }
                    })
                NotesService.updateNote(
                    req.app.get('db'),
                    req.params.note_id,
                    noteToUpdate
                )
                    .then(numRowsAffected => {
                        res.status(204).end()
                    })
                    .catch(next)
            })
    })

    module.exports = notesRouter