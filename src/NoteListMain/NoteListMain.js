import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import PropTypes from 'prop-types'
import './NoteListMain.css'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    console.log('notesForFolder:', notesForFolder);
    return (
      <>
        <section className='NoteListMain'>
          <>
              <ul>
                {notesForFolder.map(note =>
                  <li key={note.id}>
                    <Note
                      id={note.id}
                      note_name={note.note_name}
                      content={note.content}
                      modified={note.modified}
                    />
                  </li>
                )}
              </ul>
            </>
          <div className='NoteListMain__button-container'>
              <CircleButton
                tag={ Link }
                to='/add-note'
                type='button'
                aria-label='add note button'
                className='NoteListMain__add-note-button'
              >
                <FontAwesomeIcon icon='plus' />
                <br />
                Note
              </CircleButton>
          </div>
        </section>
      </>
    )
  }
}

NoteListMain.propTypes = {
  id: PropTypes.number,
  note_name: PropTypes.string,
  content: PropTypes.string,
  modified: PropTypes.string
}