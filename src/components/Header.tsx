import React from 'react';

const Header = (props: any) => {

  const handleClick = (...args: any) => {
    props.setCurrentView(...args);
    props.setMenuOpen(false);
  };

  return (
    <React.Fragment>
      <div className="navigation-wrapper">
        <div className="top-navigation">
          <div className="logo-wrapper">
            <div className="logo" onClick={() => handleClick('dashboard')}>
              <i className="fab fa-wolf-pack-battalion shepherd-icon"></i> &nbsp;
                SHEPHERD
            </div>
            <div className="menu-button-container" onClick={() => props.setMenuOpen(!props.menuOpen)}>
              <i className="fas fa-bars menu-icon"></i>
            </div>
          </div>
          <div className="profile-wrapper">
            <div className="user-profile" onClick={() => handleClick('settings')}>
              <i className="fas fa-user-circle user-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header; 