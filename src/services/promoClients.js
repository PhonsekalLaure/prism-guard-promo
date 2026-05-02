import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function getPromoClients() {
  const { data } = await axios.get(`${API_BASE_URL}/api/promo/clients`);

  return Array.isArray(data?.data)
    ? data.data
    : (Array.isArray(data?.clients) ? data.clients : []);
}
