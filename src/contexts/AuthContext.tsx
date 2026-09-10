import React, { createContext, useContext, useState, ReactNode } from "react";

// TEMPORARY stub AuthContext.
// Replace signInWithGoogle with your real auth (e.g. Firebase Auth,
// expo-auth-session, Supabase, etc.) once you're ready.

type AuthUser = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
} | null;

type AuthContextType = {
  user: AuthUser;
  signInWithGoogle: () => Promise<void> | void;
  signOut: () => Promise<void> | void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signInWithGoogle: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);

  const signInWithGoogle = async () => {
    // TODO: wire up real Google sign-in
    console.log("signInWithGoogle called — not implemented yet");
    // Example placeholder so the UI can be tested as "logged in":
    // setUser({ uid: "test-user", displayName: "Test User" });
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
