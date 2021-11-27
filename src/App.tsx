import React, { useState, useEffect, Component} from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Login from './components/Login'
import Register from './components/Register'

const App = (props: any) => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      {/* <Header setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className="body-wrapper">
        <Menu menuOpen={menuOpen} />
        <Dashboard />
       </div> */}
       <Register />
    </div>
  );
}
export default App
