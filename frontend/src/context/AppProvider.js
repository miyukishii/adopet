import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import api from '../services/services';

function AppProvider({ children }) {
  const [userData, setUserData] = useState([]);
  const [state, setState] = useState();
  const [filter, setFilter] = useState(undefined);
  const [authorization, setAuthorization] = useState(null);
  const [userLogged, setUserLogged] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [chatListIds, setChatListIds] = useState([]);

  useEffect(() => {
    const fetchIdData = async () => {
      const uid = localStorage.getItem('uid');
      if (uid && userData) {
        api.get(`/${uid}`).then((response) => {
          if (response.status === 200) {
            setAuthorization(true);
            setUserData(response.data);
            setRedirect(true);
          }
        }).catch((error) => {
          console.log(error.message);
        });
      }
    };
    // (userLogged) && fetchIdData();
    fetchIdData()
  }, [userData, userLogged])

  return (
    <AppContext.Provider
      value={{
        state,
        userData,
        filter,
        redirect,
        setUserData,
        setState,
        setRedirect,
        setFilter,
        setUserLogged,
        authorization,
        setAuthorization,
        chatListIds,
        setChatListIds,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
