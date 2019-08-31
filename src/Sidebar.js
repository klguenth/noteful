import React from 'react';
import ReactDOM from 'react-dom';
import Folder from './Folder';

export default class Sidebar {
    render() {
        return (
            <div>
                <Folder />
                <Folder />
                <Folder />
            </div>
        );
    }
}