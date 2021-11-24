import React from 'react';

const Menu = (props: any) => {
  return (
    <React.Fragment>
      <div className={ props.menuOpen ? "menu-wrapper" : "menu-wrapper open"}>
        <div className={ props.menuOpen ? "menu-navigation open" : "menu-navigation" } >
          <div className="dashboard-link nav-link">
            Dashboard
          </div>
          <div className="anomaly-link nav-link">
            Anomaly
          </div>
          <div className="settings-link nav-link">
            Settings
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Menu; 