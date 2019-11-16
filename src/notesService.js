const NotesService = {
    getAllNotes(knex) {
        return knex.select('*').from('noteful_articles')
    },
    insertNote(knex, newNote) {
        return knex
            .insert(newNote)
            .into('noteful_articles')
            .returning('*')
    },
}

module.exports = NotesService