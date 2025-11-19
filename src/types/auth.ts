export type Role = 'buyer' | 'seller' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
  role: Role; // User selects role on signup? Or defaults to buyer? SRS implies role is stored.
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: Role | null;
}
