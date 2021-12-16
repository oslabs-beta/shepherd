import React from 'react';

type Props = {
    settingView: string,
    viewName: string,
    setSettingView: Function,
    icon: React.ReactNode,
    mainTabText: string,
    subTabText: string,
    setShowPassword: Function,
}

const SettingTab = ({ settingView, viewName, setSettingView, icon, mainTabText, subTabText, setShowPassword }: Props) => {
    return (
      <React.Fragment>
          <div 
              className={"tab-view-name" + (settingView === viewName ? ' setting-active' : '')}
              onClick={() => {
                  setSettingView(viewName);
                  setShowPassword(false);
                }}
          >
              <div className="tab-view-icon">
                   {icon}
               </div>
              <div className="tab-text-wrapper">
                  <p className="tab-text-1">{mainTabText}</p>
                  <p className="tab-text-2">{subTabText}</p>
              </div>
           </div>  
      </React.Fragment>
    );
};

export default SettingTab;