import React, { ChangeEvent, FormEvent, useState } from 'react';
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
    const [profileEmail, setProfileEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [enterArnEmail, setArnEmail] = useState('');
    const [newArn, setNewArn] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (e: FormEvent) => {
        const reqParams = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            { 
              oldPassword,
              newPassword,
              email: confirmEmail
            }
          ),
        };
        fetch ('/user/updatePassword', reqParams)
          .then((res) => res.json())
          .then((res) => {
            if (res.status) {
             setShowPassword(true);
             setOldPassword('');
             setNewPassword('');
             setConfirmEmail('');
            } 
            console.log(res);
            console.log(reqParams)
          })
          .catch((error) => {
            console.error(error);
          });
        };

        const handleChangeArn = (e: FormEvent) => {
            console.log('password submitted')
            const reqParams = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(
                { 
                  newArn,
                  email: enterArnEmail
                }
              ),
            };
            fetch ('/user/updateArn', reqParams)
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                console.log(reqParams)
              })
              .catch((error) => {
                console.error(error);
              });
            };
    
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
                            setShowPassword={setShowPassword}
                            icon={<i className="far fa-address-card address-icon"></i>}
                        />
                        <SettingTab 
                            settingView={settingView} 
                            setSettingView={setSettingView} 
                            mainTabText="Change Password"
                            subTabText="Update Security"
                            viewName="change-password"
                            setShowPassword={setShowPassword}
                            icon={<i className="fas fa-key key-icon"></i>}
                        />
                        <SettingTab 
                            settingView={settingView} 
                            setSettingView={setSettingView} 
                            mainTabText="Linked Accounts"
                            subTabText="View Connections"
                            viewName="linked-accounts"
                            setShowPassword={setShowPassword}
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
                                    <div className="edit-email-label">Current Email address:</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={email}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="edit-new-email-field">
                                    <div className="edit-new-email-label">New Email Address:</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={profileEmail}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setProfileEmail(e.target.value)}
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
                                        type="password"
                                        className="input-field" 
                                        value={oldPassword}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="new-password-field">
                                    <div className="new-password-label">Enter new password:</div> 
                                    <input 
                                        type="password"
                                        className="input-field" 
                                        value={newPassword}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="confirm-password-field">
                                    <div className="confirm-password-label">Enter email to confirm:</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={confirmEmail}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmEmail(e.target.value)}
                                    />
                                </div>
                                { showPassword ? <span className="change-password-message">Password successfully changed</span> : null }
                                <div className="update-button-wrapper" onClick={handlePasswordChange}>
                                    <div className="edit-update-button">Update</div>
                                </div>
                            </div>
                            : null
                        }

                        { settingView === 'linked-accounts' ? 
                            <div className="linked-accounts-wrapper">
                                <div className="linked-accounts-header">Change ARN</div>
                                <div className="new-arn-field">
                                    <div className="new-arn-label">Enter new ARN:</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={newArn}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewArn(e.target.value)}
                                    />
                                </div>
                                <div className="linked-email-field">
                                    <div className="linked-email-label">Enter email to confirm:</div> 
                                    <input 
                                        type="text"
                                        className="input-field" 
                                        value={enterArnEmail}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setArnEmail(e.target.value)}
                                    />
                                </div>
                                <div className="update-button-wrapper" onClick={handleChangeArn}>
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