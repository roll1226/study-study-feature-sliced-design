import { useUser } from "@entities/User/hooks/useUser";
import { User } from "@entities/User/models/user";
import useFetch from "@shared/hooks/useFetch";
import { FormEvent, useState } from "react";

const UserLogin = () => {
  const { user, error, handleLogin } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  // 共通のデータを取得するためのフックの使用例
  const {
    data,
    loading,
    error: fetchError,
  } = useFetch<User>("/api/some-endpoint");

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {user && <p>Welcome, {user.token}!</p>}

      {/* 共通のフックのデータ表示 */}
      {loading && <p>Loading...</p>}
      {fetchError && <p style={{ color: "red" }}>{fetchError.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default UserLogin;
