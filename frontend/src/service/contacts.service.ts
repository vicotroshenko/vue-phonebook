import { HTTP_KEYS, STORAGE_KEY } from '@/constants/keys';
import { LocalStorage } from '@/utils/localStorage';
import type { Axios, AxiosRequestConfig } from 'axios';
import axios from 'axios';

interface RequestParameters {
  config?: AxiosRequestConfig;
  withAuth?: boolean;
  id: string;
}
export class HttpService {
  baseUrl: string;
  fetchingService: Axios;
  apiVersion: string;

  constructor(baseUrl: string, fetchingService = axios, apiVersion = 'api') {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  getFullApiUrl(url: string | number) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig(): { [x: string]: string } {
    const userLS = new LocalStorage(STORAGE_KEY.USER);
    const { token } = userLS.get();
    return {
      ['Authorization']: `Bearer ${token}`,
    };
  }

  async getAll({ config = {}, withAuth }: Omit<RequestParameters, 'id'>) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }
    return await this.fetchingService.get(this.getFullApiUrl('/'), config);
  }

  async getOne({ config = {}, withAuth, id }: RequestParameters) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }
    return await this.fetchingService.get(this.getFullApiUrl(id), config);
  }

  async create({ config = {}, withAuth }: Omit<RequestParameters, 'id'>) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }
    return await this.fetchingService.post(this.getFullApiUrl('/'), config.data, {
      headers: config.headers,
    });
  }

  async put({ config = {}, withAuth, id }: RequestParameters) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }
    console.log(config.data);
    return await this.fetchingService.put(this.getFullApiUrl(id), config.data, {
      headers: config.headers,
    });
  }

  async delete({ config = {}, withAuth, id }: RequestParameters) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }
    return await this.fetchingService.delete(this.getFullApiUrl(id), config);
  }
}


export const contactsService = new HttpService(HTTP_KEYS.BASE_URL, axios, HTTP_KEYS.API_CONTACTS);
