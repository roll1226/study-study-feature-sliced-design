import { ResultCurrentUser } from "../models/currentUser";

export const login = async (
  email: string,
  password: string
): Promise<ResultCurrentUser> => {
  const response = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
};
