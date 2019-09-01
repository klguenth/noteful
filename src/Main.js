import React from 'react';
import ReactDOM from 'react-dom';
import Note from './Note';

export default function Main() {
    return (
        <div>
            <Note />
            <Note />
            <Note />
            <button type="submit">Add note</button>
        </div>
    );
}