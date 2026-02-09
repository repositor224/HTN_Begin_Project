import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../api/db";

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  currentUser: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(storedUser);
      setIsLoggedIn(true);
    }
    setLoading(false); 
  }, []);

  const login = async (username: string, password: string) => {
    const success = await loginUser(username, password); // call on backend                                                                                                                                           
    if (success) {
      setIsLoggedIn(true);
      setCurrentUser(username);
      localStorage.setItem("currentUser", username);
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
    }
    return success;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  if (loading) return <div>Loading...</div>; // prevent redirect until checking is completed

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
