import { useState, useCallback } from "react";

interface User {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

export function useAuthStore() {
  const [state, setState] = useState<AuthState>(initialState);

  const login = useCallback((phone: string, password: string) => {
    const mockUser: User = {
      id: "1",
      name: "用户",
      avatar: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=user%20avatar%20portrait%20minimal%20professional&image_size=square",
      phone,
    };
    setState({ user: mockUser, isLoggedIn: true });
    return true;
  }, []);

  const logout = useCallback(() => {
    setState(initialState);
  }, []);

  const register = useCallback((phone: string, password: string, name: string) => {
    const mockUser: User = {
      id: "2",
      name,
      avatar: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=user%20avatar%20portrait%20minimal%20professional&image_size=square",
      phone,
    };
    setState({ user: mockUser, isLoggedIn: true });
    return true;
  }, []);

  return {
    ...state,
    login,
    logout,
    register,
  };
}

export type AuthStore = ReturnType<typeof useAuthStore>;
