import React from 'react';

const Menu = (props: any) => {
  return (
    <React.Fragment>
      <div className={ props.menuOpen ? "menu-wrapper" : "menu-wrapper open"}>
        <div className={ props.menuOpen ? "menu-navigation open" : "menu-navigation" } >
          <div 
            className={"dashboard-link nav-link" + (props.currentView === 'dashboard' ? ' selected-view' : '')}
            onClick={() => {
              props.setCurrentView('dashboard');
              props.setMenuOpen(false);
            }}
          >
            Dashboard
          </div>
          <div 
            className={"anomaly-link nav-link" + (props.currentView === 'anomaly' ? ' selected-view' : '')}
            onClick={() => props.setCurrentView('anomaly')}
          >
            Anomaly
          </div>
          <div 
            className={"settings-link nav-link" + (props.currentView === 'settings' ? ' selected-view' : '')}
            onClick={() => {
              props.setCurrentView('settings');
              props.setMenuOpen(false);
            }}
          >
            Settings
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Menu; 