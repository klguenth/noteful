import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Note from './Note';
import Folder from './Folder';
import Sidebar from './Sidebar';
import Main from './Main';

export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <Sidebar>
          <Route path='/sidebar' component={Sidebar} />
          <Route path='/folder/:folder-id' component={Folder} />
        </Sidebar>
        <Main>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/note/:note-id' component={Note} />
          </Switch>
        </Main>
      </div>
    );
  }
}