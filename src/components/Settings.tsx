import React, { ChangeEvent, useState } from 'react';
import SettingTab from './SettingTab';

type Props = {
    setMenuOpen: Function;  
    userData: {
        firstName: string,
        lastName: string,
        email: string, 
    }
}

const Settings = ({ setMenuOpen, userData }: Props ) => {

    const [settingView, setSettingView] = useState('edit-profile');
    const [name, setName] = useState(userData.firstName + ' ' + userData.lastName || '');
    const [email, setEmail] = useState(userData.email || '');
    const [company, setCompany] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    return (
        <React.Fragment>
            <div className="settings-wrapper" onClick={() => setMenuOpen(false)}>
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
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="edit-email-field">
                                    <div className="edit-email-label">Email address:</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={email}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="edit-company-field">
                                    <div className="edit-company-label">Company:</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={company}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
                                    />
                                </div>
                                <div className="update-button-wrapper">
                                    <div className="edit-update-button">Update</div>
                                </div>
                            </div>
                            : null
                        }

                        { settingView === 'change-password' ? 
                            <div className="change-password-wrapper">
                                <div className="change-password-header">Change Password</div>
                                <div className="current-password-field">
                                    <div className="current-password-label">Enter current password:</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={oldPassword}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="new-password-field">
                                    <div className="new-password-label">Enter new password:</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={newPassword}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="confirm-password-field">
                                    <div className="confirm-password-label">Re-enter new password</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={confirmPassword}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
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