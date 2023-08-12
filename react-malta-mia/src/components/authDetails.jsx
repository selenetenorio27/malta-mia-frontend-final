import React, { useEffect, useState } from 'react';
import {auth} from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthDetails = () => {
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
            <>
              <p>{`Hola ${authUser.email}`}</p>
              <button onClick={userSignOut}>Sign Out</button>
            </>
          ) : (
            <p>Signed Out</p>
          )}
        </div>
      );
    };
    
    export default AuthDetails;