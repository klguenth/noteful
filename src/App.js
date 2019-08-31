import React from 'react';
import { Route } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Sidebar>
          <Route path='/' component={MainSidebar} />
          <Route path='/foo' component={FooSidebar} />
        </Sidebar>
        <Main>
          <Route path='/' component={MainMain} />
          <Route path='/foo' component={FooMain} />
        </Main>
      </div>
    );
  }
}