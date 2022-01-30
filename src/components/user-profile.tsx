import * as React from "react";

import { useUser } from "../providers/user-profile-provider";
import { IframeAwareLoginLink } from "../shared/django-helpers";
import { AvatarImage } from "./avatar-image";
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
      <AvatarImage email={user.email} size={150} />
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <Link href="/api/auth/logout">Logout</Link>
    </div>
  ) : (
    <div>
      <IframeAwareLoginLink>login</IframeAwareLoginLink>
    </div>
  );
};
