import api from './api';
import type Auth from '@/types/auth';

class AuthService {
  async login(auth: Auth): Promise<boolean> {
    try {
      const token = await api.post('http://localhost:3001/auth/login', {
        userName: auth.userName,
        password: auth.password,
      });
      // Commenté parce qu'on va mettre un cookie
      // localStorage.setItem('TOKEN', response.data);
      // axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      localStorage.setItem('APP_LOGGED', 'true');
      localStorage.setItem('TOKEN', token.data.token);

      return true;
    } catch (error) {
      console.log(error); // TODO
      throw error;
    }
  }
  logout(): boolean {
    localStorage.removeItem('APP_LOGGED');
    localStorage.removeItem('TOKEN');
    return true;
  }
  isLogged(): boolean {
    const appLogged = localStorage.getItem('APP_LOGGED');

    return !!appLogged;
  }
  async register(auth: Auth): Promise<boolean> {
    try {
      await api.post(`http://localhost:3001/auth/register`, {
        userName: auth.userName,
        password: auth.password,
        mainCity: auth.mainCity,
      });

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default new AuthService();
