import { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService.js';

export const AuthContext = createContext(null);

export function AuthContextProvider ({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then(data => setUser(data))
      .catch(_ => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};
