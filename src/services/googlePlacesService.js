import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/promo/google/places`,
  headers: { 'Content-Type': 'application/json' },
});

async function autocompleteAddress(query, signal) {
  const { data } = await api.get('/autocomplete', {
    params: { q: query },
    signal,
  });

  return data.predictions || [];
}

async function getPlaceDetails(placeId, signal) {
  const { data } = await api.get('/details', {
    params: { placeId },
    signal,
  });

  return data;
}

export default {
  autocompleteAddress,
  getPlaceDetails,
};
