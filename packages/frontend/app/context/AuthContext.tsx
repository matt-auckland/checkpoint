import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from 'shared';
import { clearAuthToken, setAuthToken } from '~/lib/tokenStorage';

type AuthContextType = {
  token: string | null;
  user: User | null;
  setUser: (user: User | null) => void;
  setToken: (newToken: string | null) => void;
  clearData: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const updateAuthToken = (newToken: string | null) => {
    setAuthToken(newToken);
    setToken(newToken);
  };

  const clearData = () => {
    clearAuthToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken: updateAuthToken,
        clearData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
