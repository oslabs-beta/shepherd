import React, { useState, useEffect, Component} from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Login from './components/Login'
import Register from './components/Register'

const App = (props: any) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="container">
      <Header 
        setMenuOpen={setMenuOpen} 
        menuOpen={menuOpen} 
        setCurrentView={setCurrentView}
      />
      <div className="body-wrapper">
        <Menu 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen} 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
      />
        { currentView === 'dashboard' ? <Dashboard setMenuOpen={setMenuOpen} /> : null }
        { currentView === 'settings' ? <Settings setMenuOpen={setMenuOpen} /> : null }
       </div>
    </div>
  );
}

export default App;

