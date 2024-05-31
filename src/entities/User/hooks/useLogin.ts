import { login } from "@entities/User/api/userApi";
import { useState } from "react";

const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("Login successful!");
    } catch (err) {
      setError(err as Error);
      alert("Login failed!");
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
