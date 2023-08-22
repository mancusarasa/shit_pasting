import { useEffect, useContext } from 'react';

import { AuthContext } from './AuthContext.js';


export default function Pastes() {

  const authToken = useContext(AuthContext);

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
        return response.json();
      }).then(jsonValue => {
        console.log('these are my pastes:');
        console.log(jsonValue);
      }).catch(error => {
        console.log(error);
      });
    };
    fetchPastes();
  });

  return (
    <div>My Pastes!</div>
  );
}
