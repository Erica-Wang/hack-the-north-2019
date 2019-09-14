import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import home from './home.js';
import login from './login.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.render(<home />, div);
  ReactDOM.render(<login />, div);
  ReactDOM.unmountComponentAtNode(div);
});
