import axios from 'axios';
import { HttpService } from './contacts.service';
import { HTTP_KEYS, STORAGE_KEY } from '@/constants/keys';
import { LocalStorage } from '@/utils/localStorage';

interface User {
  name: string;
  email: string;
  password: string;
}

class UserService extends HttpService {
  localStorage = new LocalStorage(STORAGE_KEY.USER);
  constructor(baseUrl: string, fetchingService = axios, apiVersion = 'api') {
    super(baseUrl, fetchingService, apiVersion);
  }

  private getTokenFromStorage(): { [x: string]: string } {
    const { token } = this.localStorage.get();
    console.log('token: ', token);
    return {
      ['Authorization']: `Bearer ${token}`,
    };
  }
  async register(data: User) {
    const newUser = await this.fetchingService.post(this.getFullApiUrl('register'), data);
    this.localStorage.set({ token: newUser.data.token });
    return newUser;
  }
  async login(data: Omit<User, 'name'>) {
    const user = await this.fetchingService.post(this.getFullApiUrl('login'), data);
    this.localStorage.set({ token: user.data.token });
    return user;
  }
  async logout() {
    console.log('logout');
    await this.fetchingService.post(
      this.getFullApiUrl('logout'),
      {},
      { headers: this.getTokenFromStorage() },
    );
    this.localStorage.remove();
  }
}

const userService = new UserService(HTTP_KEYS.BASE_URL, axios, HTTP_KEYS.API_USER);

export default userService;
