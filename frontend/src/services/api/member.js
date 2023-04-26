import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

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

export default api;
