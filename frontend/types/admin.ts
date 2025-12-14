export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
  lastLogin?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'superadmin';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    admin: Admin;
    token: string;
  };
}

export interface CurrentAdminResponse {
  success: boolean;
  data: {
    admin: Admin;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}
