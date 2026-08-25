export interface UserRole {
  role: {
    id: string;
    name: string;
    permission: number;
  }
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  avatar_url: string | null;
  username: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  user_roles: UserRole[];
}

export type SignInCredentials = {
  email?: string;
  password?: string;
  access_token?: string
}

export interface SignInResponse {
  user: User;
  token: string;
}

export type RegisterUserCredentials = {
  email: string;
  password: string;
  username: string;
}

export interface RegisterUserResponse {
  user: User;
  token: string;
}