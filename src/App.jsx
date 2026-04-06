import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import OurClients from '@/pages/OurClients';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="clients" element={<OurClients />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
