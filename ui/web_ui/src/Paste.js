import { useParams } from 'react-router-dom';


export default function Paste() {
  const { paste_id } = useParams();
  return (
    <div>
      <h1>The requested paste is {paste_id}</h1>
    </div>
  );
}
