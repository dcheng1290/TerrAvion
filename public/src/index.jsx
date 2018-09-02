import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(
  <App url="http://localhost:3400/events" author="David" perPage={1} />,
  document.getElementById('app')
);
