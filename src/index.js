// import path from 'path/posix';
import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './styles/styles.scss'
//import triangles from './pictures/triangles.jpg'

// if (module.hot) {
//   module.hot.accept()
// }



render(
  <div>
    <App />
  </div>,
  document.getElementById('app'),
)



// original script for start line 47
//"start": "nodemon server/server.js",

// original main js script on line 5
// "main": "index.js",
