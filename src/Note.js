import React from 'react';
import ReactDOM from 'react-dom';

export default class Note extends React.Component {
    render() {
        return (
            <div>
                <h3>Note</h3>
                <h4>Date Modified on</h4>
                <button type="submit">Delete</button>
            </div>
        );
    }
}