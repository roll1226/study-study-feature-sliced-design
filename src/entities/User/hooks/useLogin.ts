import { useState } from "react";
import { login } from "@entities/User/api/userApi";

const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const handleLogin = async () => {
    try {
      await login(email, password);
      console.log("Login successful!");
    } catch (err) {
      setError(err as Error);
      console.log("Login failed!");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};

export default useLogin;
