import axios from 'axios';
import ls from 'local-storage';

// Utilisation de require pour contourner un bug de webpack
const router = require('../router');

const API_URL = process.env.VUE_APP_API_URL;
let TOKEN = ls('TOKEN') || false;
const redirectRouteName = 'login';

// Token du local storage
if (TOKEN) {
  axios.defaults.headers.common.Authorization = `Bearer ${TOKEN.token}`;
}

// Récupération par axios d'une 401 (unauthorized) et redirection login
axios.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status === 401) {
    ls.remove('TOKEN');
    if (router.currentRoute.name !== redirectRouteName) router.push({ name: redirectRouteName });
    return new Promise(() => {});
  }
  return Promise.reject(error);
});

// Récupération du token
const getToken = () => ls('TOKEN');

// L'utilisateur est-il loggué
const isLoggedIn = () => !!getToken();

// Login
const login = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: user.email,
      password: user.password,
    });

    TOKEN = response.data;
    ls('TOKEN', response.data);
    axios.defaults.headers.common.Authorization = `Bearer ${TOKEN.token}`;

    return true;
  } catch (error) {
    throw error;
  }
};

// Logout
const logout = () => {
  ls.remove('TOKEN');
  ls.remove('STATUS');
  delete axios.defaults.headers.common.Authorization;
};

// Authorization Header
const getAuthorizationHeader = () => axios.defaults.headers.common.Authorization;

const auth = {};
auth.login = login;
auth.isLoggedIn = isLoggedIn;
auth.logout = logout;
auth.getToken = getToken;
auth.getAuthorizationHeader = getAuthorizationHeader;

export default auth;
