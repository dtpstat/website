import { useUser } from "@auth0/nextjs-auth0";
import * as React from "react";

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
      <img src={user.picture || ""} alt={user.name || ""} />
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
