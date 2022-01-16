import * as React from "react";
import Gravatar from "react-gravatar";

import { useUser } from "../providers/user-profile-provider";
import { Link } from "./link";

export const UserProfile: React.VoidFunctionComponent = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return user ? (
    <div>
      <Gravatar
        email={user.email || ""}
        default="mp"
        rating="g"
        size={150}
      />
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <Link href="/api/auth/logout">Logout</Link>
    </div>
  ) : (
    <div>
      <Link href="/api/auth/login">Login</Link>
    </div>
  );
};
