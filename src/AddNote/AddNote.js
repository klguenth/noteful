import React from 'react'
import ApiContext from '../ApiContext';
import config from '../config';
import CircleButton from '../CircleButton/CircleButton';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findNote, findFolder } from '../notes-helpers';

export default class AddNote extends React.Component {
        
    static defaultProps = {
        addNote: () => {},
      }
    static contextType = ApiContext;

      handleAddNote = event => {
        event.preventDefault()
        const newNote = {};
        newNote.note_name = event.target.name.value;
        newNote.content = event.target.content.value;
        newNote.folder_id = event.target.folder.value;
        newNote.id = this.props.id;
        newNote.modified = new Date();
        
    fetch(`${config.API_ENDPOINT}/notes/note`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newNote)
        })
        .then(res => {
            console.log(res);
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
        .then((data) => {
          this.context.addNote(data)
          //this.props.addNote(noteId)
          this.props.history.push(`/folder/${data.folder_id}`);
        })
        .catch(error => {
          console.error({ error })
        });
    }
    
    render() {
        const { notes, folders } = this.context
        console.log(folders);
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
        const myFolders = folders.map((folder, index) => <option key={index} value={folder.id}>{folder.name}</option>)
        return (
            <>
                <div>
                    <form className="createNote" onSubmit={this.handleAddNote}>
                        <h2>Add Note</h2>
                        <div className="form-group">
                            <div className="noteHint">* required</div>
                            <label htmlFor="name">Name*</label>
                            <input 
                                type="text" 
                                className="noteName" 
                                aria-label="note name"
                                aria-required="true"
                                required
                                name="name" 
                                id="noteName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <input 
                                type="text" 
                                className="noteContent"
                                aria-label="note content"
                                aria-required="true"
                                required 
                                name="content" 
                                id="noteContent" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="folderSelect">Folder Select</label>
                            <select 
                                className="folderSelect"
                                aria-label="select folder" 
                                name="folder">
                                { myFolders }
                            </select>
                        </div>

                        <div className="note-button">
                            <button 
                                type="submit" 
                                className="noteButtonSubmit"
                                aria-label="save button">
                                Save
                            </button>
                        </div>
                    </form>
                    <div className='NotePageNav'>
                    <CircleButton
                        tag='button'
                        role='link'
                        aria-label="back button"
                        onClick={() => this.props.history.goBack()}
                        className='NotePageNav__back-button'
                    >
                        <FontAwesomeIcon icon='chevron-left' />
                        <br />
                        Back
                    </CircleButton>
                    {folder && (
                        <h3 className='NotePageNav__folder-name'>
                        {folder.name}
                        </h3>
                    )}
                    </div>
                </div>
            </>
        )
    }
}

AddNote.propTypes = {
    id: PropTypes.string
}