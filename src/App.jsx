import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import Home from '@pages/Home';
import Services from '@pages/Services';
import OurClients from '@pages/OurClients';
import AboutUs from '@pages/AboutUs';
import Contact from '@pages/Contact';
import JoinTheForce from '@pages/JoinTheForce';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="our-clients" element={<OurClients />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="join-the-force" element={<JoinTheForce />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
