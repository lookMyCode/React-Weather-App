import React, { Fragment } from 'react';

import { Switch, Route } from 'react-router-dom';

import './style.css';

import Nav from './Nav';
import Main from './Main';

function App() {
  return(
    <Fragment>
      <Nav />
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/:lat,:lon/' component={Main}/>
        <Route path='/:lat,:lon/:weatherFor' component={Main}/>
      </Switch>
    </Fragment>
  );
}

export default App;
