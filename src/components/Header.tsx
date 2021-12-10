import React from 'react';
import { Link } from "react-router-dom";

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
            <Link to="/" style={{textDecoration: 'none'}}>
              <div className="logo" onClick={() => handleClick('dashboard')}>
                <i className="fab fa-wolf-pack-battalion shepherd-icon"></i> &nbsp;
                  SHEPHERD
              </div>
            </Link>
            <div className="menu-button-container" onClick={() => props.setMenuOpen(!props.menuOpen)}>
              <i className="fas fa-bars menu-icon"></i>
            </div>
          </div>
          <Link to="/settings" style={{textDecoration: 'none'}}>
            <div className="profile-wrapper">
              <div className="user-profile" onClick={() => handleClick('settings')}>
                <i className="fas fa-user-circle user-icon"></i>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header; 