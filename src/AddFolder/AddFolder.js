import React from 'react'
import ApiContext from '../ApiContext';
import config from '../config';
import PropTypes from 'prop-types'

export default class AddFolder extends React.Component {
    
    static defaultProps = {
        addFolder: () => {},
      }
      static contextType = ApiContext;
    
      handleAddFolder = event => {
        event.preventDefault()
        const newFolder = {}
        newFolder.name = event.target.name.value
        const folderId = this.props.id
    
    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
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
          this.context.addFolder(folderId)
          // allow parent to perform extra behaviour
          this.props.addFolder(folderId)
        })
        .catch(error => {
          console.error({ error })
        });
      }

    render() {
        return (
            <form className="createFolder">
                <h2>Add Folder</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="name" name="name" id="name" />
                </div>
                <div className="createFolderButtons">
                    <button type="reset" className="buttonReset">
                        Cancel
                    </button>
                    <button type="submit" className="buttonSubmit">
                        Save
                    </button>
                </div>
            </form>
        );
    }
}

AddFolder.propTypes = {
    value: PropTypes.string
}