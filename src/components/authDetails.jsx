import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {auth} from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthDetails = () => {
  const { t } = useTranslation();
  
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
    
        return () => {
          listen();
        };
      }, []);
    
      const userSignOut = () => {
        console.log('Sign out button clicked');
        signOut(auth)
          .then(() => {
            console.log('Sign out successful');
          })
          .catch((error) => {
            console.log(error);
          });
      };

      return (
        <div className="auth-details-container">
          {authUser ? (
            <div className="user-welcome">
              <p className="user-email">{`${t('Hi')} ${authUser.email}`}</p>
              <button className="sign-out-button" onClick={userSignOut}>
                {t('Sign.out')}
              </button>
            </div>
          ) : (
            <p className="signed-out-message">{t('Signed.out')}</p>
          )}
        </div>
      );
    };
    
    export default AuthDetails;