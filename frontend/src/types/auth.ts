export interface User {
  id: number;
  username: string;
  email: string;
  role: 'Patient' | 'Doctor' | 'Admin';
  trimester?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  role: 'Patient' | 'Doctor' | 'Admin';
  trimester?: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
} 