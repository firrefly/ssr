// Modules
import React from 'react';
import ReactDOM from 'react-dom';
// Components
import { Home } from './src/home';

const DOM_ROOT = document.getElementById('root');

if (DOM_ROOT) {
  ReactDOM.hydrate(
    <Home />,
    document.getElementById('root')
  );
}
