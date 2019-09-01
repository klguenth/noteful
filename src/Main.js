import React from 'react';
import { Link } from 'react-router-dom';
import NOTES from './store';

export default function Main() {
    return (
        <div>
            <ul className="NoteList">
                {NOTES.map(note =>
                    <li key={note.id}>
                        <Link to={`/note/${note.id}`}>
                            {note.name}
                        </Link>
                    </li>
                )}
            </ul>
            <button type="submit">Add note</button>
        </div>
    );
}