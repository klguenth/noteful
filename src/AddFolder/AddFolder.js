import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config';
import PropTypes from 'prop-types';
import CircleButton from '../CircleButton/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findNote, findFolder } from '../notes-helpers';

export default class AddFolder extends React.Component {
    
    static defaultProps = {
      addFolder: () => {},
    }
    static contextType = ApiContext;
    
    handleAddFolder = event => {
      event.preventDefault();
      const newFolder = {};
      newFolder.name = event.target.name.value;
      const folderId = this.props.id;

      fetch(`${config.API_ENDPOINT}/folders/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newFolder)
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        // this.context.addFolder(folderId)
        // allow parent to perform extra behaviour
        this.props.addFolder(folderId, newFolder)
        this.props.history.push('/');
      })
      .catch(error => {
        console.error({ error })
      });
    }

    render() {
      const { notes, folders, } = this.context
      const { noteId } = this.props.match.params
      const note = findNote(notes, noteId) || {}
      const folder = findFolder(folders, note.folderId)

        return (
          <div>
            <form className="createFolder" onSubmit={this.handleAddFolder}>
                <h2>Add Folder</h2>
                <div className="form-group">
                    <label htmlFor="folderName">Name</label>
                    <input 
                      type="text" 
                      className="name" 
                      aria-label="folder name"
                      name="name" 
                      id="name" />
                </div>
                <div className="createFolderButtons">
                    <button 
                      type="submit" 
                      className="buttonSubmit"
                      aria-label="submit button">
                        Save
                    </button>
                </div>
            </form>
            <div className='NotePageNav'>
              <CircleButton
                tag={Link}
                to='/'
                role='link'
                aria-label='back button'
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
      );
    }
}

AddFolder.propTypes = {
    id: PropTypes.string
}