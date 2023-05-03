import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;
const TOKEN = localStorage.getItem('TOKEN') || false;

// Token du local storage
if (TOKEN) {
  axios.defaults.headers.common.Authorization = `Bearer ${TOKEN}`;
}

const getHours = async (insee) => {
  try {
    const response = await axios.get(`${API_URL}/meteo/hour/${insee}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const api = {};
api.getHours = getHours;

export default api;
