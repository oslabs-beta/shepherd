import React from 'react';

const SettingTab = (props: any) => {
    return (
        <React.Fragment>
            <div 
                className={"tab-view-name" + (props.settingView === props.viewName ? ' setting-active' : '')}
                onClick={() => props.setSettingView(props.viewName)}
            >
                <div className="tab-view-icon">
                    {props.icon}
                </div>
                <div className="tab-text-wrapper">
                    <p className="tab-text-1">{props.mainTabText}</p>
                    <p className="tab-text-2">{props.subTabText}</p>
                </div>
            </div>  
        </React.Fragment>
    );
};

export default SettingTab;