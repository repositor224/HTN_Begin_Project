import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../api/db";

interface AuthContextType {
  isLoggedIn: boolean;
  isGuest: boolean;
  currentUser: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  guestLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isGuest: false,
  currentUser: null,
  login: async () => false,
  guestLogin: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const guestFlag = localStorage.getItem("isGuest") === "true";
    if (storedUser) {
      setCurrentUser(storedUser);
      setIsLoggedIn(true);
      setIsGuest(guestFlag);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const success = await loginUser(username, password);
    if (success) {
      setIsLoggedIn(true);
      setIsGuest(false);
      setCurrentUser(username);
      localStorage.setItem("currentUser", username);
      localStorage.setItem("isGuest", "false");
    } else {
      setIsLoggedIn(false);
      setIsGuest(false);
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isGuest");
    }
    return success;
  };

  const guestLogin = () => {
    setIsLoggedIn(true);
    setIsGuest(true);
    setCurrentUser("Guest");
    localStorage.setItem("currentUser", "Guest");
    localStorage.setItem("isGuest", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsGuest(false);
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isGuest");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ isLoggedIn, isGuest, currentUser, login, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
