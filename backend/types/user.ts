export interface User {
  name: string;
  email: string;
  password: string;
  createdAt?: NativeDate;
  id?: string;
  token?: string;
}