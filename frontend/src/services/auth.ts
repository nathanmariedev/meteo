import api from './api';
import type Auth from '@/types/auth';

class AuthService {
  async login(auth: Auth): Promise<boolean> {
    try {
      await api.post('/auth/login', {
        email: auth.email,
        password: auth.password,
      });
      // Commenté parce qu'on va mettre un cookie
      // localStorage.setItem('TOKEN', response.data);
      // axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      localStorage.setItem('APP_LOGGED', 'true');

      return true;
    } catch (error) {
      console.log(error); // TODO
      throw error;
    }
  }
  logout(): boolean {
    localStorage.removeItem('APP_LOGGED');
    return true;
  }
  isLogged(): boolean {
    const appLogged = localStorage.getItem('APP_LOGGED');

    return !!appLogged;
  }
}

export default new AuthService();
