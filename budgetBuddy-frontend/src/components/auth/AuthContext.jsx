import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_BASE_URL || '';


const AuthContext = createContext(null);

/**
 * The provider component that wraps the app and contains the authorization logic.
 * @param {*} param0 
 * @returns 
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading

  // This will check user session on load.
  useEffect(() => {
    async function checkUserSession() {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/auth/me`, {
          withCredentials: true, 
        });
        setUser(data); 
      } catch (error) {
        console.error("Session check error:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    checkUserSession();
  }, []); 

  /**
   * Logout function to clear the user session
   * It clears the user state from react even if the backend doesn't logout properly.
   */
  const logout = async () => {
    try {
      
      await axios.post(`${BACKEND_URL}/auth/logout`, {}, {
        withCredentials: true, 
      });
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      setUser(null);
    }
  };

  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
  };

  // Provide the auth state to child components of the provider.
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * This function allows components to access the auth context.
 * @returns The session context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
