import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;
const TOKEN = localStorage.getItem('TOKEN') || false;

// Token du local storage
if (TOKEN) {
  axios.defaults.headers.common.Authorization = `Bearer ${TOKEN}`;
}

// Register member
const register = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email: user.email,
      password: user.password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getMe = async () => {
  try {
    const response = (await axios.get(`${API_URL}/user`)).data.data;

    // On des booleans pour facilité l'affichage qui dépend des droits

    return response;
  } catch (er) {
    throw er;
  }
};

const getMyFavs = async () => {
  try {
    const response = (await axios.get(`${API_URL}/favs`)).data.data;

    // On des booleans pour facilité l'affichage qui dépend des droits

    return response;
  } catch (er) {
    throw er;
  }
};

const activate = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register/activate?token=${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const api = {};
api.register = register;
api.activate = activate;
api.getMe = getMe;
api.getMyFavs = getMyFavs;

export default api;
