import { useState } from "react";
import { login } from "../api/userApi";
import { ResultCurrentUser } from "../models/currentUser";

export const useUser = () => {
  const [user, setUser] = useState<ResultCurrentUser | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const userData = await login(email, password);
      setUser(userData);
    } catch (err) {
      setError(err as Error);
    }
  };

  return { user, error, handleLogin };
};
