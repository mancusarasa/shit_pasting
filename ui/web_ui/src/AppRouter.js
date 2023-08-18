import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './Homepage.js'
import Pastes from './Pastes.js'
import Navbar from './Navbar.js'


export default function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/myPastes" element={<Pastes/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
