import React, { useState } from 'react';
import SettingTab from './SettingTab';

const Settings = (props: any) => {

    const [settingView, setSettingView] = useState('edit-profile');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');

    return (
        <React.Fragment>
            <div className="settings-wrapper" onClick={() => props.setMenuOpen(false)}>
                <div className="settings-header">
                    <p className="settings-header-text"> Account Settings </p>
                </div>
                <div className="settings-body">
                    <div className="settings-left">
                        <SettingTab 
                            settingView={settingView} 
                            setSettingView={setSettingView} 
                            mainTabText="User Profile"
                            subTabText="Profile Settings"
                            viewName="edit-profile"
                            icon={<i className="far fa-address-card address-icon"></i>}
                        />
                        <SettingTab 
                            settingView={settingView} 
                            setSettingView={setSettingView} 
                            mainTabText="Change Password"
                            subTabText="Update Security"
                            viewName="change-password"
                            icon={<i className="fas fa-key key-icon"></i>}
                        />
                        <SettingTab 
                            settingView={settingView} 
                            setSettingView={setSettingView} 
                            mainTabText="Linked Accounts"
                            subTabText="View Connections"
                            viewName="linked-accounts"
                            icon={<i className="fas fa-link link-icon"></i>}
                        />
                    </div>
                    <div className="settings-right">
                        { settingView === 'edit-profile' ? 
                            <div className="edit-account-wrapper">
                                <div className="edit-header">Edit Account Details</div>
                                <div className="edit-name-field">
                                    <div className="edit-name-label">Name:</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={name}
                                        onChange={(e: any) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="edit-email-field">
                                    <div className="edit-email-label">Email address:</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={email}
                                        onChange={(e: any) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="edit-company-field">
                                    <div className="edit-company-label">Company:</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={company}
                                        onChange={(e: any) => setCompany(e.target.value)}
                                    />
                                </div>
                                <div className="update-button-wrapper">
                                    <div className="edit-update-button">Update</div>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Settings; 