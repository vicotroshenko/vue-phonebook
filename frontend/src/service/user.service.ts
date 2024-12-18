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
  constructor(baseUrl: string, fetchingService = axios, apiVersion = 'api') {
    super(baseUrl, fetchingService, apiVersion);
  }

  private getTokenFromStorage(): { [x: string]: string } {
    const localStorage = new LocalStorage(STORAGE_KEY.USER);
    const { token } = localStorage.get().state;
    return {
      ['Authorization']: `Bearer ${token}`,
    };
  }
  async register(data: User) {
    return await this.fetchingService.post(this.getFullApiUrl('register'), data);
  }
  async login(data: Omit<User, 'name'>) {
    return await this.fetchingService.post(this.getFullApiUrl('login'), data);
  }
  async logout() {
    return await this.fetchingService.post(
      this.getFullApiUrl('logout'),
      {},
      { headers: this.getTokenFromStorage() },
    );
  }
}

const userService = new UserService(HTTP_KEYS.BASE_URL, axios, HTTP_KEYS.API_USER);

export default userService;
