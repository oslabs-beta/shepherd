import React from 'react';

const Header = (props: any) => {
  return (
    <React.Fragment>
      <div className="navigation-wrapper">
        <div className="top-navigation">
          <div className="logo-wrapper">
            <div className="logo">
              SHEPHERD
            </div>
            <div className="menu-button" onClick={() => props.setMenuOpen(!props.menuOpen)}>
              MENU
            </div>
          </div>
        <div className="profile-wrapper">
          <div className="toggle-dark">
            TOGGLE DARK
          </div>
          <div className="notifications">
            NOTIFICATIONS
          </div>
          <div className="user-profile">
            PROFILE
          </div>
        </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header; 