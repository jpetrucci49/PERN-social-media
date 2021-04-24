import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

import { LoginRegisterModal } from './components';
import './App.css';

const App = () => {
  const [greeting, setGreeting] = useState(null);
  useEffect(() => {
    const getRes = async () => {
      await axios
        .get(process.env.REACT_APP_DB_URL + '/hello')
        .then((res) => setGreeting(res.data))
        .catch((err) => {
          throw new Error(err);
        });
    };
    getRes();
  }, [greeting]);

  return (
    <div className='App'>
      Hello {greeting}
      <Switch>
        <Route exact path='/'>
          You are not Currently logged in. Please {<LoginRegisterModal formVersion='login' />} or{' '}
          {<LoginRegisterModal formVersion='register' />}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
