import React from 'react';
import { Link } from "react-router-dom";

const Menu = (props: any) => {
  return (
    <React.Fragment>
      <div className={ props.menuOpen ? "menu-wrapper" : "menu-wrapper open"}>
        <div className={ props.menuOpen ? "menu-navigation open" : "menu-navigation" } >
          <Link to="/" style={{textDecoration: 'none'}}>
            <div 
              className={"dashboard-link nav-link" + (props.currentView === 'dashboard' ? ' selected-view' : '')}
              onClick={() => {
                props.setCurrentView('dashboard');
                props.setMenuOpen(false);
              }}
            >
              Dashboard
            </div>
          </Link>
          <Link to="/functions" style={{textDecoration: 'none'}}>
            <div 
              className={"functions-link nav-link" + (props.currentView === 'functions' ? ' selected-view' : '')}
              onClick={() => {
                props.setCurrentView('functions');
                props.setMenuOpen(false);
              }}
            >
              Functions
            </div>
          </Link>
          {/* <div 
            className={"anomaly-link nav-link" + (props.currentView === 'anomaly' ? ' selected-view' : '')}
            onClick={() => props.setCurrentView('anomaly')}
          >
            Anomaly
          </div> */}
          <Link to="/settings" style={{textDecoration: 'none'}}>
            <div 
              className={"settings-link nav-link" + (props.currentView === 'settings' ? ' selected-view' : '')}
              onClick={() => {
                props.setCurrentView('settings');
                props.setMenuOpen(false);
              }}
            >
              Settings
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Menu; 