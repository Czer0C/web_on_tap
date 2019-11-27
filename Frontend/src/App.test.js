import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/js/core/corejquery.min.js'
import './assets/js/core/popper.min.js'
import './assets/js/bootstrap-material-design.js'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
