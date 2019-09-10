import React from 'react'

export default class AddNote extends React.Component {
        
    static defaultProps = {
        addNote: () => {},
      }
      static contextType = ApiContext;
    
      handleAddNote = e => {
        e.preventDefault()
        const newNote = {};
        newNote.name = event.target.name.value;
        newNote.content = event.target.content.value;
        const noteId = this.props.id
    
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newNote)
        })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
        .then(() => {
          this.context.addNote(noteId)
          // allow parent to perform extra behaviour
          this.props.addNote(noteId)
        })
        .catch(error => {
          console.error({ error })
        });
      
    validateName() {
        const name = "this.state.name.value.trim()"
        if (name.length === 0) {
            return 'Name is required';
        }
    }
    
    render() {
        return (
            <form className="createNote">
                <h2>Add Note</h2>
                <div className="form-group">
                    <div className="noteHint">* required</div>
                    <label htmlFor="name">Name*</label>
                    <input type="text" className="noteName" name="name" id="noteName" />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <input type="text" className="noteContent" name="content" id="noteContent" />
                </div>
                <div className="form-group">
                    <label htmlFor="folderSelect">Folder Select</label>
                </div>

                <div className="note-button">
                    <button type="reset" className="noteButtonReset">
                        Cancel
                    </button>
                    <button type="submit" className="noteButtonSubmit">
                        Save
                    </button>
                </div>
            </form>
        )
    }
}}