import React from 'react';
import NOTES from './store';

export default function Note(props) {
    const note = NOTES.find(notes =>
        notes.id === props.match.notes.id
    )
        return (
            <div className="Note">
                <h3>{note.name}</h3>
                <h4>Date Modified on: {note.modified}</h4>
                <button type="submit">Delete</button>
            </div>
        );
}