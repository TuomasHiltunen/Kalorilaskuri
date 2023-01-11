import React from 'react';
import Content from '../Content/Content';
import Button from '../buttons';

import './Settings.css';

function Settings(props) {
    return (
           <Content>
            <div className="settings">
              <div className="settings2">
               <h2>Profiili</h2>
               <div className="settings__profile">
                  <div><img src={props.user.photoURL} alt=""/></div>
                <div className="settings__userdata">
                  <div>{props.user.displayName}</div>
                  <div>{props.user.email}</div>
                </div>          
               </div>
                <div className="settings__button">
                  <Button onClick={props.onLogout}>Kirjaudu ulos</Button>
                </div>
              </div>
            </div>
           </Content>   
    );
  }

  export default Settings;