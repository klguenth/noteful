import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Note from './Note';
import Folder from './Folder';
import Sidebar from './Sidebar';

export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Header>
          <Route exact path='/' component={Header} />
        </Header>
        <Sidebar>
          <Route path='/' component={Sidebar} />
        </Sidebar>
        <Main>
          <Route path='/' component={Note} />
        </Main>
      </div>
    );
  }
}