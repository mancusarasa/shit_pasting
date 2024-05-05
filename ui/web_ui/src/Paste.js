import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function Paste() {
  const { paste_id } = useParams();
  const [paste, setPaste] = useState(null);


  useEffect(() => {
    const fetchPaste = async () => {
      const host = process.env.REACT_APP_PASTE_SERVICE_HOST;
      const port = process.env.REACT_APP_PASTE_SERVICE_PORT;
      const pasteServiceUrl = `http://${host}:${port}/paste/${paste_id}`;
      await fetch(pasteServiceUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        return response.json();
      }).then(jsonValue => {
        console.log(jsonValue);
        setPaste(jsonValue.paste_text);
      }).catch(error => {
        console.log(error);
      });
    };
    fetchPaste();
  }, [paste_id]);


  return (
    <div>
      <h1>The requested paste is {paste_id}</h1>
      { (paste !== null) && <p> The paste text is: {paste} </p>}
    </div>
  );
}
