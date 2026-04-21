import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import Home from '@pages/Home';
//import Services from '@pages/Services';
//import OurClients from '@pages/OurClients';
import JoinTheForce from '@pages/JoinTheForce';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="services" element={<Services />} /> */}
          {/* <Route path="clients" element={<OurClients />} /> */}
          <Route path="join" element={<JoinTheForce />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
