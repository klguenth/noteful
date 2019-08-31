import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';

export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Header>
          <Route path='/' component={Header} />
        </Header>
        <Sidebar>
          <Route path='/' component={MainSidebar} />
          <Route path='/foo' component={FooSidebar} />
        </Sidebar>
        <Main>
          <Route path='/' component={FooFoo} />
          <Route path='/foo' component={FooMain} />
        </Main>
      </div>
    );
  }
}