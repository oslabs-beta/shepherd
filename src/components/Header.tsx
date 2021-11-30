import React from 'react';

const Header = (props: any) => {

  return (
    <React.Fragment>
      <div className="navigation-wrapper">
        <div className="top-navigation">
          <div className="logo-wrapper">
            <div className="logo">
              <i className="fab fa-wolf-pack-battalion shepherd-icon"></i> &nbsp;
                SHEPHERD
            </div>
            <div className="menu-button-container" onClick={() => props.setMenuOpen(!props.menuOpen)}>
              <i className="fas fa-bars menu-icon"></i>
            </div>
          </div>
        <div className="profile-wrapper">
          <div 
            className="user-profile" 
            onClick={() => {
              props.setCurrentView('settings');
              props.setMenuOpen(false);
            }}>
            <i className="fas fa-user-circle user-icon"></i>
          </div>
        </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header; 