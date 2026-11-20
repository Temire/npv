// import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Roles } from "../types/enums";
import { useAuth } from "./auth-context";
import { getAdminUserByEmail } from "../services";
import { useQuery } from "@tanstack/react-query";
// import { getUserByEmail } from "../services";
// import { useAuth } from "./auth-context";

type User = {
  id?: number;
  fullName?: string;
  phone?: string;
  email?: string;
  registrationStatus?: "STEP_1" | "STEP_2" | "STEP_3" | "COMPLETED";
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  role?: Roles;
};

type Token = string;

const UserContext = React.createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: Token | null;
  setToken: React.Dispatch<React.SetStateAction<Token | null>>;
  profileLoading: boolean;
  profileError: boolean;
  retryProfile: () => void;
}>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  profileLoading: false,
  profileError: false,
  retryProfile: () => {}
});

export const useUser = () => React.useContext(UserContext);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<Token | null>(null);
  const { userEmail } = useAuth();

  /*
   * Get user
   */

  const {
    data: user_data,
    isLoading: profileLoading,
    isError: profileError,
    refetch: retryProfile
  } = useQuery({
    queryKey: ["adminUser", userEmail],
    queryFn: () =>
      getAdminUserByEmail({
        email: userEmail
      }),
    enabled: !!userEmail
  });

  React.useEffect(() => {
    if (user_data) {
      setUser(user_data);
    }
  }, [user_data]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, profileLoading, profileError, retryProfile }}>
      {children}
    </UserContext.Provider>
  );
};
