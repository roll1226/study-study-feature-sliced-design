import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { User } from "@entities/User/models/user";
import { UserCard } from "@shared/LoginPage/UserCard";

const testUser: User = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

describe("Check UserCard", () => {
  it("Show UserCard", () => {
    render(<UserCard user={testUser} dataTestId="user-card" />);

    const userId = screen.getByText(/ID: 1/i);
    const userName = screen.getByText(/NAME: Leanne Graham/i);
    const userUsername = screen.getByText(/USERNAME: Bret/i);

    expect(userId).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(userUsername).toBeInTheDocument();
  });
});
