import { User } from "@entities/User/models/user";
import { FCX } from "react";

type Props = {
  user: User;
  dataTestId?: string;
};

export const UserCard: FCX<Props> = ({ user, dataTestId }) => {
  return (
    <div data-testid={dataTestId}>
      <h1>ID: {user.id}</h1>
      <h2>NAME: {user.name}</h2>
      <h3>USERNAME: {user.username}</h3>
    </div>
  );
};
