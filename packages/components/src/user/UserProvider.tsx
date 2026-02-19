// packages/components/src/user/UserProvider.tsx
"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";

export interface User {
  id: number;
  username: string;
  email: string;
  role:
    | "hobbyist"
    | "researcher_pending"
    | "researcher_community"
    | "researcher_institutional";
  firstName?: string;
  lastName?: string;
  bio?: string;
  profileImage?: string;
  institution?: string;
  researchFocus?: string;
  verified?: boolean;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  refetchUser: () => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function getCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    return cookieValue;
  }
  return null;
}

interface UserProviderProps {
  children: ReactNode;
  apiUrl?: string;
  onFetchUser?: () => Promise<User | null>;
  onLogout?: () => Promise<void>;
}

export function UserProvider({
  children,
  apiUrl,
  onFetchUser,
  onLogout,
}: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      let userData: User | null = null;

      if (onFetchUser) {
        userData = await onFetchUser();
      } else if (apiUrl) {
        const res = await fetch(`${apiUrl}/api/v1/auth/profiles/me/`, {
          credentials: "include",
        });
        if (res.ok) {
          userData = await res.json();
        }
      }

      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
        if (
          pathname !== "/sign-in" &&
          pathname !== "/sign-up" &&
          pathname !== "/forgot-password" &&
          pathname !== "/verify-email" &&
          !pathname.startsWith("/reset-password/")
        ) {
          router.push("/sign-in");
        }
      }
    } catch (err) {
      console.error("Failed to fetch user:", err); // eslint-disable-line no-console
      setUser(null);
      if (
        pathname !== "/sign-in" &&
        pathname !== "/sign-up" &&
        pathname !== "/forgot-password" &&
        pathname !== "/verify-email" &&
        !pathname.startsWith("/reset-password/")
      ) {
        router.push("/sign-in");
      }
    } finally {
      setLoading(false);
    }
  }, [pathname, router, apiUrl, onFetchUser]);

  useEffect(() => {
    if (
      pathname !== "/sign-in" &&
      pathname !== "/sign-up" &&
      pathname !== "/forgot-password" &&
      pathname !== "/verify-email" &&
      !pathname.startsWith("/reset-password/")
    ) {
      fetchUser();
    }
  }, [fetchUser, pathname]);

  const refetchUser = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(async () => {
    if (onLogout) {
      await onLogout();
    } else if (apiUrl) {
      const csrftoken = getCookie("csrftoken");
      await fetch(`${apiUrl}/api/v1/auth/logout/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrftoken || "",
          "Content-Type": "application/json",
        },
      });
    }
    setUser(null);
    router.push("/sign-in");
  }, [router, apiUrl, onLogout]);

  const contextValue = useMemo(
    () => ({ user, loading, refetchUser, logout }),
    [user, loading, refetchUser, logout],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
