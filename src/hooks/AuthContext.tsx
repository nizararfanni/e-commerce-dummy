import { createContext, useContext, useEffect, useState } from "react";
type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  user: string | null;
  setUser: (user: string | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    console.log("token", token);
    console.log("token", user);
    
  }, [token]);
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
