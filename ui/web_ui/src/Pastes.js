import { useState, useEffect, useContext } from 'react';

import { Link } from "react-router-dom";

import { AuthContext, AuthDispatchContext } from './AuthContext.js';


export default function Pastes() {

  const authToken = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);
  const [pastes, setPastes] = useState([]);

  useEffect(() => {
    const fetchPastes = async () => {
      const host = process.env.REACT_APP_PASTE_SERVICE_HOST;
      const port = process.env.REACT_APP_PASTE_SERVICE_PORT;
      const pasteServiceUrl = `http://${host}:${port}/myPastes`;
      await fetch(pasteServiceUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      }).then(response => {
        if (response.status === 403) {
          dispatch({'type': 'logged_out'})
        }
        return response.json();
      }).then(jsonValue => {
        setPastes(jsonValue.pastes);
      }).catch(error => {
        console.log(error);
      });
    };
    fetchPastes();
  }, [authToken, dispatch]);

  return pastes !== null ? (
    <div>
      <ul>
        {pastes.map((paste) => {
          return (
            <li key={paste.paste_id}>
            <Link to={'/paste/'+ paste.paste_id}>Something</Link>
              <hr />
              <br />
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div>
      No pastes yet!
    </div>
  );
}
