import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const API_BASE = API_BASE_URL.replace(/\/+$/, '');

export async function getPromoClients() {
  const { data } = await axios.get(`${API_BASE}/api/promo/clients`);

  return Array.isArray(data?.data)
    ? data.data
    : (Array.isArray(data?.clients) ? data.clients : []);
}

export async function submitAppointmentRequest(payload) {
  const { data } = await axios.post(`${API_BASE}/api/promo/appointments`, payload);
  return data;
}

export async function submitApplicationRequest(payload) {
  const { data } = await axios.post(`${API_BASE}/api/promo/applications`, payload);
  return data;
}

export async function submitContactMessage(payload) {
  const { data } = await axios.post(`${API_BASE}/api/promo/contact`, payload);
  return data;
}
