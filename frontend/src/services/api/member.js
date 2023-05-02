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
    console.log(user.userName);
    await axios.post(`${API_URL}/auth/register`, {
      userName: user.userName,
      password: user.password,
      mainCity: user.mainCity,
    });
    return true;
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

const changeFav = async (codeInsee) => {
  try {
    console.log(codeInsee);
    const response = (await axios.put(`${API_URL}/favs`), {
      insee: codeInsee.toString(),
    });

    return response.data.data;
  } catch (er) {
    throw er;
  }
};

const addFav = async (insee) => {
  try {
    await axios.get(`${API_URL}/city/${insee}`);
    const user = { userName: '', insee };
    const response = await axios.post(`${API_URL}/favs`, user);

    return response;
  } catch (er) {
    throw er;
  }
};

const dropFav = async (insee) => {
  try {
    const response = (await axios.delete(`${API_URL}/favs/${insee}`)).data.data;

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
api.dropFav = dropFav;
api.addFav = addFav;
api.changeFav = changeFav;

export default api;
