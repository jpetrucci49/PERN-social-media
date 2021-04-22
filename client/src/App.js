import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

const App = () => {
  const [greeting, setGreeting] = useState(null);
  useEffect(() => {
    const getRes = async () => {
      await axios
        .get('/hello')
        .then((res) => setGreeting(res.data))
        .catch((err) => {
          throw new Error(err);
        });
    };
    getRes();
  }, [greeting]);

  return <div className='App'>Hello {greeting}</div>;
};

export default App;
