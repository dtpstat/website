import { useUser as useAuth0UserProfile } from "@auth0/nextjs-auth0";
import React from "react";

import { fetchUser, patchUser, postUser } from "../fetch/users";
import { userProfileToUser } from "../shared/user-helpers";
import { User } from "../types";

interface UserProfileContextValue {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isLoading: boolean;
  error: Error | undefined;
}

const UserProfileContext = React.createContext<
  UserProfileContextValue | undefined
>(undefined);

export const UserProfileProvider: React.FunctionComponent = ({ children }) => {
  const { user: auth0User, isLoading, error } = useAuth0UserProfile();
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const syncAuth0UserProfileWithDbUser = async () => {
      const createOrUpdateDbUser = async (
        userData: User,
      ): Promise<User | undefined> => {
        if (!auth0User) {
          return;
        }

        const userId = auth0User!.sub as string;

        // Check if the user exists in the DB
        const dbUser = await fetchUser(window.location.origin, userId);
        if (dbUser) {
          return await patchUser(window.location.origin, userId, userData!);
        } else {
          return await postUser(window.location.origin, userData!);
        }
      };

      if (auth0User) {
        const userData = userProfileToUser(auth0User);
        const updatedUser = await createOrUpdateDbUser(userData);
        setUser(updatedUser);
      }
    };
    syncAuth0UserProfileWithDbUser();
  }, [auth0User]);

  const providerValue = React.useMemo<UserProfileContextValue>(
    () => ({
      user,
      setUser,
      isLoading,
      error,
    }),
    [user, setUser, isLoading, error],
  );

  return (
    <UserProfileContext.Provider value={providerValue}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUser = (): UserProfileContextValue => {
  const result = React.useContext(UserProfileContext);
  if (result === undefined) {
    throw new Error("No UserProfileContext value available");
  }

  return result;
};
