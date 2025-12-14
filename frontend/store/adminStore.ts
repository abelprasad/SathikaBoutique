import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { adminAuthApi } from '@/lib/api';
import type { Admin, LoginRequest } from '@/types/admin';

interface AdminState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  getCurrentAdmin: () => Promise<void>;
  clearError: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginRequest): Promise<boolean> => {
        set({ isLoading: true, error: null });
        try {
          const response = await adminAuthApi.login(credentials);

          if (response.success) {
            set({
              admin: response.data.admin,
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return true;
          } else {
            set({
              error: response.message || 'Login failed',
              isLoading: false,
            });
            return false;
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });
          return false;
        }
      },

      logout: async (): Promise<void> => {
        const { token } = get();

        try {
          if (token) {
            await adminAuthApi.logout(token);
          }
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            admin: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      getCurrentAdmin: async (): Promise<void> => {
        const { token } = get();

        if (!token) {
          set({ isAuthenticated: false, admin: null });
          return;
        }

        set({ isLoading: true });
        try {
          const response = await adminAuthApi.getCurrentAdmin(token);

          if (response.success) {
            set({
              admin: response.data.admin,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              admin: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } catch (error) {
          console.error('Get current admin error:', error);
          set({
            admin: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      clearError: (): void => {
        set({ error: null });
      },
    }),
    {
      name: 'admin-storage',
      partialize: (state) => ({
        admin: state.admin,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
